import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmergencyQuery {
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
    const { query, location, county, urgencyLevel = 'moderate', previousContext = [] }: EmergencyQuery = await req.json();

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Enhanced resource filtering for emergency situations
    let resourceQuery = supabase
      .from('resources')
      .select('*')
      .or('type.ilike.%crisis%,type.ilike.%emergency%,type.ilike.%mental health%,type.ilike.%support%,type.ilike.%advocacy%')
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

    // Emergency-specific system prompt optimized for Ohio
    const systemPrompt = `You are a Crisis Emergency Support AI Assistant serving all 88 counties across Ohio. Your role is to provide immediate, compassionate support during crisis situations. Your approach:

1. **IMMEDIATE ASSESSMENT & SUPPORT**: Quickly assess the person's current situation and provide immediate emotional support and practical guidance.

2. **OHIO-FOCUSED CRISIS INTERVENTION**:
   - Serve all Ohio residents from rural counties to major cities
   - Provide trauma-informed, compassionate responses
   - Focus on immediate safety and stabilization
   - Connect to local Ohio resources and support systems
   - Understand county-specific resources across all 88 Ohio counties

3. **SMART CRISIS QUESTIONING**:
   - Ask about their immediate safety and current location in Ohio
   - Assess their support system and immediate needs
   - Identify the type of crisis (mental health, domestic situation, etc.)
   - Determine what kind of immediate help would be most beneficial

4. **AVAILABLE OHIO RESOURCES**: ${JSON.stringify(resources?.slice(0, 10) || [])}

5. **COMMUNICATION APPROACH**:
   - Be immediately supportive and non-judgmental
   - Use calm, clear, and reassuring language
   - Provide hope and practical next steps
   - Emphasize that they made the right choice reaching out
   - Focus on their strength and resilience

6. **CRISIS DE-ESCALATION TECHNIQUES**:
   - Validate their feelings and experiences
   - Break down overwhelming situations into manageable steps
   - Provide grounding techniques when appropriate
   - Connect them with ongoing support resources

Remember: You're here to provide immediate emotional support and connect people with the right Ohio resources for their specific situation. Focus on safety, hope, and practical next steps.`;

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

    // Filter resources based on query context
    const relevantResources = resources?.filter(resource => {
      const queryLower = query.toLowerCase();
      const resourceName = resource.name?.toLowerCase() || '';
      const resourceDesc = resource.description?.toLowerCase() || '';
      const resourceType = resource.type?.toLowerCase() || '';
      
      // Emergency-specific resource matching
      if (queryLower.includes('crisis') || queryLower.includes('emergency') || queryLower.includes('help')) {
        return resourceType.includes('crisis') || resourceType.includes('emergency') || resourceType.includes('support');
      }
      if (queryLower.includes('mental health') || queryLower.includes('depression') || queryLower.includes('anxiety')) {
        return resourceType.includes('mental health') || resourceType.includes('counseling');
      }
      
      return resourceName.includes(queryLower) || 
             resourceDesc.includes(queryLower) || 
             resourceType.includes('crisis') ||
             resourceType.includes('support');
    })?.slice(0, 8) || [];

    // Log usage analytics
    const responseTime = Date.now() - startTime;
    try {
      await supabase.rpc('log_ai_usage', {
        p_endpoint_name: 'crisis-emergency-ai',
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
    console.error('Crisis Emergency AI error:', error);
    errorCount++;
    
    // Log error usage analytics  
    const responseTime = Date.now() - startTime;
    try {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      await supabase.rpc('log_ai_usage', {
        p_endpoint_name: 'crisis-emergency-ai',
        p_user_id: null,
        p_response_time_ms: responseTime,
        p_error_count: errorCount
      });
    } catch (logError) {
      console.error('Failed to log AI usage error:', logError);
    }
    
    return new Response(JSON.stringify({ 
      error: 'I apologize for the technical difficulty. Let me connect you with local Ohio crisis support resources in your area.',
      resources: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});