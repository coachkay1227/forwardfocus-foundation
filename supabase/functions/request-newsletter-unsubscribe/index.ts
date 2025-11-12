import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface UnsubscribeRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { email }: UnsubscribeRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Processing unsubscribe request for:", email);

    // Check if subscription exists
    const { data: subscription, error: fetchError } = await supabase
      .from("newsletter_subscriptions")
      .select("id, email, status")
      .eq("email", email)
      .maybeSingle();

    if (fetchError) {
      console.error("Error fetching subscription:", fetchError);
      return new Response(
        JSON.stringify({ error: "Failed to process request" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!subscription) {
      console.log("Email not found in subscriptions");
      // Don't reveal if email exists or not for privacy
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "If this email is subscribed, a verification email has been sent" 
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (subscription.status !== "active") {
      console.log("Subscription is not active");
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "This email is not currently subscribed" 
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Generate secure random token
    const tokenArray = new Uint8Array(32);
    crypto.getRandomValues(tokenArray);
    const token = Array.from(tokenArray, byte => byte.toString(16).padStart(2, '0')).join('');

    // Set token expiration to 24 hours from now
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // Update subscription with token
    const { error: updateError } = await supabase
      .from("newsletter_subscriptions")
      .update({
        unsubscribe_token: token,
        token_expires_at: expiresAt.toISOString(),
      })
      .eq("id", subscription.id);

    if (updateError) {
      console.error("Error updating subscription with token:", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to process request" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Send verification email
    const unsubscribeUrl = `${supabaseUrl.replace('.supabase.co', '')}/verify-unsubscribe?token=${token}`;
    
    const emailResponse = await resend.emails.send({
      from: "Forward Focus Elevation <onboarding@resend.dev>",
      to: [email],
      subject: "Confirm Newsletter Unsubscribe",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Confirm Unsubscribe</h1>
            </div>
            
            <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; margin-bottom: 20px;">
                We received a request to unsubscribe <strong>${email}</strong> from Forward Focus Elevation newsletter.
              </p>
              
              <p style="font-size: 16px; margin-bottom: 25px;">
                To confirm this action and complete your unsubscription, please click the button below:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${unsubscribeUrl}" 
                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                          color: white; 
                          padding: 14px 30px; 
                          text-decoration: none; 
                          border-radius: 6px; 
                          font-weight: 600;
                          display: inline-block;
                          font-size: 16px;">
                  Confirm Unsubscribe
                </a>
              </div>
              
              <p style="font-size: 14px; color: #666; margin-top: 25px;">
                Or copy and paste this link into your browser:
              </p>
              <p style="font-size: 12px; color: #667eea; word-break: break-all; background: #f5f5f5; padding: 10px; border-radius: 4px;">
                ${unsubscribeUrl}
              </p>
              
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
              
              <p style="font-size: 13px; color: #888; margin-top: 20px;">
                <strong>Important:</strong> This link will expire in 24 hours.
              </p>
              
              <p style="font-size: 13px; color: #888;">
                If you didn't request this, you can safely ignore this email. Your subscription will remain active.
              </p>
              
              <p style="font-size: 13px; color: #888; margin-top: 30px;">
                We're sad to see you go, but we respect your choice. If you change your mind, you can always resubscribe on our website.
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 20px; padding: 20px; color: #888; font-size: 12px;">
              <p>Forward Focus Elevation Platform</p>
              <p>Empowering communities through support and resources</p>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Verification email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Verification email sent. Please check your inbox to confirm unsubscription.",
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
    console.error("Error in request-newsletter-unsubscribe function:", error);
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
