import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
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

  const startTime = Date.now();
  let errorCount = 0;

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

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        max_completion_tokens: 800,
      }),
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.text();
      console.error('OpenAI API error:', errorData);
      errorCount++;
      
      // Instead of throwing, provide helpful guidance with database resources
      const responseTime = Date.now() - startTime;
      try {
        await supabase.rpc('log_ai_usage', {
          p_endpoint_name: 'ai-resource-discovery',
          p_user_id: null,
          p_response_time_ms: responseTime,
          p_error_count: errorCount
        });
      } catch (logError) {
        console.error('Failed to log AI usage:', logError);
      }

      const helpfulGuidance = `I'm here to help you find Ohio resources! While my AI is temporarily unavailable, I've found ${resources?.length || 0} resources from our database that might help.

**Tips for better results:**
• Be specific about your location (city or county in Ohio)
• Mention the type of help you need (housing, employment, healthcare, legal aid, etc.)
• Include any special circumstances (justice-involved, family with children, etc.)

Here are the resources I found for you:`;

      return new Response(JSON.stringify({
        response: helpfulGuidance,
        resources: resources?.slice(0, limit) || [],
        totalFound: resources?.length || 0
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const aiData = await openAIResponse.json();
    const aiResponse = aiData.choices[0].message.content;

    // Find most relevant resources to return alongside AI response
    const relevantResources = resources?.slice(0, limit) || [];

    console.log('AI Response generated successfully');

    // Check if we need web search fallback
    let webResources: any[] = [];
    const minCuratedResults = 3;
    const needsFallback = relevantResources.length < minCuratedResults;

    if (needsFallback) {
      console.log(`Only ${relevantResources.length} curated results found, triggering web search fallback`);
      
      try {
        // Build Ohio-specific search query
        let webSearchQuery = `Ohio ${query} verified organizations with phone numbers and websites`;
        if (county) {
          webSearchQuery += ` in ${county} County`;
        } else if (location) {
          webSearchQuery += ` in ${location}`;
        }
        webSearchQuery += " site:.org OR site:.gov OR site:ohio.gov";

        const perplexityResponse = await fetch('https://api.perplexity.ai/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${Deno.env.get('PERPLEXITY_API_KEY')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.1-sonar-small-128k-online',
            messages: [
              {
                role: 'system',
                content: 'You are a resource finder. Extract contact information (name, phone, website, description) for Ohio social services and return as JSON array.'
              },
              {
                role: 'user',
                content: webSearchQuery
              }
            ],
            temperature: 0.2,
            max_tokens: 1000
          }),
        });

        if (perplexityResponse.ok) {
          const perplexityData = await perplexityResponse.json();
          const webResponse = perplexityData.choices[0].message.content;
          
          // Parse the web response and create web resources
          webResources = [{
            name: 'Web Search Results',
            description: webResponse,
            type: 'web_search',
            verified: false,
            source: 'perplexity'
          }];
          
          console.log(`Added ${webResources.length} web search results`);
        } else {
          console.error('Perplexity API error:', await perplexityResponse.text());
        }
      } catch (webError) {
        console.error('Web search fallback error:', webError);
      }
    }

    // Log usage analytics
    const responseTime = Date.now() - startTime;
    try {
      await supabase.rpc('log_ai_usage', {
        p_endpoint_name: 'ai-resource-discovery',
        p_user_id: null,
        p_response_time_ms: responseTime,
        p_error_count: errorCount
      });
    } catch (logError) {
      console.error('Failed to log AI usage:', logError);
    }

    return new Response(JSON.stringify({
      response: aiResponse,
      curatedResources: relevantResources,
      webResources: webResources,
      totalFound: resources?.length || 0,
      usedWebFallback: needsFallback && webResources.length > 0
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in AI resource discovery:', error);
    errorCount++;
    
    // Log error usage analytics
    const responseTime = Date.now() - startTime;
    try {
      await supabase.rpc('log_ai_usage', {
        p_endpoint_name: 'ai-resource-discovery',
        p_user_id: null,
        p_response_time_ms: responseTime,
        p_error_count: errorCount
      });
    } catch (logError) {
      console.error('Failed to log AI usage error:', logError);
    }
    
    // Emergency fallback: Try to get basic resources 
    let fallbackResources = [];
    try {
      const { data: basicResources } = await supabase
        .from('resources')
        .select('*')
        .limit(10);
      fallbackResources = basicResources || [];
    } catch (dbError) {
      console.error('Fallback database error:', dbError);
    }

    const guidanceMessage = fallbackResources.length > 0 
      ? `I found ${fallbackResources.length} Ohio resources in our database. While I'm experiencing technical difficulties, these resources should help you get started. For more specific assistance, try being more detailed about your location and needs.`
      : `I'm having technical difficulties right now. Please try refreshing the page, or visit our resource directory directly to browse available Ohio services and support.`;

    return new Response(JSON.stringify({ 
      response: guidanceMessage,
      resources: fallbackResources,
      totalFound: fallbackResources.length
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});