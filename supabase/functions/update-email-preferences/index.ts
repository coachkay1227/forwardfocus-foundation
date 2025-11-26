import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailPreferences {
  monday_newsletter?: boolean;
  wednesday_collective?: boolean;
  friday_recap?: boolean;
  sunday_community_call?: boolean;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);
    
    const requestBody = await req.json() as {
      subscriberId: string;
      preferences?: EmailPreferences;
      unsubscribeAll?: boolean;
    };
    const { subscriberId, preferences, unsubscribeAll } = requestBody;

    // SEC4: Input validation
    if (!subscriberId || typeof subscriberId !== 'string') {
      return new Response(
        JSON.stringify({ error: "Subscriber ID is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(subscriberId)) {
      return new Response(
        JSON.stringify({ error: "Invalid subscriber ID format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Validate preferences if provided
    if (preferences) {
      const validKeys = ['monday_newsletter', 'wednesday_collective', 'friday_recap', 'sunday_community_call'];
      const providedKeys = Object.keys(preferences);
      
      if (providedKeys.some(key => !validKeys.includes(key))) {
        return new Response(
          JSON.stringify({ error: "Invalid preference keys provided" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (providedKeys.some(key => typeof preferences[key as keyof EmailPreferences] !== 'boolean')) {
        return new Response(
          JSON.stringify({ error: "Preference values must be boolean" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Verify subscriber exists
    const { data: subscriber, error: subscriberError } = await supabaseClient
      .from('newsletter_subscriptions')
      .select('*')
      .eq('id', subscriberId)
      .single();

    if (subscriberError || !subscriber) {
      throw new Error("Subscriber not found");
    }

    if (unsubscribeAll) {
      // Unsubscribe from all emails
      await supabaseClient
        .from('newsletter_subscriptions')
        .update({
          status: 'inactive',
          unsubscribed_at: new Date().toISOString()
        })
        .eq('id', subscriberId);

      return new Response(JSON.stringify({ 
        message: "Successfully unsubscribed from all emails" 
      }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (preferences) {
      // Update or create email preferences
      const { data: existingPrefs } = await supabaseClient
        .from('email_preferences')
        .select('*')
        .eq('subscriber_id', subscriberId)
        .single();

      if (existingPrefs) {
        // Update existing preferences
        await supabaseClient
          .from('email_preferences')
          .update({
            ...preferences,
            updated_at: new Date().toISOString()
          })
          .eq('subscriber_id', subscriberId);
      } else {
        // Create new preferences
        await supabaseClient
          .from('email_preferences')
          .insert({
            subscriber_id: subscriberId,
            ...preferences
          });
      }

      // Update newsletter_subscriptions updated_at
      await supabaseClient
        .from('newsletter_subscriptions')
        .update({
          updated_at: new Date().toISOString()
        })
        .eq('id', subscriberId);

      return new Response(JSON.stringify({ 
        message: "Email preferences updated successfully",
        preferences
      }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    throw new Error("No preferences provided");

  } catch (error: any) {
    console.error("Error in update-email-preferences:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
