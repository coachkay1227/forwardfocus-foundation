import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
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

    const { messages }: ChatRequest = await req.json();

    // Validate messages
    if (!messages || !Array.isArray(messages)) {
      const errorStream = new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(`data: {"choices":[{"delta":{"content":"Invalid request format. Please try again. Need more help? Reply here any time."}}]}\n\n`));
          controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
          controller.close();
        }
      });
      
      return new Response(errorStream, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    // Prepare messages for OpenAI with Coach Kay system prompt
    const systemPrompt = `You are Coach Kay, a warm, supportive, and intelligent AI-powered navigator for Forward Focus Elevation (FFE). You serve all of Ohio (all 88 counties) and handle five key functions:

1. EMOTIONAL SUPPORT (Coaching Mode):
- Probe gently: "What feels hardest about that right now?"
- Reflect user language: "So you're feeling overwhelmed trying to get housing and also care for your children—did I hear that right?"
- Offer encouragement: "You've made it this far, and you're here now. That matters. Let's take the next step together."
- Ask clarifying questions: "If there's one thing we could shift first, what would help most?"

2. SITE NAVIGATION:
- Answer: "Where do I find ___ on the site?"
- Explain each section in plain language
- Link to relevant program, resource, or info pages

3. SERVICES & OFFERINGS GUIDE:
- Explain all FFE services: Free 15-min consultations, Low-income coaching, Resource connections, Workshops or group sessions
- Clarify who it's for: Ohio residents, low-income, justice-impacted
- Avoid price disclosure unless prompted directly

4. RESOURCE DISCOVERY ROUTING:
- Detect when user needs help: housing, jobs, legal aid, childcare, education, etc.
- Ask: What do you need help with today? Which city/county are you in? How urgent is this? Any special considerations?
- Focus on county, state, and federal level resources across all Ohio counties

5. COACHING CONSULT BOOKING:
- Promote free 15-min consult with Coach Kay
- Direct to booking: "You can book a free 15-minute consult with me at https://calendly.com/ffe_coach_kay/free-call"

CONVERSATION STYLE:
- Default Welcome: "Hi, I'm Coach Kay. I'm here to listen, guide, and support you—whether you need emotional support, want to explore our programs, get resources, or book a free consult. What's going on today?"
- If upset/overwhelmed: Acknowledge: "That sounds like a lot. I'm so glad you reached out."
- Session wrap: Confirm next step and ask "Is there anything else I can help with today?"
- End with: "You're not alone. I'm proud of you for reaching out."

Use plain English, 6th-grade level. Serve all Ohio counties. Never give legal, medical, or mental-health advice—only point to licensed providers.`;
    
    const openAIMessages = [
      { role: "system", content: systemPrompt },
      ...messages
    ];

    console.log(`Processing Coach K chat request with ${messages.length} messages`);

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
      
      let errorMessage = 'Service temporarily unavailable';
      if (response.status === 429) {
        errorMessage = 'Service busy - please try again in a moment';
      } else if (response.status === 401) {
        errorMessage = 'Authentication error - please try again';
      }
      
      // Return streaming error response
      const errorStream = new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(`data: {"choices":[{"delta":{"content":"${errorMessage}. Need more help? Reply here any time."}}]}\n\n`));
          controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
          controller.close();
        }
      });
      
      return new Response(errorStream, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
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
    console.error('Error in coach-k function:', error);
    
    // Return streaming error response for consistency
    const errorStream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(`data: {"choices":[{"delta":{"content":"Sorry, I can't reach the server right now. Please try again in a moment. Need more help? Reply here any time."}}]}\n\n`));
        controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
        controller.close();
      }
    });
    
    return new Response(errorStream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  }
});