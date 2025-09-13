import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ReentryQuery {
  query: string;
  location?: string;
  county?: string;
  reentryStage?: 'preparing' | 'recently_released' | 'long_term' | 'family_member';
  priorityNeeds?: Array<'housing' | 'employment' | 'legal' | 'education' | 'healthcare' | 'family' | 'financial'>;
  previousContext?: Array<{role: string, content: string}>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, location, county, reentryStage = 'recently_released', priorityNeeds = [], previousContext = [] }: ReentryQuery = await req.json();

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Enhanced resource filtering for reentry services
    let resourceQuery = supabase
      .from('resources')
      .select('*')
      .or('type.ilike.%housing%,type.ilike.%employment%,type.ilike.%job training%,type.ilike.%education%,type.ilike.%reentry%,type.ilike.%legal aid%,type.ilike.%mental health%,type.ilike.%substance abuse%,type.ilike.%healthcare%,type.ilike.%transportation%')
      .eq('verified', 'verified')
      .limit(20);

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

    // Comprehensive reentry-focused system prompt
    const systemPrompt = `You are a Reentry Navigator AI Assistant, specializing in comprehensive reentry support and success planning. Your expertise covers:

1. **REENTRY SUCCESS DIMENSIONS**:
   - Housing: Transitional, permanent, affordable options
   - Employment: Job training, fair-chance employers, entrepreneurship
   - Legal: Expungement, court obligations, documentation
   - Education: GED, college, vocational training, scholarships
   - Healthcare: Medical, mental health, substance abuse treatment
   - Family: Reunification, parenting, relationship rebuilding
   - Financial: Banking, credit repair, budgeting, benefits

2. **SMART ASSESSMENT STRATEGY**:
   - Understand their release timeline and current status
   - Identify immediate vs. long-term needs
   - Assess barriers and available resources
   - Create step-by-step action plans
   - Recognize interconnected challenges

3. **SPECIALIZED KNOWLEDGE**:
   - Justice-friendly employers and programs
   - Housing options that accept people with records
   - Legal pathways for record sealing/expungement
   - Education opportunities with justice-impacted support
   - Healthcare access and enrollment processes
   - Family dynamics and trauma-informed reunification

4. **MOTIVATIONAL COACHING**:
   - Celebrate small wins and progress
   - Provide hope and realistic expectations
   - Address setbacks with problem-solving
   - Connect to peer support and success stories
   - Emphasize long-term success vision

5. **AVAILABLE RESOURCES**: ${JSON.stringify(resources?.slice(0, 12) || [])}

6. **COMMUNICATION STYLE**:
   - Practical, solution-focused guidance
   - Non-judgmental and strengths-based
   - Break complex processes into manageable steps
   - Provide specific, actionable recommendations
   - Acknowledge the courage required for reentry

7. **BARRIER NAVIGATION**:
   - Help overcome system bureaucracy
   - Address discrimination and stigma
   - Find alternative pathways when doors close
   - Connect to advocacy and support networks
   - Provide documentation and application assistance

Remember: Successful reentry requires addressing multiple interconnected needs. Your role is to provide comprehensive guidance that helps them build stable, successful lives while navigating the unique challenges of reentry.`;

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
        max_completion_tokens: 1500,
      }),
    });

    if (!openAIResponse.ok) {
      console.error('OpenAI API error:', await openAIResponse.text());
      throw new Error('Failed to generate AI response');
    }

    const aiData = await openAIResponse.json();
    const aiMessage = aiData.choices[0].message.content;

    // Filter resources based on reentry needs
    const relevantResources = resources?.filter(resource => {
      const queryLower = query.toLowerCase();
      const resourceName = resource.name?.toLowerCase() || '';
      const resourceDesc = resource.description?.toLowerCase() || '';
      const resourceType = resource.type?.toLowerCase() || '';
      
      // Reentry-specific resource matching
      if (queryLower.includes('housing') || queryLower.includes('shelter') || queryLower.includes('apartment')) {
        return resourceType.includes('housing') || resourceType.includes('transitional');
      }
      if (queryLower.includes('job') || queryLower.includes('employment') || queryLower.includes('work')) {
        return resourceType.includes('employment') || resourceType.includes('job training') || resource.justice_friendly;
      }
      if (queryLower.includes('legal') || queryLower.includes('expungement') || queryLower.includes('court')) {
        return resourceType.includes('legal aid') || resourceType.includes('advocacy');
      }
      if (queryLower.includes('education') || queryLower.includes('school') || queryLower.includes('college')) {
        return resourceType.includes('education') || resourceType.includes('training');
      }
      if (queryLower.includes('healthcare') || queryLower.includes('medical') || queryLower.includes('mental health')) {
        return resourceType.includes('healthcare') || resourceType.includes('mental health');
      }
      if (queryLower.includes('family') || queryLower.includes('children') || queryLower.includes('parenting')) {
        return resourceType.includes('family') || resourceType.includes('support');
      }
      
      return resourceName.includes(queryLower) || 
             resourceDesc.includes(queryLower) || 
             resourceType.includes('reentry') ||
             resource.justice_friendly;
    })?.slice(0, 10) || [];

    return new Response(JSON.stringify({
      response: aiMessage,
      resources: relevantResources,
      reentryStage,
      priorityNeeds,
      totalResources: resources?.length || 0,
      keyServices: {
        housing: "Transitional and permanent housing options",
        employment: "Job training and fair-chance employers", 
        legal: "Expungement and legal document assistance",
        education: "GED, college, and vocational training",
        support: "211 Ohio comprehensive resource navigation"
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Reentry Navigator AI error:', error);
    return new Response(JSON.stringify({ 
      error: 'I apologize for the technical issue. For immediate reentry support, please call 211 for comprehensive resource navigation or visit your local reentry program.',
      keyServices: {
        general: "Call 211 for resource navigation",
        housing: "Contact local housing authorities",
        employment: "Visit Ohio Means Jobs centers"
      }
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});