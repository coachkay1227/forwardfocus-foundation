import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VictimSupportQuery {
  query: string;
  location?: string;
  county?: string;
  victimType?: 'domestic_violence' | 'sexual_assault' | 'violent_crime' | 'property_crime' | 'other';
  traumaLevel?: 'recent' | 'ongoing' | 'past' | 'complex';
  previousContext?: Array<{role: string, content: string}>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, location, county, victimType, traumaLevel = 'ongoing', previousContext = [] }: VictimSupportQuery = await req.json();

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Enhanced resource filtering for victim services
    let resourceQuery = supabase
      .from('resources')
      .select('*')
      .or('type.ilike.%victim%,type.ilike.%legal aid%,type.ilike.%compensation%,type.ilike.%counseling%,type.ilike.%trauma%,type.ilike.%advocacy%,type.ilike.%domestic violence%,type.ilike.%sexual assault%')
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

    // Trauma-informed system prompt for victim support
    const systemPrompt = `You are a Victim Support AI Assistant specializing in trauma-informed care and victim services. Your core principles:

1. **TRAUMA-INFORMED APPROACH**:
   - Acknowledge their strength and survival
   - Validate their experiences without judgment
   - Emphasize that what happened was not their fault
   - Respect their autonomy and choices
   - Use gentle, non-triggering language

2. **SPECIALIZED VICTIM SERVICES**:
   - Legal rights and advocacy
   - Victim compensation programs
   - Trauma counseling and therapy
   - Safety planning and protection
   - Court accompaniment and support

3. **SMART QUESTIONING STRATEGY**:
   - Ask open-ended, non-invasive questions
   - Let them share at their comfort level
   - Focus on their current needs and goals
   - Avoid re-traumatization through detailed recounting
   - Check in about their emotional state

4. **RESOURCE PRIORITIZATION**:
   - Immediate safety and crisis support
   - Legal advocacy and rights information
   - Trauma-informed therapy options
   - Victim compensation programs
   - Support groups and peer connections

5. **AVAILABLE RESOURCES**: ${JSON.stringify(resources?.slice(0, 10) || [])}

6. **COMMUNICATION STYLE**:
   - Warm, supportive, and empowering
   - Acknowledge their courage in seeking help
   - Provide hope while being realistic
   - Use "survivor" language when appropriate
   - Offer multiple pathways and choices

7. **SPECIAL CONSIDERATIONS**:
   - Confidentiality and safety concerns
   - Cultural sensitivity and barriers
   - Economic impact and financial needs
   - Long-term healing and recovery planning

Remember: You're supporting someone on their healing journey. Your role is to provide compassionate guidance and connect them with appropriate resources that honor their experience and support their recovery.`;

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
        max_completion_tokens: 1200,
      }),
    });

    if (!openAIResponse.ok) {
      console.error('OpenAI API error:', await openAIResponse.text());
      throw new Error('Failed to generate AI response');
    }

    const aiData = await openAIResponse.json();
    const aiMessage = aiData.choices[0].message.content;

    // Filter resources based on victim service needs
    const relevantResources = resources?.filter(resource => {
      const queryLower = query.toLowerCase();
      const resourceName = resource.name?.toLowerCase() || '';
      const resourceDesc = resource.description?.toLowerCase() || '';
      const resourceType = resource.type?.toLowerCase() || '';
      
      // Victim service-specific resource matching
      if (queryLower.includes('legal') || queryLower.includes('rights') || queryLower.includes('lawyer')) {
        return resourceType.includes('legal aid') || resourceType.includes('advocacy');
      }
      if (queryLower.includes('compensation') || queryLower.includes('financial') || queryLower.includes('money')) {
        return resourceType.includes('compensation') || resourceType.includes('financial');
      }
      if (queryLower.includes('counseling') || queryLower.includes('therapy') || queryLower.includes('trauma')) {
        return resourceType.includes('counseling') || resourceType.includes('trauma') || resourceType.includes('mental health');
      }
      if (queryLower.includes('domestic violence') || queryLower.includes('abuse')) {
        return resourceType.includes('domestic violence') || resourceName.includes('domestic');
      }
      if (queryLower.includes('sexual assault') || queryLower.includes('rape')) {
        return resourceType.includes('sexual assault') || resourceName.includes('sexual');
      }
      
      return resourceName.includes(queryLower) || 
             resourceDesc.includes(queryLower) || 
             resourceType.includes('victim') ||
             resourceType.includes('advocacy');
    })?.slice(0, 8) || [];

    return new Response(JSON.stringify({
      response: aiMessage,
      resources: relevantResources,
      victimType,
      traumaLevel,
      totalResources: resources?.length || 0,
      supportServices: {
        domesticViolence: "1-800-799-7233",
        sexualAssault: "1-800-656-4673", 
        crisisSupport: "988",
        ohioVictimCompensation: "https://www.ohioattorneygeneral.gov/Individuals-and-Families/Victims"
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Victim Support AI error:', error);
    return new Response(JSON.stringify({ 
      error: 'I apologize for the technical difficulty. For immediate support, please call the National Domestic Violence Hotline at 1-800-799-7233 or RAINN at 1-800-656-4673.',
      supportServices: {
        domesticViolence: "1-800-799-7233",
        sexualAssault: "1-800-656-4673",
        crisisSupport: "988"
      }
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});