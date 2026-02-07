import { Text, Section, Button } from 'npm:@react-email/components@0.0.22';
import * as React from 'npm:react@18.3.1';
import { BaseEmailTemplate } from './BaseEmailTemplate.tsx';

interface MilestoneEmailProps {
  name: string;
  milestoneTitle: string;
}

export const MilestoneEmail = ({ name, milestoneTitle }: MilestoneEmailProps) => (
  <BaseEmailTemplate
    previewText={`Congratulations on completing ${milestoneTitle}!`}
    heading={`🎉 Amazing Progress, ${name}!`}
  >
    <Section style={celebrationBox}>
      <Text style={celebrationEmoji}>🏆</Text>
      <Text style={celebrationText}>
        You've completed: <strong>{milestoneTitle}</strong>
      </Text>
    </Section>

    <Text style={paragraph}>
      Every milestone you reach represents real growth and dedication to your journey. 
      This achievement is a testament to your commitment and resilience.
    </Text>

    <Section style={statsBox}>
      <Text style={statsText}>
        <strong>Your Impact:</strong><br />
        Each completed module brings you closer to your goals and demonstrates the power 
        of education and perseverance. You're not just learning—you're transforming your future.
      </Text>
    </Section>

    <Text style={paragraph}>
      Ready to keep the momentum going? Continue exploring your learning pathway and 
      discover what's next on your journey.
    </Text>

    <Section style={ctaSection}>
      <Button style={button} href="https://forward-focus-elevation.org/learn">
        Continue Learning
      </Button>
    </Section>

    <Text style={encouragement}>
      Remember: Every step forward, no matter how small, is progress worth celebrating. 
      We're proud of you! 💪
    </Text>
  </BaseEmailTemplate>
);

const paragraph = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 20px 0',
};

const celebrationBox = {
  background: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
  borderRadius: '12px',
  padding: '32px',
  textAlign: 'center' as const,
  margin: '24px 0',
};

const celebrationEmoji = {
  fontSize: '48px',
  margin: '0 0 16px 0',
};

const celebrationText = {
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: '600' as const,
  margin: '0',
  lineHeight: '28px',
};

const statsBox = {
  backgroundColor: '#fef3c7',
  border: '2px solid #fbbf24',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
};

const statsText = {
  color: '#92400e',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0',
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#8B5CF6',
  color: '#ffffff',
  padding: '14px 32px',
  textDecoration: 'none',
  borderRadius: '8px',
  fontWeight: 'bold' as const,
  fontSize: '16px',
  display: 'inline-block',
};

const encouragement = {
  color: '#6b7280',
  fontSize: '15px',
  fontStyle: 'italic' as const,
  textAlign: 'center' as const,
  margin: '24px 0 0 0',
};

export default MilestoneEmail;
