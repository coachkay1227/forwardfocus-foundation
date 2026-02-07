import { Text, Section, Button } from 'npm:@react-email/components@0.0.22';
import * as React from 'npm:react@18.3.1';
import { BaseEmailTemplate } from './BaseEmailTemplate.tsx';

interface InactivityEmailProps {
  name: string;
  daysSinceLastActivity: number;
}

export const InactivityEmail = ({ name, daysSinceLastActivity }: InactivityEmailProps) => (
  <BaseEmailTemplate
    previewText={`We miss you at Forward Focus Elevation!`}
    heading={`We Miss You, ${name}! 💙`}
  >
    <Text style={paragraph}>
      It's been {daysSinceLastActivity} days since we last saw you, and we wanted to check in. 
      Your journey matters to us, and we're here to support you every step of the way.
    </Text>

    <Section style={reminderBox}>
      <Text style={reminderTitle}>🌟 Your Progress Awaits</Text>
      <Text style={reminderText}>
        Life gets busy, but your goals are still within reach. Whether you're looking for:
      </Text>
      <Text style={listText}>
        • Educational resources and skill-building<br />
        • Healing and wellness support<br />
        • Community connection and guidance<br />
        • Practical tools for daily challenges
      </Text>
      <Text style={reminderText}>
        We're ready when you are.
      </Text>
    </Section>

    <Text style={paragraph}>
      Sometimes all it takes is one small step to reignite your momentum. We've kept your 
      progress safe, and you can pick up right where you left off.
    </Text>

    <Section style={ctaSection}>
      <Button style={button} href="https://forward-focus-elevation.org/learn">
        Continue Your Journey
      </Button>
    </Section>

    <Text style={helpText}>
      <strong>Need Support?</strong><br />
      If something's keeping you from engaging, we want to help. Reply to this email 
      and let us know how we can better support you.
    </Text>
  </BaseEmailTemplate>
);

const paragraph = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 20px 0',
};

const reminderBox = {
  backgroundColor: '#eff6ff',
  border: '2px solid #3b82f6',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
};

const reminderTitle = {
  color: '#1e40af',
  fontSize: '18px',
  fontWeight: 'bold' as const,
  margin: '0 0 12px 0',
};

const reminderText = {
  color: '#1e3a8a',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0 0 12px 0',
};

const listText = {
  color: '#3730a3',
  fontSize: '15px',
  lineHeight: '28px',
  margin: '12px 0',
  paddingLeft: '12px',
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#06B6D4',
  color: '#ffffff',
  padding: '14px 32px',
  textDecoration: 'none',
  borderRadius: '8px',
  fontWeight: 'bold' as const,
  fontSize: '16px',
  display: 'inline-block',
};

const helpText = {
  backgroundColor: '#f9fafb',
  padding: '16px',
  borderRadius: '6px',
  color: '#4b5563',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '24px 0 0 0',
};

export default InactivityEmail;
