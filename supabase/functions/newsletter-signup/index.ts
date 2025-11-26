import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { Resend } from "npm:resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterSignupRequest {
  email: string;
  name?: string;
  source?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Simple fail-open rate limiting
    const clientIP = req.headers.get("x-forwarded-for")?.split(',')[0].trim() || 
                     req.headers.get("x-real-ip") || 
                     "unknown";
    
    // Check rate limit (fail-open: if check fails, allow request)
    try {
      const supabaseRateLimitClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      
      const { data: recentSignups, error } = await supabaseRateLimitClient
        .from("audit_logs")
        .select("id")
        .eq("action", "NEWSLETTER_SIGNUP")
        .eq("ip_address", clientIP)
        .gte("created_at", fiveMinutesAgo);

      if (!error && recentSignups && recentSignups.length >= 3) {
        console.log(`Newsletter signup rate limit exceeded for IP: ${clientIP}`);
        return new Response(
          JSON.stringify({ 
            success: false,
            error: "Too many signup attempts. Please wait a few minutes before trying again."
          }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          }
        );
      }
    } catch (rateLimitError) {
      // Fail open: log error but allow request to proceed
      console.error("Rate limit check failed (allowing request):", rateLimitError);
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    const requestBody: NewsletterSignupRequest = await req.json();
    const { email, name, source = "website" } = requestBody;

    // SEC4: Input validation
    if (!email || typeof email !== 'string' || email.trim().length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 255) {
      return new Response(
        JSON.stringify({ success: false, error: "Valid email address is required (max 255 characters)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (name && (typeof name !== 'string' || name.length > 100)) {
      return new Response(
        JSON.stringify({ success: false, error: "Name must be less than 100 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (source && (typeof source !== 'string' || source.length > 50)) {
      return new Response(
        JSON.stringify({ success: false, error: "Source must be less than 50 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Newsletter signup attempt for: ${email}`);

    // Get client info
    const userAgent = req.headers.get("user-agent") || "";
    
    // Parse IP address - handle comma-separated IPs from x-forwarded-for
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIP = req.headers.get("x-real-ip");
    let clientIP = "";
    
    if (forwardedFor) {
      // Take the first IP from comma-separated list
      clientIP = forwardedFor.split(',')[0].trim();
    } else if (realIP) {
      clientIP = realIP.trim();
    }

    // Check if already subscribed
    const { data: existing } = await supabaseClient
      .from("newsletter_subscriptions")
      .select("id, status")
      .eq("email", email)
      .single();

    if (existing) {
      if (existing.status === "active") {
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "You're already subscribed to our newsletter!" 
          }),
          { 
            status: 200, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      } else {
        // Reactivate subscription
        const { error: updateError } = await supabaseClient
          .from("newsletter_subscriptions")
          .update({
            status: "active",
            subscribed_at: new Date().toISOString(),
            unsubscribed_at: null,
            subscription_source: source,
            name: name || null
          })
          .eq("id", existing.id);

        if (updateError) throw updateError;
      }
    } else {
      // Create new subscription
      const { error: insertError } = await supabaseClient
        .from("newsletter_subscriptions")
        .insert({
          email,
          name: name || null,
          subscription_source: source,
          ip_address: clientIP,
          user_agent: userAgent
        });

      if (insertError) throw insertError;
    }

    // Get the subscription ID for SparkLoop/Beehiiv sync
    const { data: subscription } = await supabaseClient
      .from("newsletter_subscriptions")
      .select("id")
      .eq("email", email)
      .single();

    // Sync to SparkLoop (optional, non-blocking)
    if (Deno.env.get("SPARKLOOP_API_KEY") && subscription?.id) {
      try {
        console.log('Syncing subscriber to SparkLoop...');
        const sparkloopResponse = await fetch('https://api.sparkloop.app/v1/subscribers', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${Deno.env.get("SPARKLOOP_API_KEY")}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            team_id: Deno.env.get("SPARKLOOP_TEAM_ID"),
            custom_fields: {
              name: name || '',
              source: source || 'website'
            }
          })
        });

        if (sparkloopResponse.ok) {
          const sparkloopData = await sparkloopResponse.json();
          console.log('SparkLoop sync successful:', sparkloopData);
          
          await supabaseClient
            .from('newsletter_subscriptions')
            .update({ 
              sparkloop_subscriber_id: sparkloopData.id,
              sparkloop_referral_code: sparkloopData.referral_code 
            })
            .eq('id', subscription.id);
        } else {
          console.error('SparkLoop sync failed (non-critical):', await sparkloopResponse.text());
        }
      } catch (sparkloopError) {
        console.error('SparkLoop sync error (non-critical):', sparkloopError);
      }
    }

    // Sync to Beehiiv (optional, non-blocking)
    if (Deno.env.get("BEEHIVE_API_KEY") && subscription?.id) {
      try {
        console.log('Syncing subscriber to Beehiiv...');
        const beehiivResponse = await fetch('https://api.beehiiv.com/v2/publications/subscribers', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${Deno.env.get("BEEHIVE_API_KEY")}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            custom_fields: {
              name: name || '',
              source: source || 'website'
            }
          })
        });

        if (beehiivResponse.ok) {
          const beehiivData = await beehiivResponse.json();
          console.log('Beehiiv sync successful:', beehiivData);
          
          await supabaseClient
            .from('newsletter_subscriptions')
            .update({ beehiiv_subscriber_id: beehiivData.id })
            .eq('id', subscription.id);
        } else {
          console.error('Beehiiv sync failed (non-critical):', await beehiivResponse.text());
        }
      } catch (beehiivError) {
        console.error('Beehiiv sync error (non-critical):', beehiivError);
      }
    }

    // Send welcome email
    try {
      await resend.emails.send({
        from: "Forward Focus Elevation <support@ffeservices.net>",
        to: [email],
        subject: "Welcome to Forward Focus Elevation Newsletter!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #bb0000; text-align: center;">Welcome to Forward Focus Elevation!</h1>
            
            <p>Dear ${name || "Friend"},</p>
            
            <p>Thank you for joining our newsletter community! You'll now receive regular updates about:</p>
            
            <ul style="line-height: 1.6;">
              <li>🌟 Success stories from justice-impacted families</li>
              <li>🎓 New learning pathways and resources</li>
              <li>🤝 Community events and partnership opportunities</li>
              <li>💡 Tips for rebuilding and thriving after justice involvement</li>
              <li>🔧 Updates on our AI-powered tools and services</li>
            </ul>
            
            <p>We're committed to empowering justice-impacted families with the tools and resources needed to rebuild and thrive.</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Need immediate support?</strong></p>
              <p style="margin: 5px 0 0 0;">Visit our <a href="https://ffeservices.net/get-help-now" style="color: #bb0000;">Get Help Now</a> page for crisis resources and AI-powered guidance.</p>
            </div>
            
            <p>Thank you for being part of our mission to build stronger, more supportive communities.</p>
            
            <p>With gratitude,<br>
            The Forward Focus Elevation Team</p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
            <p style="font-size: 12px; color: #666; text-align: center;">
              You can <a href="https://ffeservices.net/unsubscribe?email=${encodeURIComponent(email)}" style="color: #666;">unsubscribe</a> at any time.
            </p>
          </div>
        `,
      });
      
      console.log(`Welcome email sent to: ${email}`);
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
      // Don't fail the entire request if email fails
    }

    // Log successful newsletter signup (for rate limiting)
    try {
      await supabaseClient
        .from("audit_logs")
        .insert({
          action: "NEWSLETTER_SIGNUP",
          ip_address: clientIP,
          details: { email, source },
          severity: "info"
        });
    } catch (logError) {
      console.error("Failed to log newsletter signup (non-critical):", logError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Successfully subscribed! Check your email for a welcome message." 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error: any) {
    console.error("Newsletter signup error:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to subscribe to newsletter" 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
};

serve(handler);