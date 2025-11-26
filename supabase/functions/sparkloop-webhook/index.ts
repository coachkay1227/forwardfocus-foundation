import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders, handleCorsPreFlight, errorResponse, successResponse, verifyWebhookSignature } from '../_shared/utils.ts';

interface SparkLoopWebhookPayload {
  subscriber_email: string;
  partner_newsletter: string;
  earnings_amount: number;
  transaction_id: string;
  event_type: string;
}

Deno.serve(async (req) => {
  const corsResponse = handleCorsPreFlight(req);
  if (corsResponse) return corsResponse;

  try {
    // Optional signature verification (backward compatible)
    const signature = req.headers.get('x-sparkloop-signature');
    const secret = Deno.env.get('SPARKLOOP_WEBHOOK_SECRET');
    const rawBody = await req.text();
    
    const isValidSignature = await verifyWebhookSignature(rawBody, signature, secret);
    if (!isValidSignature) {
      return errorResponse('Invalid webhook signature', 401);
    }

    const webhookData: SparkLoopWebhookPayload = JSON.parse(rawBody);
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    
    console.log('SparkLoop webhook received:', webhookData);

    // Find subscriber by email
    const { data: subscriber, error: subscriberError } = await supabaseAdmin
      .from('newsletter_subscriptions')
      .select('id, sparkloop_earnings_generated')
      .eq('email', webhookData.subscriber_email)
      .single();

    if (subscriberError || !subscriber) {
      console.error('Subscriber not found:', webhookData.subscriber_email);
      return errorResponse('Subscriber not found', 404);
    }

    // Record the earning
    const { error: earningsError } = await supabaseAdmin
      .from('monetization_earnings')
      .insert({
        subscriber_id: subscriber.id,
        platform: 'sparkloop',
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
    const newTotal = (subscriber.sparkloop_earnings_generated || 0) + webhookData.earnings_amount;
    const { error: updateError } = await supabaseAdmin
      .from('newsletter_subscriptions')
      .update({ sparkloop_earnings_generated: newTotal })
      .eq('id', subscriber.id);

    if (updateError) {
      console.error('Error updating subscriber earnings:', updateError);
      throw updateError;
    }

    console.log(`✅ SparkLoop earning recorded: $${webhookData.earnings_amount} from ${webhookData.partner_newsletter}`);

    return successResponse({ 
      success: true, 
      message: 'Earning recorded successfully',
      amount: webhookData.earnings_amount 
    });

  } catch (error) {
    return errorResponse(error.message);
  }
});
