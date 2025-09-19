import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CrisisQuery {
  query: string;
  location?: string;
  county?: string;
  urgencyLevel?: 'immediate' | 'urgent' | 'moderate' | 'informational';
  previousContext?: Array<{role: string, content: string}>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  let errorCount = 0;

  try {
    const { query, location, county, urgencyLevel = 'moderate', previousContext = [] }: CrisisQuery = await req.json();

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Enhanced resource filtering for crisis situations
    let resourceQuery = supabase
      .from('resources')
      .select('*')
      .or('type.ilike.%crisis%,type.ilike.%emergency%,type.ilike.%mental health%,type.ilike.%suicide%,type.ilike.%domestic violence%,type.ilike.%substance abuse%')
      .eq('verified', 'verified')
      .limit(15);

    if (location) {
      resourceQuery = resourceQuery.ilike('city', `%${location}%`);
    }
    if (county) {
      resourceQuery = resourceQuery.ilike('county', `%${county}%`);
    }

    const { data: resources, error: dbError } = await resourceQuery;
    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to fetch resources');
    }

    // Crisis-specific system prompt optimized for Ohio residents
    const systemPrompt = `You are Alex, a Crisis Support AI Assistant serving all 88 counties across Ohio. You specialize in crisis intervention and connecting people with local resources. Your approach:

1. **EMPATHETIC LISTENING**: Create a safe space for people to share their struggles without judgment. Validate their feelings and acknowledge their courage in reaching out.

2. **CRISIS INTERVENTION PRINCIPLES**:
   - Stay calm and supportive in your responses
   - Ask gentle, probing questions to understand their situation
   - Focus on immediate safety and practical next steps
   - Provide hope while being realistic about available help
   - Connect them to appropriate local Ohio resources

3. **OHIO-WIDE RESOURCE KNOWLEDGE**:
   - You serve all 88 Ohio counties from Hamilton to Cuyahoga to Franklin
   - Prioritize local community resources, family justice centers, and county services
   - Connect people to Ohio-specific support systems and programs
   - Understand rural vs urban resource differences across the state

4. **SMART QUESTIONING STRATEGY**:
   - Ask about their current location in Ohio for localized resources
   - Assess immediate safety without being invasive
   - Understand their support system and barriers to help
   - Identify specific crisis type (mental health, domestic violence, substance abuse, etc.)

5. **AVAILABLE OHIO RESOURCES**: ${JSON.stringify(resources?.slice(0, 10) || [])}

6. **COMMUNICATION STYLE**:
   - Warm, compassionate, and non-judgmental
   - Use clear, simple language that's easy to understand
   - Offer multiple pathways and options for support
   - Always end with actionable next steps
   - Emphasize that they're not alone and help is available

Remember: You're Alex, a trusted companion who believes in people's strength and resilience. Focus on crisis de-escalation, practical support, and connecting them with Ohio's extensive network of local resources.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...previousContext,
      { role: 'user', content: query }
    ];

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages,
        max_completion_tokens: 1000,
      }),
    });

    if (!openAIResponse.ok) {
      console.error('OpenAI API error:', await openAIResponse.text());
      errorCount++;
      throw new Error('Failed to generate AI response');
    }

    const aiData = await openAIResponse.json();
    const aiMessage = aiData.choices[0].message.content;

    // Filter resources based on query context and urgency
    const relevantResources = resources?.filter(resource => {
      const queryLower = query.toLowerCase();
      const resourceName = resource.name?.toLowerCase() || '';
      const resourceDesc = resource.description?.toLowerCase() || '';
      const resourceType = resource.type?.toLowerCase() || '';
      
      // Crisis-specific resource matching
      if (queryLower.includes('suicide') || queryLower.includes('self-harm')) {
        return resourceType.includes('crisis') || resourceType.includes('mental health');
      }
      if (queryLower.includes('domestic violence') || queryLower.includes('abuse')) {
        return resourceType.includes('domestic violence') || resourceType.includes('crisis');
      }
      if (queryLower.includes('addiction') || queryLower.includes('substance')) {
        return resourceType.includes('substance abuse') || resourceType.includes('mental health');
      }
      
      return resourceName.includes(queryLower) || 
             resourceDesc.includes(queryLower) || 
             resourceType.includes('crisis') ||
             resourceType.includes('emergency');
    })?.slice(0, 8) || [];

    // Log usage analytics
    const responseTime = Date.now() - startTime;
    try {
      await supabase.rpc('log_ai_usage', {
        p_endpoint_name: 'crisis-support-ai',
        p_user_id: null,
        p_response_time_ms: responseTime,
        p_error_count: errorCount
      });
    } catch (logError) {
      console.error('Failed to log AI usage:', logError);
    }

    return new Response(JSON.stringify({
      response: aiMessage,
      resources: relevantResources,
      urgencyLevel,
      totalResources: resources?.length || 0
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Crisis Support AI error:', error);
    errorCount++;
    
    // Log error usage analytics  
    const responseTime = Date.now() - startTime;
    try {
      await supabase.rpc('log_ai_usage', {
        p_endpoint_name: 'crisis-support-ai',
        p_user_id: null,
        p_response_time_ms: responseTime,
        p_error_count: errorCount
      });
    } catch (logError) {
      console.error('Failed to log AI usage error:', logError);
    }
    
    return new Response(JSON.stringify({ 
      error: 'I apologize, but I encountered an error. Let me help connect you with local Ohio crisis resources and support services in your area.',
      resources: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});