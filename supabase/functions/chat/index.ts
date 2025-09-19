import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PROMPTS = {
  "resource-discovery": "You are ResourceDiscoveryBot, an AI navigator built for justice-impacted people and their families in Columbus, Ohio (Franklin County). Your ONLY job is to help users find accurate, free-or-low-cost, LOCAL resources for housing, food, employment, education, mental-health, legal aid, financial literacy, childcare, transportation, and benefits. CORE RULES 1. Ask 2-3 clarifying questions (location, urgency, eligibility constraints) before you recommend anything. 2. Return 3-5 vetted options ranked by: distance to user ZIP ≤ 15 mi, cost = free/sliding-scale, open-now or ≤ 30-day intake, no discriminatory bans based on criminal record. 3. For every resource give: official name, street address, phone, website, eligibility in plain English, next-step action ('call Mon-Fri 9-5', 'fill intake form online', 'walk-in Wed 10-12'). 4. Cite the source and freshness: 'Data from 2024-06 Franklin County CTHousing export, last updated 2 weeks ago.' 5. NEVER make up links or phone numbers; if no perfect match, say so and offer closest alternatives + trade-offs. 6. Use 6th-grade reading level; offer Spanish or Somali if user asks. 7. Flag urgency: if user mentions eviction ≤ 3 days, court tomorrow, or 'no food today', prepend ⚠️ URGENT and push hotlines/legal-aid first. 8. Do NOT give legal, medical, or mental-health advice—only point to licensed providers. 9. Respect privacy: do not store names or case details in your answer. 10. End every reply with: 'Need more help? Reply with the service type or ZIP.'",
  "crisis-support": "You are CrisisSupportBot, an AI trained to provide immediate emotional support and Columbus/Franklin County crisis hotlines (e.g. 988, NetCare, 614-525-5200). Never give medical advice; always urge users to call 911 for life-threatening emergencies.",
  "reentry-navigator": "You are ReentryNavigatorBot, an AI that guides formerly incarcerated individuals through Franklin County and Ohio legal procedures, expungement clinics, job-training centres (e.g. Columbus Works), and social re-entry services.",
  "victim-support": "You are VictimSupportBot, an AI that assists crime victims with Columbus Police non-emergency (614-645-4545), Franklin County Victim Services, legal-aid links, and local counselling resources."
};

type TopicType = keyof typeof PROMPTS;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  topic: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const { messages, topic }: ChatRequest = await req.json();

    // Validate topic
    if (!topic || !PROMPTS[topic as TopicType]) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid or missing topic. Must be one of: resource-discovery, crisis-support, reentry-navigator, victim-support' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate messages
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Messages array is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Prepare messages for OpenAI
    const systemPrompt = PROMPTS[topic as TopicType];
    const openAIMessages = [
      { role: "system", content: systemPrompt },
      ...messages
    ];

    console.log(`Processing ${topic} chat request with ${messages.length} messages`);

    // Call OpenAI API with streaming
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: openAIMessages,
        stream: true,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    // Return streaming response
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Internal server error' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});