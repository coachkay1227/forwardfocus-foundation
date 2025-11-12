import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get token from query parameters or body
    const url = new URL(req.url);
    const tokenFromQuery = url.searchParams.get("token");
    
    let token = tokenFromQuery;
    
    if (!token && req.method === "POST") {
      const body = await req.json();
      token = body.token;
    }

    if (!token) {
      console.log("No token provided");
      return new Response(
        JSON.stringify({ error: "Token is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Processing unsubscribe verification with token");

    // Find subscription with valid token
    const { data: subscription, error: fetchError } = await supabase
      .from("newsletter_subscriptions")
      .select("id, email, status, token_expires_at")
      .eq("unsubscribe_token", token)
      .maybeSingle();

    if (fetchError) {
      console.error("Error fetching subscription:", fetchError);
      return new Response(
        JSON.stringify({ error: "Failed to verify token" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!subscription) {
      console.log("Invalid token - subscription not found");
      return new Response(
        JSON.stringify({ 
          error: "Invalid or expired token",
          message: "This unsubscribe link is invalid or has already been used." 
        }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Check if token has expired
    const expiresAt = new Date(subscription.token_expires_at);
    if (expiresAt < new Date()) {
      console.log("Token has expired");
      return new Response(
        JSON.stringify({ 
          error: "Token expired",
          message: "This unsubscribe link has expired. Please request a new one." 
        }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Update subscription status to unsubscribed
    const { error: updateError } = await supabase
      .from("newsletter_subscriptions")
      .update({
        status: "unsubscribed",
        unsubscribed_at: new Date().toISOString(),
        unsubscribe_token: null, // Clear token after use
        token_expires_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", subscription.id);

    if (updateError) {
      console.error("Error updating subscription:", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to unsubscribe" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Successfully unsubscribed:", subscription.email);

    // Log the unsubscribe action
    await supabase
      .from("audit_logs")
      .insert({
        action: "NEWSLETTER_UNSUBSCRIBED",
        resource_type: "newsletter_subscription",
        resource_id: subscription.id,
        details: {
          email: subscription.email,
          method: "verified_email",
          timestamp: new Date().toISOString(),
        },
        severity: "info",
      });

    return new Response(
      JSON.stringify({
        success: true,
        message: "You have been successfully unsubscribed from our newsletter.",
        email: subscription.email,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in verify-newsletter-unsubscribe function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
