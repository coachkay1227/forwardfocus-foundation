import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: 'contact' | 'coaching' | 'booking';
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request:", req.method);

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
      const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      
      const { data: recentRequests, error } = await supabaseClient
        .from("audit_logs")
        .select("id")
        .eq("action", "CONTACT_FORM_SUBMIT")
        .eq("ip_address", clientIP)
        .gte("created_at", fiveMinutesAgo);

      if (!error && recentRequests && recentRequests.length >= 5) {
        console.log(`Rate limit exceeded for IP: ${clientIP}`);
        return new Response(
          JSON.stringify({ 
            success: false,
            error: "Too many requests. Please wait a few minutes before trying again."
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

    const { name, email, subject, message, type }: ContactEmailRequest = await req.json();
    
    console.log("Processing email request:", { name, email, subject, type });

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    // Send confirmation to user
    const userEmailResponse = await resend.emails.send({
      from: "Forward Focus Elevation <support@ffeservices.net>",
      to: [email],
      subject: "Thank you for reaching out to Forward Focus Elevation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #8B5CF6, #06B6D4); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Forward Focus Elevation</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Empowering Justice-Impacted Families</p>
          </div>
          
          <h2 style="color: #374151; margin-bottom: 20px;">Thank you for contacting us, ${name}!</h2>
          
          <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="color: #374151; margin: 0;">We have received your message regarding:</p>
            <p style="color: #6B7280; margin: 10px 0 0 0; font-style: italic;">"${subject}"</p>
          </div>
          
          <p style="color: #374151; line-height: 1.6;">
            ${type === 'coaching' 
              ? "Coach Kay will personally review your inquiry and respond within 24-48 hours. In the meantime, feel free to explore our learning community and resources."
              : type === 'booking'
              ? "We'll be in touch within 24 hours to schedule your consultation. Please check your calendar for availability in the coming week."
              : "We'll get back to you as soon as possible, typically within 24-48 hours."
            }
          </p>
          
          <div style="background: linear-gradient(135deg, #8B5CF6, #06B6D4); padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center;">
            <p style="color: white; margin: 0 0 15px 0;">While you wait, explore our community resources:</p>
            <a href="https://ffeservices.net/learn" style="background: white; color: #8B5CF6; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; margin-right: 10px;">Learning Community</a>
            <a href="https://ffeservices.net/victim-services" style="background: rgba(255,255,255,0.2); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">Healing Hub</a>
          </div>
          
          <p style="color: #6B7280; font-size: 14px; margin-top: 30px;">
            Best regards,<br>
            The Forward Focus Elevation Team
          </p>
        </div>
      `,
    });

    // Send notification to admin/Coach Kay
    const adminEmailResponse = await resend.emails.send({
      from: "Forward Focus Contact <noreply@ffeservices.net>",
      to: ["support@ffeservices.net"],
      subject: `New ${type} inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #374151;">New ${type.charAt(0).toUpperCase() + type.slice(1)} Inquiry</h2>
          
          <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Type:</strong> ${type}</p>
          </div>
          
          <div style="background: white; border: 1px solid #E5E7EB; padding: 20px; border-radius: 8px;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #6B7280; font-size: 14px; margin-top: 20px;">
            Received at: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", { userEmailResponse, adminEmailResponse });

    // Log successful contact form submission (for rate limiting)
    try {
      const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      await supabaseClient
        .from("audit_logs")
        .insert({
          action: "CONTACT_FORM_SUBMIT",
          ip_address: clientIP,
          details: { email, type, subject },
          severity: "info"
        });
    } catch (logError) {
      console.error("Failed to log contact form (non-critical):", logError);
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Your message has been sent successfully! We'll get back to you soon."
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
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: "Failed to send email. Please try again or contact us directly."
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
