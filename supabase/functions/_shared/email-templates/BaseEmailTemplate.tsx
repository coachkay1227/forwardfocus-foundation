import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Link,
  Hr,
} from 'npm:@react-email/components@0.0.22';
import * as React from 'npm:react@18.3.1';

interface BaseEmailTemplateProps {
  previewText: string;
  heading: string;
  children: React.ReactNode;
  footerText?: string;
}

export const BaseEmailTemplate = ({
  previewText,
  heading,
  children,
  footerText,
}: BaseEmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>{previewText}</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header with gradient */}
        <Section style={header}>
          <Heading style={headerHeading}>Forward Focus Elevation</Heading>
          <Text style={headerSubtext}>Empowering Justice-Impacted Families</Text>
        </Section>

        {/* Main Content */}
        <Section style={content}>
          <Heading style={h1}>{heading}</Heading>
          {children}
        </Section>

        {/* Footer */}
        <Hr style={hr} />
        <Section style={footer}>
          <Text style={footerText}>
            {footerText || 'Best regards,'}
            <br />
            The Forward Focus Elevation Team
          </Text>
          <Text style={footerLinks}>
            <Link href="https://ffeservices.net/learn" style={link}>
              Learning Community
            </Link>
            {' • '}
            <Link href="https://ffeservices.net/victim-services" style={link}>
              Healing Hub
            </Link>
            {' • '}
            <Link href="https://ffeservices.net/support" style={link}>
              Get Support
            </Link>
          </Text>
          <Text style={footerCopy}>
            © 2025 Forward Focus Elevation. All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0',
  maxWidth: '600px',
  border: '1px solid #e6ebf1',
  borderRadius: '8px',
  overflow: 'hidden',
};

const header = {
  background: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
  padding: '40px 30px',
  textAlign: 'center' as const,
};

const headerHeading = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
};

const headerSubtext = {
  color: 'rgba(255,255,255,0.95)',
  fontSize: '14px',
  margin: '0',
};

const content = {
  padding: '40px 30px',
};

const h1 = {
  color: '#1a1f36',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 24px 0',
  lineHeight: '32px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '0',
};

const footer = {
  padding: '30px',
  backgroundColor: '#f6f9fc',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 16px 0',
};

const footerLinks = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0 0 16px 0',
};

const link = {
  color: '#8B5CF6',
  textDecoration: 'underline',
};

const footerCopy = {
  color: '#9ca3af',
  fontSize: '12px',
  margin: '0',
};

export default BaseEmailTemplate;
