import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { Resend } from "https://esm.sh/resend@4.0.0";
import React from 'https://esm.sh/react@18.3.1';
import { renderAsync } from 'https://esm.sh/@react-email/components@0.0.22';
import { WelcomeEmail } from '../_shared/email-templates/WelcomeEmail.tsx';
import { MilestoneEmail } from '../_shared/email-templates/MilestoneEmail.tsx';
import { InactivityEmail } from '../_shared/email-templates/InactivityEmail.tsx';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const cronSecret = Deno.env.get("CRON_SECRET_TOKEN");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Processing automation queue:", req.method);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify cron secret
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      console.error("Unauthorized: Invalid cron secret");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 1. Process pending queue items
    const { data: queueItems, error: queueError } = await supabase
      .from('email_automation_queue')
      .select(`
        *,
        email_automation_rules (
          rule_name,
          email_subject,
          email_type
        ),
        profiles (
          email,
          full_name
        )
      `)
      .eq('status', 'pending')
      .lte('scheduled_for', new Date().toISOString())
      .limit(50);

    if (queueError) throw queueError;

    console.log(`Found ${queueItems?.length || 0} emails to send`);

    // Process each email
    for (const item of queueItems || []) {
      try {
        const rule = item.email_automation_rules;
        const profile = item.profiles;
        const triggerData = item.trigger_data || {};

        const recipientName = triggerData.name || profile?.full_name || 'there';
        const recipientEmail = triggerData.email || profile?.email;

        if (!recipientEmail) {
          console.error(`No email found for queue item ${item.id}`);
          await supabase
            .from('email_automation_queue')
            .update({ status: 'failed', error_message: 'No recipient email' })
            .eq('id', item.id);
          continue;
        }

        // Render appropriate template
        let emailHtml: string;
        
        switch (rule.email_type) {
          case 'welcome':
            emailHtml = await renderAsync(
              React.createElement(WelcomeEmail, { name: recipientName })
            );
            break;
            
          case 'milestone':
            emailHtml = await renderAsync(
              React.createElement(MilestoneEmail, {
                name: recipientName,
                milestoneTitle: triggerData.module_id || 'Learning Module',
              })
            );
            break;
            
          case 'inactivity':
            emailHtml = await renderAsync(
              React.createElement(InactivityEmail, {
                name: recipientName,
                daysSinceLastActivity: triggerData.days_inactive || 7,
              })
            );
            break;
            
          default:
            console.error(`Unknown email type: ${rule.email_type}`);
            continue;
        }

        // Send email
        const emailResponse = await resend.emails.send({
          from: "Forward Focus Elevation <support@ffeservices.net>",
          to: [recipientEmail],
          subject: rule.email_subject,
          html: emailHtml,
        });

        if (emailResponse.error) {
          throw emailResponse.error;
        }

        // Update queue item as sent
        await supabase
          .from('email_automation_queue')
          .update({
            status: 'sent',
            sent_at: new Date().toISOString(),
            resend_email_id: emailResponse.data?.id,
          })
          .eq('id', item.id);

        console.log(`Successfully sent ${rule.email_type} email to ${recipientEmail}`);
      } catch (itemError: any) {
        console.error(`Error processing queue item ${item.id}:`, itemError);
        
        await supabase
          .from('email_automation_queue')
          .update({
            status: 'failed',
            error_message: itemError.message,
          })
          .eq('id', item.id);
      }
    }

    // 2. Check for inactive users (last activity > 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    
    const { data: inactiveUsers, error: inactiveError } = await supabase
      .from('profiles')
      .select('id, email, full_name, updated_at')
      .lt('updated_at', sevenDaysAgo)
      .limit(20);

    if (!inactiveError && inactiveUsers) {
      for (const user of inactiveUsers) {
        // Check if we already sent an inactivity email recently
        const { data: existingQueue } = await supabase
          .from('email_automation_queue')
          .select('id')
          .eq('user_id', user.id)
          .in('status', ['pending', 'sent'])
          .gte('created_at', sevenDaysAgo)
          .limit(1);

        if (!existingQueue || existingQueue.length === 0) {
          // Queue inactivity email
          await supabase.rpc('queue_automation_email', {
            p_user_id: user.id,
            p_rule_name: 'inactivity_7days',
            p_trigger_data: {
              email: user.email,
              name: user.full_name || 'there',
              days_inactive: 7,
            },
          });

          console.log(`Queued inactivity email for user ${user.id}`);
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        processed: queueItems?.length || 0,
        inactiveChecked: inactiveUsers?.length || 0,
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
    console.error("Error in process-automation-queue:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
};

serve(handler);
