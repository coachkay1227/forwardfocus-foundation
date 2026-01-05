// Branded Email Template System for Forward Focus Elevation
// OSU Scarlet themed email templates with dynamic variables

import { SITE_CONFIG, getSiteUrl } from './site-config.ts';

interface EmailVariables {
  firstName?: string;
  email?: string;
  lastLogin?: string;
  coachAvailability?: string;
  newResourcesCount?: number;
  resourcesViewed?: number;
  aiChatsCount?: number;
  healingMinutes?: number;
  memberSince?: string;
  sessionsAttended?: number;
  nextAvailableSession?: string;
  callType?: 'live' | 'recording';
  zoomLink?: string;
  recordingLink?: string;
  callTopic?: string;
  callDate?: string;
  unsubscribeLink?: string;
  preferencesLink?: string;
}

const OSU_SCARLET = '#BB0000';
const OSU_GRAY = '#666666';

export function getBaseTemplate(content: string, variables: EmailVariables): string {
  const firstName = variables.firstName || 'Friend';
  const unsubscribeLink = variables.unsubscribeLink || '#';
  const preferencesLink = variables.preferencesLink || '#';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${SITE_CONFIG.name}</title>
  <style>
    body { margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; background-color: #f5f5f5; }
    table { border-collapse: collapse; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: ${OSU_SCARLET}; padding: 30px 20px; text-align: center; }
    .header img { max-width: 180px; height: auto; }
    .content { padding: 30px 20px; }
    .greeting { font-family: 'Poppins', Arial, sans-serif; font-size: 28px; font-weight: 700; color: ${OSU_SCARLET}; margin: 0 0 20px 0; }
    .text { color: ${OSU_GRAY}; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; }
    .button { display: inline-block; background: ${OSU_SCARLET}; color: #ffffff !important; padding: 15px 35px; border-radius: 8px; text-decoration: none; font-family: 'Poppins', Arial, sans-serif; font-weight: 700; font-size: 16px; margin: 20px 0; }
    .button:hover { background: #A10000; }
    .section { margin: 30px 0; padding: 20px; background: #f9f9f9; border-radius: 8px; }
    .section-title { font-family: 'Poppins', Arial, sans-serif; font-size: 20px; font-weight: 600; color: ${OSU_SCARLET}; margin: 0 0 15px 0; }
    .footer { background: #f5f5f5; padding: 30px 20px; text-align: center; font-size: 12px; color: ${OSU_GRAY}; }
    .footer a { color: ${OSU_SCARLET}; text-decoration: none; }
    .footer a:hover { text-decoration: underline; }
    .divider { height: 1px; background: #e0e0e0; margin: 30px 0; }
    @media only screen and (max-width: 600px) {
      .content { padding: 20px 15px; }
      .greeting { font-size: 24px; }
      .button { padding: 12px 25px; font-size: 14px; }
    }
  </style>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table class="container" width="600" cellpadding="0" cellspacing="0">
          <!-- Header -->
          <tr>
            <td class="header">
              <img src="${SITE_CONFIG.logoUrl}" alt="${SITE_CONFIG.name}" />
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td class="content">
              <h1 class="greeting">Hi ${firstName}! 👋</h1>
              ${content}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td class="footer">
              <p style="margin: 0 0 10px 0;">
                <a href="${preferencesLink}">Manage Email Preferences</a> | 
                <a href="${unsubscribeLink}">Unsubscribe</a>
              </p>
              <p style="margin: 0 0 10px 0;"><strong>${SITE_CONFIG.name}</strong> | Powered by Coach Kay</p>
              <p style="margin: 0; color: #999;">
                Empowering communities through healing, growth, and transformation.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function getMondayNewsletterTemplate(variables: EmailVariables): string {
  const resourcesCount = variables.newResourcesCount || 0;
  const coachAvailability = variables.coachAvailability || 'limited availability';
  const lastLogin = variables.lastLogin || '';
  const showMissYou = lastLogin && lastLogin.includes('days ago');

  const content = `
    <p class="text">
      Welcome to your weekly dose of resources, tools, and support! 
      ${showMissYou ? '💙 <strong>We miss you!</strong> It\'s been a while since your last visit.' : ''}
    </p>

    ${resourcesCount > 0 ? `
    <div class="section">
      <h2 class="section-title">✨ New This Week</h2>
      <p class="text">
        We've added <strong>${resourcesCount} new verified resources</strong> to help you on your journey. 
        Explore housing, employment, legal aid, and more.
      </p>
      <a href="${getSiteUrl('/search')}" class="button">Browse Resources</a>
    </div>
    ` : ''}

    <div class="section">
      <h2 class="section-title">🤖 AI-Powered Support</h2>
      <p class="text">
        Our Reentry Navigator AI is here 24/7 to help you find resources, answer questions, 
        and guide you through reentry challenges. It's completely free!
      </p>
      <a href="${getSiteUrl('/learn')}" class="button">Chat with AI Navigator</a>
    </div>

    <div class="section">
      <h2 class="section-title">🌿 Healing Hub</h2>
      <p class="text">
        Take a moment for yourself. Access guided breathing exercises, healing frequencies, 
        and mindfulness tools designed for your wellbeing.
      </p>
      <a href="${getSiteUrl('/learn#healing')}" class="button">Visit Healing Hub</a>
    </div>

    <div class="section">
      <h2 class="section-title">💬 Book Your Breakthrough Session</h2>
      <p class="text">
        Coach Kay has <strong>${coachAvailability}</strong> this week. Schedule your 1-on-1 coaching 
        session or join a group session to connect with others on similar journeys.
      </p>
      <a href="${getSiteUrl('/')}" class="button">Book with Coach Kay</a>
    </div>

    <div class="divider"></div>

    <p class="text" style="text-align: center;">
      <strong>💝 Support Our Mission</strong><br>
      Help us continue providing free resources and support to our community.
    </p>
    <p style="text-align: center;">
      <a href="${getSiteUrl('/support#donate')}" class="button">Make a Donation</a>
    </p>
  `;

  return getBaseTemplate(content, variables);
}

export function getWednesdayCollectiveTemplate(variables: EmailVariables): string {
  const memberSince = variables.memberSince || 'recently';
  const sessionsAttended = variables.sessionsAttended || 0;
  const nextSession = variables.nextAvailableSession || 'this week';

  const content = `
    <p class="text">
      You're part of something special. The Collective is more than a program—it's a community 
      of resilient individuals supporting each other through transformation.
    </p>

    <div class="section">
      <h2 class="section-title">🌟 Your Journey</h2>
      <p class="text">
        You've been with us ${memberSince}${sessionsAttended > 0 ? ` and attended <strong>${sessionsAttended} sessions</strong>` : ''}. 
        Every step forward is worth celebrating!
      </p>
    </div>

    <div class="section">
      <h2 class="section-title">📅 Upcoming Sessions</h2>
      <p class="text">
        Next session: <strong>${nextSession}</strong><br>
        Join Coach Kay and fellow community members for coaching, support, and real talk.
      </p>
      <a href="${getSiteUrl('/')}" class="button">Reserve Your Spot</a>
    </div>

    <div class="section">
      <h2 class="section-title">🤝 Peer Support</h2>
      <p class="text">
        Connect with others who understand your journey. Our peer support network is here 
        for encouragement, advice, and solidarity.
      </p>
      <a href="${getSiteUrl('/help')}" class="button">Get Support Now</a>
    </div>

    <div class="section">
      <h2 class="section-title">📖 Share Your Story</h2>
      <p class="text">
        Your journey can inspire others. Submit your success story and help someone else 
        see what's possible.
      </p>
      <a href="${getSiteUrl('/success-stories')}" class="button">Share Your Story</a>
    </div>
  `;

  return getBaseTemplate(content, variables);
}

export function getFridayRecapTemplate(variables: EmailVariables): string {
  const resourcesViewed = variables.resourcesViewed || 0;
  const aiChats = variables.aiChatsCount || 0;
  const healingMinutes = variables.healingMinutes || 0;

  const hasActivity = resourcesViewed > 0 || aiChats > 0 || healingMinutes > 0;

  const content = `
    <p class="text">
      Another week of growth and progress! Let's celebrate what you've accomplished 
      and look ahead to what's coming.
    </p>

    ${hasActivity ? `
    <div class="section">
      <h2 class="section-title">📊 This Week's Highlights</h2>
      <p class="text">
        ${resourcesViewed > 0 ? `✓ You explored <strong>${resourcesViewed} resources</strong><br>` : ''}
        ${aiChats > 0 ? `✓ You had <strong>${aiChats} AI conversations</strong><br>` : ''}
        ${healingMinutes > 0 ? `✓ You spent <strong>${healingMinutes} minutes</strong> in the Healing Hub<br>` : ''}
        <br>Keep up the amazing work! 💪
      </p>
    </div>
    ` : ''}

    <div class="section">
      <h2 class="section-title">🔥 Trending Resources</h2>
      <p class="text">
        See what's helping our community most this week. From housing assistance to 
        employment programs, discover what others are finding helpful.
      </p>
      <a href="${getSiteUrl('/search')}" class="button">Explore Resources</a>
    </div>

    <div class="section">
      <h2 class="section-title">💭 Weekend Reflection</h2>
      <p class="text">
        <em>"What's one thing I'm grateful for this week?"</em><br><br>
        Take a moment this weekend to reflect, rest, and recharge. You've earned it.
      </p>
    </div>

    <div class="section">
      <h2 class="section-title">📅 Coming Monday</h2>
      <p class="text">
        Next week's newsletter will feature new resources, tools, and opportunities. 
        Stay tuned for updates that can help move you forward!
      </p>
    </div>

    <div class="divider"></div>

    <p class="text" style="text-align: center;">
      <strong>⚠️ Emergency Support Available 24/7</strong><br>
      If you need immediate help, our crisis resources are always available.
    </p>
    <p style="text-align: center;">
      <a href="${getSiteUrl('/help')}" class="button">Get Help Now</a>
    </p>
  `;

  return getBaseTemplate(content, variables);
}

export function getSundayCallTemplate(variables: EmailVariables): string {
  const callType = variables.callType || 'live';
  const isLive = callType === 'live';
  const zoomLink = variables.zoomLink || '#';
  const recordingLink = variables.recordingLink || '#';
  const callTopic = variables.callTopic || 'Community Connection & Support';
  const callDate = variables.callDate || 'tonight at 6:00 PM EST';

  const content = isLive ? `
    <p class="text">
      Join us <strong>${callDate}</strong> for our weekly community call! 
      This is your time to connect, share, and grow with fellow community members.
    </p>

    <div class="section">
      <h2 class="section-title">📞 Call Details</h2>
      <p class="text">
        <strong>Topic:</strong> ${callTopic}<br>
        <strong>When:</strong> ${callDate}<br>
        <strong>Where:</strong> Zoom (link below)<br>
        <strong>Duration:</strong> 60 minutes
      </p>
      <a href="${zoomLink}" class="button">Join Zoom Call</a>
    </div>

    <div class="section">
      <h2 class="section-title">💬 What to Expect</h2>
      <p class="text">
        • Open discussion and Q&A with Coach Kay<br>
        • Connect with other community members<br>
        • Share experiences and support each other<br>
        • Learn practical strategies and tools
      </p>
    </div>

    <p class="text">
      <strong>Can't make it?</strong> No worries! The recording will be sent out Monday morning.
    </p>
  ` : `
    <p class="text">
      Missed last week's community call? No problem! The recording is now available 
      for you to watch at your convenience.
    </p>

    <div class="section">
      <h2 class="section-title">📹 Last Week's Call</h2>
      <p class="text">
        <strong>Topic:</strong> ${callTopic}<br><br>
        <strong>Key Takeaways:</strong><br>
        • Practical strategies for overcoming barriers<br>
        • Community member success stories<br>
        • Resources and tools discussed<br>
        • Q&A with Coach Kay
      </p>
      <a href="${recordingLink}" class="button">Watch Recording</a>
    </div>

    <div class="section">
      <h2 class="section-title">📅 Next Live Call</h2>
      <p class="text">
        Join us next Sunday at 6:00 PM EST for another live community call. 
        Mark your calendar and we'll send a reminder!
      </p>
    </div>
  `;

  return getBaseTemplate(content, variables);
}

export function personalizeEmail(template: string, variables: EmailVariables): string {
  let personalized = template;
  
  // Replace all variable placeholders
  Object.entries(variables).forEach(([key, value]) => {
    const placeholder = new RegExp(`{{${key}}}`, 'g');
    personalized = personalized.replace(placeholder, String(value || ''));
  });
  
  return personalized;
}
