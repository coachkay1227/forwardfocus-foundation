import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userNeeds, location, category } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch available resources
    const { data: resources, error } = await supabase
      .from('resources')
      .select('*')
      .eq('verified', true)
      .limit(50);

    if (error) throw error;

    // Create context for AI
    const resourceContext = resources?.map(r => 
      `${r.name}: ${r.description} (Category: ${r.category}, Location: ${r.city}, ${r.state})`
    ).join('\n');

    const systemPrompt = `You are an expert resource recommendation assistant for Forward Focus Elevation, 
    helping individuals find the best community resources for their needs. You have access to a database of 
    verified resources. Analyze the user's needs and recommend the 3-5 most relevant resources with explanations.`;

    const userPrompt = `User needs: ${userNeeds}
    ${location ? `Location: ${location}` : ''}
    ${category ? `Preferred category: ${category}` : ''}
    
    Available resources:
    ${resourceContext}
    
    Please recommend the best 3-5 resources and explain why each would be helpful. Format as JSON with structure:
    {
      "recommendations": [
        {
          "resourceName": "name",
          "reason": "why this is recommended",
          "matchScore": 0-100
        }
      ],
      "summary": "brief summary of recommendations"
    }`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        tools: [{
          type: 'function',
          function: {
            name: 'recommend_resources',
            description: 'Provide resource recommendations',
            parameters: {
              type: 'object',
              properties: {
                recommendations: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      resourceName: { type: 'string' },
                      reason: { type: 'string' },
                      matchScore: { type: 'number' }
                    }
                  }
                },
                summary: { type: 'string' }
              },
              required: ['recommendations', 'summary']
            }
          }
        }],
        tool_choice: { type: 'function', function: { name: 'recommend_resources' } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI service requires payment. Please contact support.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices[0].message.tool_calls?.[0];
    const result = JSON.parse(toolCall.function.arguments);

    console.log('AI recommendations generated:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in ai-recommend-resources:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
