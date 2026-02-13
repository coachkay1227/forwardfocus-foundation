import { Text, Section, Button } from 'https://esm.sh/@react-email/components@0.0.22';
import * as React from 'https://esm.sh/react@18.3.1';
import { BaseEmailTemplate } from './BaseEmailTemplate.tsx';

interface WelcomeEmailProps {
  name: string;
}

export const WelcomeEmail = ({ name }: WelcomeEmailProps) => (
  <BaseEmailTemplate
    previewText={`Welcome to Forward Focus Elevation, ${name}!`}
    heading={`Welcome to Forward Focus Elevation, ${name}!`}
  >
    <Text style={paragraph}>
      We're thrilled to have you join our community dedicated to empowering justice-impacted families. 
      You've taken an important first step toward growth, healing, and success.
    </Text>

    <Section style={highlightBox}>
      <Text style={highlightTitle}>🎯 What's Next?</Text>
      <Text style={highlightText}>
        • Explore our AI-powered learning pathways<br />
        • Connect with support resources in your area<br />
        • Join our healing and wellness programs<br />
        • Engage with a supportive community
      </Text>
    </Section>

    <Text style={paragraph}>
      Our platform is designed with you in mind—combining cutting-edge AI technology with 
      compassionate support to help you navigate your journey with confidence.
    </Text>

    <Section style={ctaSection}>
      <Button style={button} href="https://forward-focus-elevation.org/learn">
        Start Your Journey
      </Button>
    </Section>

    <Text style={smallText}>
      Need help getting started? Reply to this email or visit our Help Center anytime.
    </Text>
  </BaseEmailTemplate>
);

const paragraph = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 20px 0',
};

const highlightBox = {
  backgroundColor: '#f9fafb',
  border: '2px solid #e5e7eb',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
};

const highlightTitle = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold' as const,
  margin: '0 0 12px 0',
};

const highlightText = {
  color: '#4b5563',
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

const smallText = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '24px 0 0 0',
};

export default WelcomeEmail;
