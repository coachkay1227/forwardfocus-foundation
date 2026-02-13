import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AuthEmailRequest {
  email: string;
  type: 'welcome' | 'password_reset' | 'email_change';
  userData?: {
    name?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received auth email request:", req.method);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, type, userData }: AuthEmailRequest = await req.json();
    
    console.log("Processing auth email:", { email, type });

    let emailContent = "";
    let subject = "";

    switch (type) {
      case 'welcome':
        subject = "Welcome to Forward Focus Elevation - Your Journey Begins!";
        emailContent = generateWelcomeEmail(email, userData?.name);
        break;
      case 'password_reset':
        subject = "Password Reset Request - Forward Focus Elevation";
        emailContent = generatePasswordResetEmail(email);
        break;
      case 'email_change':
        subject = "Email Address Change Confirmation - Forward Focus Elevation";
        emailContent = generateEmailChangeEmail(email);
        break;
      default:
        throw new Error("Invalid email type");
    }

    // Send email to user
    const emailResponse = await resend.emails.send({
      from: "Forward Focus Elevation <welcome@forward-focus-elevation.org>",
      to: [email],
      subject: subject,
      html: emailContent,
    });

    console.log("Auth email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Email sent successfully"
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
    console.error("Error in send-auth-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: "Failed to send email"
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

function generateWelcomeEmail(email: string, name?: string): string {
  const displayName = name || email.split('@')[0];
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <div style="background: linear-gradient(135deg, #8B5CF6, #06B6D4); padding: 40px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
        <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">Welcome to Forward Focus Elevation!</h1>
        <p style="color: rgba(255,255,255,0.95); margin: 15px 0 0 0; font-size: 18px;">Your journey of growth and healing begins now</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 25px;">
        <h2 style="color: #374151; margin-top: 0; font-size: 24px;">Hi ${displayName}!</h2>
        <p style="color: #374151; line-height: 1.7; font-size: 16px;">
          Thank you for joining our supportive community! We're honored to have you as part of the Forward Focus Elevation family.
        </p>
        <p style="color: #374151; line-height: 1.7; font-size: 16px;">
          Our platform is designed specifically to empower justice-impacted families with AI-powered resources, learning opportunities, and healing tools.
        </p>
      </div>
      
      <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 25px;">
        <h3 style="color: #8B5CF6; margin-top: 0; font-size: 20px;">🚀 Get Started Today:</h3>
        <div style="margin: 20px 0;">
          <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <div style="background: #8B5CF6; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px;">1</div>
            <p style="margin: 0; color: #374151;">Explore our Learning Community for personalized education paths</p>
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <div style="background: #06B6D4; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px;">2</div>
            <p style="margin: 0; color: #374151;">Visit the Healing Hub for wellness resources and support</p>
          </div>
          <div style="display: flex; align-items: center;">
            <div style="background: #10B981; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px;">3</div>
            <p style="margin: 0; color: #374151;">Connect with Coach Kay for personalized guidance</p>
          </div>
        </div>
      </div>
      
      <div style="background: linear-gradient(135deg, #8B5CF6, #06B6D4); padding: 25px; border-radius: 10px; text-align: center; margin-bottom: 25px;">
        <p style="color: white; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">Ready to explore?</p>
        <div style="display: flex; flex-direction: column; gap: 10px; max-width: 400px; margin: 0 auto;">
          <a href="https://forward-focus-elevation.org/learn" 
             style="background: white; color: #8B5CF6; padding: 15px 25px; text-decoration: none; border-radius: 8px; display: block; font-weight: bold; font-size: 16px;">
            Start Learning →
          </a>
          <a href="https://forward-focus-elevation.org/victim-services" 
             style="background: rgba(255,255,255,0.2); color: white; padding: 15px 25px; text-decoration: none; border-radius: 8px; display: block; font-weight: bold; font-size: 16px; border: 2px solid white;">
            Healing Hub →
          </a>
        </div>
      </div>
      
      <div style="background: #FEF3C7; padding: 20px; border-radius: 8px; border-left: 4px solid #F59E0B; margin-bottom: 25px;">
        <p style="margin: 0; color: #92400E; font-weight: 600;">💡 Pro Tip:</p>
        <p style="margin: 5px 0 0 0; color: #92400E;">
          Complete your profile to unlock personalized content recommendations and connect with others in similar situations.
        </p>
      </div>
      
      <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 25px;">
        <h3 style="color: #374151; margin-top: 0;">Need Help Getting Started?</h3>
        <p style="color: #6B7280; margin-bottom: 15px;">Our support team is here to help you make the most of your experience.</p>
        <ul style="color: #6B7280; line-height: 1.6;">
          <li>Email us at <strong>support@forward-focus-elevation.org</strong></li>
          <li>Check out our <a href="https://forward-focus-elevation.org/about" style="color: #8B5CF6;">About Us</a> page to learn more about our mission</li>
          <li>Join our community discussions and connect with others</li>
        </ul>
      </div>
      
      <div style="text-align: center; padding: 25px; border-top: 2px solid #E5E7EB; color: #6B7280; margin-top: 30px;">
        <p style="margin: 0 0 10px 0; font-size: 18px; font-weight: 600; color: #374151;">Forward Focus Elevation</p>
        <p style="margin: 0; font-size: 14px;">Empowering Justice-Impacted Families Through AI-Powered Education</p>
        <p style="margin: 10px 0 0 0; font-size: 12px;">
          This email was sent to ${email}. If you have any questions, contact us at support@forward-focus-elevation.org
        </p>
      </div>
    </div>
  `;
}

function generatePasswordResetEmail(email: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #8B5CF6, #06B6D4); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Password Reset Request</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Forward Focus Elevation</p>
      </div>
      
      <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <p style="color: #374151; margin: 0;">
          We received a request to reset the password for your account (${email}). If you didn't make this request, you can safely ignore this email.
        </p>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <p style="color: #6B7280;">If you need help, contact us at support@forward-focus-elevation.org</p>
      </div>
    </div>
  `;
}

function generateEmailChangeEmail(email: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #8B5CF6, #06B6D4); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Email Change Confirmation</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Forward Focus Elevation</p>
      </div>
      
      <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <p style="color: #374151; margin: 0;">
          Your email address has been successfully changed to: ${email}
        </p>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <p style="color: #6B7280;">If you have any questions, contact us at support@forward-focus-elevation.org</p>
      </div>
    </div>
  `;
}

serve(handler);