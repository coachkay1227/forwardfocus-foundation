/**
 * Centralized contact configuration
 * Single source of truth for all contact information
 */

export const CONTACT_CONFIG = {
  // Primary support email
  supportEmail: "support@ffeservices.net",
  
  // Organization name
  organizationName: "Forward Focus Elevation",
  
  // From email addresses for different purposes
  fromEmails: {
    support: "Forward Focus Elevation <support@ffeservices.net>",
    contact: "Forward Focus Contact <noreply@ffeservices.net>",
    newsletter: "Forward Focus Newsletter <newsletter@ffeservices.net>",
    support: "Forward Focus Elevation <support@forward-focus-elevation.org>",
    contact: "Forward Focus Contact <noreply@forward-focus-elevation.org>",
  },
  
  // Phone numbers (if applicable in future)
  phone: {
    main: "380-287-7936",
    crisis: "988", // Crisis hotline
  },
  
  // Social media (if applicable)
  social: {
    // Add social media handles when available
  },
} as const;

// Export individual constants for convenience
export const SUPPORT_EMAIL = CONTACT_CONFIG.supportEmail;
export const ORGANIZATION_NAME = CONTACT_CONFIG.organizationName;
