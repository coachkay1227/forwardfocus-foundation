import { Text, Section, Button } from 'https://esm.sh/@react-email/components@0.0.22';
import * as React from 'https://esm.sh/react@18.3.1';
import { BaseEmailTemplate } from './BaseEmailTemplate.tsx';

interface ContactConfirmationProps {
  name: string;
  subject: string;
  type: 'contact' | 'coaching' | 'booking';
}

export const ContactConfirmation = ({
  name,
  subject,
  type,
}: ContactConfirmationProps) => {
  const getTypeMessage = () => {
    switch (type) {
      case 'coaching':
        return 'Coach Kay will personally review your inquiry and respond within 24-48 hours. In the meantime, feel free to explore our learning community and resources.';
      case 'booking':
        return "We'll be in touch within 24 hours to schedule your consultation. Please check your calendar for availability in the coming week.";
      default:
        return "We'll get back to you as soon as possible, typically within 24-48 hours.";
    }
  };

  return (
    <BaseEmailTemplate
      previewText={`Thank you for reaching out, ${name}!`}
      heading={`Thank you for contacting us, ${name}!`}
    >
      <Section style={messageBox}>
        <Text style={messageBoxText}>We have received your message regarding:</Text>
        <Text style={messageBoxSubject}>"{subject}"</Text>
      </Section>

      <Text style={paragraph}>{getTypeMessage()}</Text>

      <Section style={ctaSection}>
        <Text style={ctaText}>While you wait, explore our community resources:</Text>
        <div style={buttonContainer}>
          <Button style={button} href="https://forward-focus-elevation.org/learn">
            Learning Community
          </Button>
          <Button style={buttonSecondary} href="https://forward-focus-elevation.org/victim-services">
            Healing Hub
          </Button>
        </div>
      </Section>
    </BaseEmailTemplate>
  );
};

// Styles
const paragraph = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 24px 0',
};

const messageBox = {
  backgroundColor: '#f3f4f6',
  padding: '20px',
  borderRadius: '8px',
  margin: '0 0 24px 0',
};

const messageBoxText = {
  color: '#374151',
  fontSize: '14px',
  margin: '0 0 8px 0',
};

const messageBoxSubject = {
  color: '#6b7280',
  fontSize: '16px',
  fontStyle: 'italic' as const,
  margin: '0',
};

const ctaSection = {
  background: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
  padding: '30px',
  borderRadius: '8px',
  margin: '24px 0',
  textAlign: 'center' as const,
};

const ctaText = {
  color: '#ffffff',
  fontSize: '16px',
  margin: '0 0 20px 0',
};

const buttonContainer = {
  display: 'flex',
  gap: '12px',
  justifyContent: 'center',
  flexWrap: 'wrap' as const,
};

const button = {
  backgroundColor: '#ffffff',
  color: '#8B5CF6',
  padding: '12px 24px',
  textDecoration: 'none',
  borderRadius: '6px',
  fontWeight: 'bold' as const,
  display: 'inline-block',
};

const buttonSecondary = {
  backgroundColor: 'rgba(255,255,255,0.2)',
  color: '#ffffff',
  padding: '12px 24px',
  textDecoration: 'none',
  borderRadius: '6px',
  fontWeight: 'bold' as const,
  display: 'inline-block',
};

export default ContactConfirmation;
