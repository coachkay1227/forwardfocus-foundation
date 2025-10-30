import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BeehiivWebhookPayload {
  subscriber_email: string;
  partner_newsletter: string;
  earnings_amount: number;
  transaction_id: string;
  event_type: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const webhookData: BeehiivWebhookPayload = await req.json();
    
    console.log('Beehiiv webhook received:', webhookData);

    // Find subscriber by email
    const { data: subscriber, error: subscriberError } = await supabaseAdmin
      .from('newsletter_subscriptions')
      .select('id, beehiiv_earnings_generated')
      .eq('email', webhookData.subscriber_email)
      .single();

    if (subscriberError || !subscriber) {
      console.error('Subscriber not found:', webhookData.subscriber_email);
      return new Response(
        JSON.stringify({ error: 'Subscriber not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Record the earning
    const { error: earningsError } = await supabaseAdmin
      .from('monetization_earnings')
      .insert({
        subscriber_id: subscriber.id,
        platform: 'beehiiv',
        partner_newsletter: webhookData.partner_newsletter,
        earnings_amount: webhookData.earnings_amount,
        transaction_id: webhookData.transaction_id,
        payout_status: 'pending'
      });

    if (earningsError) {
      console.error('Error recording earnings:', earningsError);
      throw earningsError;
    }

    // Update subscriber's total earnings
    const newTotal = (subscriber.beehiiv_earnings_generated || 0) + webhookData.earnings_amount;
    const { error: updateError } = await supabaseAdmin
      .from('newsletter_subscriptions')
      .update({ beehiiv_earnings_generated: newTotal })
      .eq('id', subscriber.id);

    if (updateError) {
      console.error('Error updating subscriber earnings:', updateError);
      throw updateError;
    }

    console.log(`✅ Beehiiv earning recorded: $${webhookData.earnings_amount} from ${webhookData.partner_newsletter}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Earning recorded successfully',
        amount: webhookData.earnings_amount 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Beehiiv webhook error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
