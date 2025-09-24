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
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    const { email, name, source = "website" }: NewsletterSignupRequest = await req.json();

    if (!email) {
      throw new Error("Email is required");
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