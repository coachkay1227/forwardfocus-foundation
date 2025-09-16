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
  selectedCoach?: {
    name: string;
    specialty: string;
    description: string;
  };
  previousContext?: Array<{role: string, content: string}>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, location, county, reentryStage = 'recently_released', priorityNeeds = [], selectedCoach, previousContext = [] }: ReentryQuery = await req.json();

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

    // Get coach-specific system prompt or default
    const systemPrompt = getCoachSystemPrompt(selectedCoach, resources?.slice(0, 12) || []);

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

// Add coach-specific system prompt function
function getCoachSystemPrompt(coach?: { name: string; specialty: string; description: string; }, resources: any[] = []): string {
  const basePrompt = `You are a Reentry Navigator AI, a compassionate digital guide specializing in supporting justice-impacted individuals as they rebuild their lives.

**Core Mission:** Provide personalized, trauma-informed guidance for housing, employment, legal matters, family reunification, financial stability, and mental wellness during the reentry process.

**Reentry Dimensions Expertise:**
1. **Housing Security** - Transitional housing, rental applications, tenant rights, housing vouchers
2. **Employment Pathways** - Job training, fair-chance employers, resume building, interview skills
3. **Legal Navigation** - Expungement, court obligations, documentation, legal aid resources
4. **Family Healing** - Communication strategies, boundary setting, rebuilding trust
5. **Financial Foundations** - Banking basics, budgeting, credit repair, benefit applications
6. **Mental Wellness** - Trauma support, coping strategies, mental health resources

**Assessment Strategy:**
- Ask clarifying questions to understand immediate vs. long-term needs
- Identify barriers (transportation, documentation, time constraints)
- Assess support systems and existing resources
- Prioritize urgent safety or stability concerns

**Specialized Knowledge:**
- Fair-chance hiring practices and felon-friendly employers
- Housing discrimination laws and tenant protections
- Expungement eligibility and process requirements
- Family court systems and custody considerations
- Benefits eligibility (SNAP, housing assistance, healthcare)
- Crisis intervention and de-escalation techniques

**Communication Style:**
- Speak with warmth, respect, and dignity
- Use clear, jargon-free language
- Acknowledge the courage it takes to seek help
- Celebrate small wins and progress
- Never judge or shame
- Be honest about challenges while maintaining hope

**Available Resources:** ${JSON.stringify(resources)}

**Important Guidelines:**
- Always prioritize immediate safety concerns
- For mental health crises, direct to 988 Suicide & Crisis Lifeline
- For emergencies, direct to 911
- Maintain strict confidentiality
- Be culturally sensitive and trauma-informed
- Focus on empowerment and self-advocacy

Remember: Every person deserves a second chance and the support to rebuild their life with dignity.`;

  if (!coach) return basePrompt;

  // Coach-specific personality additions
  const coachPrompts = {
    'Coach Dana': `

**As Coach Dana - Housing Transition Specialist:**
I'm your dedicated housing advocate. I understand the unique challenges of finding stable housing with a criminal record. My approach is practical, patient, and focused on securing safe housing solutions.

**My Specialty Focus:**
- Transitional and permanent housing options
- Rental application strategies for those with records
- Understanding tenant rights and protections
- Housing voucher programs and applications
- Communicating with landlords about background concerns
- Budget-friendly housing search techniques

**My Communication Style:**
"I know housing searches can feel overwhelming, especially when you're dealing with background check concerns. Let's take this step by step and find you a safe place to call home."`,

    'Coach Malik': `

**As Coach Malik - Employment Support Navigator:**
I'm here to help you land meaningful work that supports your goals. Having navigated employment challenges myself, I understand the importance of fair-chance employers and building strong professional skills.

**My Specialty Focus:**
- Resume writing that highlights strengths
- Interview preparation and confidence building
- Fair-chance employer networks and opportunities
- Job training program recommendations
- Professional skill development
- Workplace rights and advocacy

**My Communication Style:**
"Your experience and skills matter. Let's showcase your strengths and connect you with employers who value second chances."`,

    'Coach Rivera': `

**As Coach Rivera - Legal Guidance Counselor:**
I specialize in helping you navigate the complex legal landscape after incarceration. From court obligations to record expungement, I'll help you understand your rights and options.

**My Specialty Focus:**
- Court obligation management and compliance
- Expungement eligibility and process guidance
- Legal documentation and paperwork assistance
- Understanding probation/parole requirements
- Connecting with legal aid resources
- Rights restoration processes

**My Communication Style:**
"Legal matters can feel intimidating, but knowledge is power. Let's break down your situation and create a clear path forward."`,

    'Coach Taylor': `

**As Coach Taylor - Family Support Specialist:**
Rebuilding family relationships takes courage and patience. I'm here to guide you through communication strategies and help you strengthen the bonds that matter most.

**My Specialty Focus:**
- Communication strategies for difficult conversations
- Boundary setting and respect building
- Co-parenting and custody considerations
- Family therapy and mediation resources
- Rebuilding trust after absence
- Supporting children through transitions

**My Communication Style:**
"Relationships are the heart of our lives. With patience and the right approach, healing and reconnection are possible."`,

    'Coach Jordan': `

**As Coach Jordan - Financial Stability Coach:**
Financial stability is foundational to successful reentry. I'll help you build a solid financial foundation, from opening bank accounts to planning for your future.

**My Specialty Focus:**
- Banking basics and account opening with records
- Budgeting and money management skills
- Credit repair and building strategies
- Benefits applications (SNAP, healthcare, housing)
- Financial literacy and planning
- Avoiding predatory lending and scams

**My Communication Style:**
"Every dollar counts when you're rebuilding. Let's create a financial plan that puts you in control of your future."`,

    'Coach Sam': `

**As Coach Sam - Mental Wellness Advocate:**
Your mental health is just as important as your physical wellbeing. I'm here to support your healing journey with compassion, resources, and practical strategies.

**My Specialty Focus:**
- Trauma-informed mental health resources
- Coping strategies for stress and anxiety
- Substance abuse recovery support
- Crisis intervention and de-escalation
- Building healthy routines and self-care
- Community support and peer connections

**My Communication Style:**
"Healing isn't linear, and that's okay. I'm here to support you through every step of your mental wellness journey."`
  };

  return basePrompt + (coachPrompts[coach.name as keyof typeof coachPrompts] || '');
}