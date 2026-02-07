import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { Resend } from "npm:resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterSendRequest {
  subject: string;
  content: string;
  recipientFilter?: {
    status?: string;
    source?: string;
  };
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

    // Verify admin authentication from request headers
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Authentication required");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !userData.user) {
      throw new Error("Invalid authentication");
    }

    // Verify admin status
    const { data: userRoles } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', userData.user.id);

    const isAdmin = userRoles?.some(role => role.role === 'admin');
    if (!isAdmin) {
      throw new Error("Admin privileges required");
    }

    const { subject, content, recipientFilter }: NewsletterSendRequest = await req.json();

    if (!subject || !content) {
      throw new Error("Subject and content are required");
    }

    console.log(`Starting newsletter send: ${subject}`);

    // Build query for recipients
    let query = supabaseClient
      .from('newsletter_subscriptions')
      .select('email, name')
      .eq('status', 'active');

    if (recipientFilter?.source) {
      query = query.eq('subscription_source', recipientFilter.source);
    }

    const { data: recipients, error: recipientError } = await query;

    if (recipientError) throw recipientError;

    if (!recipients || recipients.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "No active subscribers found" 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log(`Sending to ${recipients.length} recipients`);

    // Create campaign record
    const { data: campaign, error: campaignError } = await supabaseClient
      .from('email_campaigns')
      .insert({
        name: `Newsletter: ${subject}`,
        subject,
        content,
        status: 'sending',
        created_by: userData.user.id,
        recipient_count: recipients.length
      })
      .select()
      .single();

    if (campaignError) throw campaignError;

    let successCount = 0;
    let failureCount = 0;

    // Send emails in batches to avoid rate limits
    const batchSize = 10;
    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);
      
      await Promise.all(batch.map(async (recipient) => {
        try {
          await resend.emails.send({
            from: "Forward Focus Elevation <support@forward-focus-elevation.org>",
            to: [recipient.email],
            subject,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                  <h1 style="color: #bb0000; margin: 0;">Forward Focus Elevation</h1>
                  <p style="color: #666; margin: 5px 0;">Empowering Justice-Impacted Families</p>
                </div>
                
                <div style="background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                  ${content.replace(/\n/g, '<br>')}
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
                  <p style="color: #666; font-size: 14px; margin: 10px 0;">
                    <strong>Need Support?</strong><br>
                    Visit our <a href="https://forward-focus-elevation.org/get-help-now" style="color: #bb0000;">Get Help Now</a> page for resources and AI-powered guidance.
                  </p>
                  
                  <div style="margin-top: 20px;">
                    <a href="https://forward-focus-elevation.org" style="color: #bb0000; text-decoration: none; margin: 0 10px;">Website</a>
                    <a href="https://forward-focus-elevation.org/learn-grow" style="color: #bb0000; text-decoration: none; margin: 0 10px;">Learning</a>
                    <a href="https://forward-focus-elevation.org/partners" style="color: #bb0000; text-decoration: none; margin: 0 10px;">Partners</a>
                  </div>
                  
                  <p style="color: #999; font-size: 12px; margin-top: 20px;">
                    You can <a href="https://forward-focus-elevation.org/unsubscribe?email=${encodeURIComponent(recipient.email)}" style="color: #999;">unsubscribe</a> at any time.
                  </p>
                </div>
              </div>
            `,
          });
          
          successCount++;
        } catch (error) {
          console.error(`Failed to send to ${recipient.email}:`, error);
          failureCount++;
        }
      }));

      // Small delay between batches
      if (i + batchSize < recipients.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Update campaign with results
    await supabaseClient
      .from('email_campaigns')
      .update({
        status: 'sent',
        sent_at: new Date().toISOString(),
        success_count: successCount,
        failure_count: failureCount
      })
      .eq('id', campaign.id);

    console.log(`Newsletter send complete: ${successCount} success, ${failureCount} failures`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Newsletter sent successfully to ${successCount} recipients`,
        stats: {
          total: recipients.length,
          success: successCount,
          failures: failureCount
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error: any) {
    console.error("Newsletter send error:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to send newsletter" 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
};

serve(handler);