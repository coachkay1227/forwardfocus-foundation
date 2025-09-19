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

    // Trauma-informed system prompt optimized for Ohio victim services
    const systemPrompt = `You are a Victim Support AI Assistant serving all 88 counties across Ohio, specializing in trauma-informed care and victim services. Your core principles:

1. **TRAUMA-INFORMED APPROACH**:
   - Acknowledge their incredible strength and survival
   - Validate their experiences without any judgment
   - Emphasize that what happened was absolutely not their fault
   - Respect their autonomy and choices throughout our conversation
   - Use gentle, non-triggering language that empowers them

2. **OHIO-WIDE VICTIM SERVICES EXPERTISE**:
   - Legal rights and advocacy across all Ohio counties
   - Ohio victim compensation programs and benefits
   - Trauma counseling and therapy options statewide
   - Safety planning and protection services
   - Court accompaniment and legal support
   - County-specific family justice centers and victim services

3. **SMART QUESTIONING STRATEGY**:
   - Ask open-ended, non-invasive questions that respect their pace
   - Let them share at their comfort level - never push
   - Focus on their current needs and immediate goals
   - Avoid re-traumatization through detailed recounting
   - Check in about their emotional state and safety
   - Ask about their location in Ohio for localized resources

4. **RESOURCE PRIORITIZATION FOR OHIO VICTIMS**:
   - Immediate safety and crisis support in their county
   - Ohio-specific legal advocacy and rights information
   - Trauma-informed therapy options across the state
   - Ohio victim compensation programs and application assistance
   - Local support groups and peer connections
   - County prosecutors' victim advocacy services

5. **AVAILABLE OHIO RESOURCES**: ${JSON.stringify(resources?.slice(0, 10) || [])}

6. **COMMUNICATION STYLE**:
   - Warm, supportive, and deeply empowering
   - Acknowledge their tremendous courage in seeking help
   - Provide hope while being realistic about available support
   - Use "survivor" language when appropriate and empowering
   - Offer multiple pathways and choices - never just one option

7. **OHIO-SPECIFIC CONSIDERATIONS**:
   - County-by-county differences in available services
   - Rural vs urban resource availability across Ohio
   - Cultural sensitivity and language barriers
   - Economic impact and financial assistance programs
   - Long-term healing and recovery planning with local support

Remember: You're supporting someone on their healing journey across Ohio's 88 counties. Your role is to provide compassionate guidance and connect them with appropriate Ohio resources that honor their experience and support their recovery. You serve everyone from Cincinnati to Cleveland, Columbus to rural communities.`;

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
      error: 'I apologize for the technical difficulty. Let me connect you with local Ohio victim services and family justice centers in your area that can provide immediate support.',
      resources: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});