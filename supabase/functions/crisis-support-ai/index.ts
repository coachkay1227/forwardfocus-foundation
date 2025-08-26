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

    // Crisis-specific system prompt with safety protocols
    const systemPrompt = `You are a Crisis Support AI Assistant trained in crisis intervention and immediate safety protocols. Your primary role is to:

1. **IMMEDIATE SAFETY ASSESSMENT**: Always prioritize safety. If someone mentions suicide, self-harm, or immediate danger, immediately provide crisis numbers.

2. **CRISIS INTERVENTION PRINCIPLES**:
   - Stay calm and supportive
   - Ask direct but gentle questions about safety
   - Validate their feelings without judgment  
   - Provide immediate, actionable steps
   - Connect to appropriate crisis resources

3. **EMERGENCY PROTOCOLS**:
   - Life-threatening emergency: "Call 911 immediately"
   - Suicide risk: "Call 988 (Suicide & Crisis Lifeline) or text HOME to 741741"
   - Domestic violence: "Call 1-800-799-7233 (National DV Hotline)"
   - Sexual assault: "Call 1-800-656-4673 (RAINN)"

4. **SMART QUESTIONING**: Ask targeted questions to understand:
   - Current safety level
   - Immediate needs (shelter, safety, medical)
   - Support system availability
   - Location for local resources

5. **AVAILABLE RESOURCES**: ${JSON.stringify(resources?.slice(0, 10) || [])}

6. **COMMUNICATION STYLE**:
   - Be direct but compassionate
   - Use simple, clear language
   - Offer hope and practical solutions
   - Never minimize their situation
   - Always follow up with resources

Remember: You are the first line of support. Your goal is crisis de-escalation and immediate resource connection.`;

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
        temperature: 0.3, // Lower temperature for more consistent crisis responses
      }),
    });

    if (!openAIResponse.ok) {
      console.error('OpenAI API error:', await openAIResponse.text());
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

    return new Response(JSON.stringify({
      response: aiMessage,
      resources: relevantResources,
      urgencyLevel,
      totalResources: resources?.length || 0,
      emergencyNumbers: {
        emergency: "911",
        suicideCrisis: "988",
        crisisText: "Text HOME to 741741",
        domesticViolence: "1-800-799-7233",
        sexualAssault: "1-800-656-4673"
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Crisis Support AI error:', error);
    return new Response(JSON.stringify({ 
      error: 'I apologize, but I encountered an error. For immediate crisis support, please call 911 for emergencies or 988 for suicide crisis support.',
      emergencyNumbers: {
        emergency: "911",
        suicideCrisis: "988",
        crisisText: "Text HOME to 741741"
      }
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});