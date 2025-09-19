import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? ''
);

interface ResourceQuery {
  query: string;
  location?: string;
  county?: string;
  resourceType?: string;
  limit?: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, location, county, resourceType, limit = 10 }: ResourceQuery = await req.json();
    
    console.log('AI Resource Discovery Request:', { query, location, county, resourceType });

    // Get relevant resources from database
    let resourcesQuery = supabase
      .from('resources')
      .select('*')
      .limit(50);

    // Apply filters based on query parameters
    if (county) {
      resourcesQuery = resourcesQuery.ilike('county', `%${county}%`);
    }
    if (location) {
      resourcesQuery = resourcesQuery.or(`city.ilike.%${location}%,county.ilike.%${location}%`);
    }
    if (resourceType) {
      resourcesQuery = resourcesQuery.ilike('type', `%${resourceType}%`);
    }

    const { data: resources, error: resourceError } = await resourcesQuery;
    
    if (resourceError) {
      console.error('Database error:', resourceError);
      return new Response(JSON.stringify({ error: 'Failed to fetch resources' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Prepare context for AI
    const resourceContext = resources?.map(r => ({
      name: r.name,
      organization: r.organization,
      type: r.type,
      city: r.city,
      county: r.county,
      description: r.description,
      phone: r.phone,
      website: r.website,
      verified: r.verified,
      justice_friendly: r.justice_friendly
    })) || [];

    const systemPrompt = `You are an AI assistant specializing in Ohio community resources and support services. You have access to a comprehensive database of resources across all 88 Ohio counties.

Your role is to:
1. Help people find appropriate resources based on their specific needs
2. Provide detailed information about services, locations, and contact details
3. Suggest multiple relevant options when available
4. Be empathetic and supportive, especially for those facing challenges
5. Always include contact information (phone/website) when recommending resources
6. Mention if a resource is "justice-friendly" (supportive of those with criminal justice involvement)
7. Prioritize verified partner resources when available

Available resources context: ${JSON.stringify(resourceContext, null, 2)}

Guidelines:
- Always be respectful and non-judgmental
- Provide specific, actionable information
- If you don't have exact matches, suggest similar or related resources
- Encourage users to call resources directly for current information
- Be clear about geographic coverage (city/county)
- Mention if services are free or low-cost when known`;

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      return new Response(JSON.stringify({ 
        error: 'AI service configuration error',
        resources: resourceContext.slice(0, limit)
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Calling OpenAI API for query:', query);
    
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.text();
      console.error('OpenAI API error:', openAIResponse.status, errorData);
      
      // Return helpful resources even if AI fails
      return new Response(JSON.stringify({ 
        error: 'AI service temporarily unavailable',
        response: 'I apologize, but I\'m having trouble connecting to my AI service right now. Here are some relevant resources that might help with your request.',
        resources: resourceContext.slice(0, limit),
        totalFound: resources?.length || 0
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const aiData = await openAIResponse.json();
    
    if (!aiData.choices || !aiData.choices[0] || !aiData.choices[0].message) {
      console.error('Invalid OpenAI response structure:', aiData);
      return new Response(JSON.stringify({ 
        error: 'Invalid AI response',
        response: 'Here are some resources that might help with your request.',
        resources: resourceContext.slice(0, limit),
        totalFound: resources?.length || 0
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    const aiResponse = aiData.choices[0].message.content;

    // Find most relevant resources to return alongside AI response  
    const relevantResources = resources?.slice(0, limit) || [];

    console.log('AI Response generated successfully');

    return new Response(JSON.stringify({
      response: aiResponse,
      resources: relevantResources,
      totalFound: resources?.length || 0
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in AI resource discovery:', error);
    return new Response(JSON.stringify({ 
      error: 'An error occurred processing your request',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});