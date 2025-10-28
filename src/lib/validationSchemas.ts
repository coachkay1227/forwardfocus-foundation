import { z } from 'zod';

/**
 * Centralized Zod validation schemas for forms
 * Ensures consistent validation across the application
 */

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  subject: z.string().optional(),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

export const consultationFormSchema = z.object({
  organization_name: z.string()
    .min(2, 'Organization name is required'),
  contact_name: z.string()
    .min(2, 'Contact name is required'),
  email: z.string()
    .email('Please enter a valid email address'),
  phone: z.string().optional(),
  organization_type: z.string().optional(),
  current_services: z.string().optional(),
  ai_interest: z.array(z.string()).optional(),
  project_scope: z.string().optional(),
  timeline: z.string().optional(),
  budget_range: z.string().optional(),
  target_population: z.string().optional(),
  current_challenges: z.string().optional(),
  desired_outcomes: z.string().optional(),
  technical_capacity: z.string().optional(),
  partnership_type: z.string().optional(),
  additional_info: z.string().optional(),
});

export const authFormSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export const registrationFormSchema = authFormSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ConsultationFormData = z.infer<typeof consultationFormSchema>;
export type AuthFormData = z.infer<typeof authFormSchema>;
export type RegistrationFormData = z.infer<typeof registrationFormSchema>;
