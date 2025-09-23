export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_usage_analytics: {
        Row: {
          created_at: string
          endpoint_name: string
          error_count: number | null
          id: string
          ip_address: unknown | null
          request_count: number | null
          response_time_ms: number | null
          updated_at: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          endpoint_name: string
          error_count?: number | null
          id?: string
          ip_address?: unknown | null
          request_count?: number | null
          response_time_ms?: number | null
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          endpoint_name?: string
          error_count?: number | null
          id?: string
          ip_address?: unknown | null
          request_count?: number | null
          response_time_ms?: number | null
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      anonymous_sessions: {
        Row: {
          ai_usage_count: number | null
          ai_usage_start_time: string | null
          conversation_history: Json | null
          created_at: string | null
          expires_at: string | null
          id: string
          session_token: string
          trial_expired: boolean | null
          updated_at: string | null
        }
        Insert: {
          ai_usage_count?: number | null
          ai_usage_start_time?: string | null
          conversation_history?: Json | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          session_token: string
          trial_expired?: boolean | null
          updated_at?: string | null
        }
        Update: {
          ai_usage_count?: number | null
          ai_usage_start_time?: string | null
          conversation_history?: Json | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          session_token?: string
          trial_expired?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          record_id: string | null
          sensitive_data_accessed: boolean | null
          table_name: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          record_id?: string | null
          sensitive_data_accessed?: boolean | null
          table_name: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          record_id?: string | null
          sensitive_data_accessed?: boolean | null
          table_name?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      booking_requests: {
        Row: {
          booking_date: string
          booking_time: string
          created_at: string
          email: string
          id: string
          ip_address: unknown | null
          message: string | null
          name: string
          phone: string | null
          status: string
          updated_at: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          booking_date: string
          booking_time: string
          created_at?: string
          email: string
          id?: string
          ip_address?: unknown | null
          message?: string | null
          name: string
          phone?: string | null
          status?: string
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          booking_date?: string
          booking_time?: string
          created_at?: string
          email?: string
          id?: string
          ip_address?: unknown | null
          message?: string | null
          name?: string
          phone?: string | null
          status?: string
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      contact_access_justifications: {
        Row: {
          access_purpose: string
          admin_user_id: string
          approved_at: string | null
          approved_by: string | null
          business_justification: string
          created_at: string
          expires_at: string
          id: string
          organization_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          access_purpose: string
          admin_user_id: string
          approved_at?: string | null
          approved_by?: string | null
          business_justification: string
          created_at?: string
          expires_at?: string
          id?: string
          organization_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          access_purpose?: string
          admin_user_id?: string
          approved_at?: string | null
          approved_by?: string | null
          business_justification?: string
          created_at?: string
          expires_at?: string
          id?: string
          organization_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_access_justifications_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_access_permissions: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          business_justification: string | null
          created_at: string
          expires_at: string | null
          id: string
          organization_id: string
          request_reason: string
          requester_id: string
          status: string
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          business_justification?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          organization_id: string
          request_reason: string
          requester_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          business_justification?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          organization_id?: string
          request_reason?: string
          requester_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_access_permissions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          form_type: string
          id: string
          ip_address: unknown | null
          message: string
          name: string
          status: string
          subject: string
          updated_at: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          form_type?: string
          id?: string
          ip_address?: unknown | null
          message: string
          name: string
          status?: string
          subject: string
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          form_type?: string
          id?: string
          ip_address?: unknown | null
          message?: string
          name?: string
          status?: string
          subject?: string
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      email_campaigns: {
        Row: {
          content: string
          created_at: string
          created_by: string | null
          failure_count: number | null
          id: string
          name: string
          recipient_count: number | null
          scheduled_at: string | null
          sent_at: string | null
          status: string
          subject: string
          success_count: number | null
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by?: string | null
          failure_count?: number | null
          id?: string
          name: string
          recipient_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string
          subject: string
          success_count?: number | null
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string | null
          failure_count?: number | null
          id?: string
          name?: string
          recipient_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string
          subject?: string
          success_count?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      learning_modules: {
        Row: {
          compliance_note: string | null
          created_at: string
          id: string
          link: string | null
          minutes: number | null
          order_index: number | null
          pathway_id: string | null
          slug: string
          summary: string | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          compliance_note?: string | null
          created_at?: string
          id?: string
          link?: string | null
          minutes?: number | null
          order_index?: number | null
          pathway_id?: string | null
          slug: string
          summary?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          compliance_note?: string | null
          created_at?: string
          id?: string
          link?: string | null
          minutes?: number | null
          order_index?: number | null
          pathway_id?: string | null
          slug?: string
          summary?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_modules_pathway_id_fkey"
            columns: ["pathway_id"]
            isOneToOne: false
            referencedRelation: "learning_pathways"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_pathways: {
        Row: {
          category: string
          created_at: string
          description: string | null
          educational_only: boolean
          free: boolean
          id: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          educational_only?: boolean
          free?: boolean
          id?: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          educational_only?: boolean
          free?: boolean
          id?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      members: {
        Row: {
          created_at: string | null
          id: number
          role: string | null
          team_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: never
          role?: string | null
          team_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: never
          role?: string | null
          team_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          created_at: string
          email: string
          id: string
          ip_address: unknown | null
          name: string | null
          status: string
          subscribed_at: string
          subscription_source: string | null
          tags: string[] | null
          unsubscribed_at: string | null
          updated_at: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          ip_address?: unknown | null
          name?: string | null
          status?: string
          subscribed_at?: string
          subscription_source?: string | null
          tags?: string[] | null
          unsubscribed_at?: string | null
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          ip_address?: unknown | null
          name?: string | null
          status?: string
          subscribed_at?: string
          subscription_source?: string | null
          tags?: string[] | null
          unsubscribed_at?: string | null
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      organizations: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          description: string | null
          email: string | null
          id: string
          name: string
          owner_id: string | null
          phone: string | null
          state_code: string | null
          updated_at: string
          verified: boolean
          website: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          name: string
          owner_id?: string | null
          phone?: string | null
          state_code?: string | null
          updated_at?: string
          verified?: boolean
          website?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          name?: string
          owner_id?: string | null
          phone?: string | null
          state_code?: string | null
          updated_at?: string
          verified?: boolean
          website?: string | null
        }
        Relationships: []
      }
      partner_referrals: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          contact_info: string
          created_at: string
          id: string
          name: string
          notes: string | null
          status: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          contact_info: string
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          contact_info?: string
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      partner_verifications: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          organization_id: string | null
          status: string
          updated_at: string
          user_id: string
          verification_type: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          organization_id?: string | null
          status?: string
          updated_at?: string
          user_id: string
          verification_type?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          organization_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string
          verification_type?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      partnership_requests: {
        Row: {
          contact_email: string
          created_at: string
          description: string
          id: string
          organization_name: string
          status: string
          team_id: string | null
          updated_at: string
        }
        Insert: {
          contact_email: string
          created_at?: string
          description: string
          id?: string
          organization_name: string
          status?: string
          team_id?: string | null
          updated_at?: string
        }
        Update: {
          contact_email?: string
          created_at?: string
          description?: string
          id?: string
          organization_name?: string
          status?: string
          team_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          status: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          status?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      resources: {
        Row: {
          address: string | null
          city: string
          county: string
          created_at: string
          description: string | null
          id: string
          justice_friendly: boolean
          name: string
          organization: string
          phone: string | null
          rating: number | null
          state_code: string
          type: string
          updated_at: string
          verified: string
          website: string | null
        }
        Insert: {
          address?: string | null
          city: string
          county: string
          created_at?: string
          description?: string | null
          id?: string
          justice_friendly?: boolean
          name: string
          organization: string
          phone?: string | null
          rating?: number | null
          state_code: string
          type: string
          updated_at?: string
          verified?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          city?: string
          county?: string
          created_at?: string
          description?: string | null
          id?: string
          justice_friendly?: boolean
          name?: string
          organization?: string
          phone?: string | null
          rating?: number | null
          state_code?: string
          type?: string
          updated_at?: string
          verified?: string
          website?: string | null
        }
        Relationships: []
      }
      security_alerts: {
        Row: {
          alert_type: string
          created_at: string
          description: string | null
          id: string
          ip_address: unknown | null
          metadata: Json | null
          resolved: boolean | null
          resolved_at: string | null
          resolved_by: string | null
          severity: string
          title: string
          user_id: string | null
        }
        Insert: {
          alert_type: string
          created_at?: string
          description?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity: string
          title: string
          user_id?: string | null
        }
        Update: {
          alert_type?: string
          created_at?: string
          description?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      states: {
        Row: {
          active: boolean
          code: string
          coming_soon: boolean
          created_at: string
          id: string
          name: string
        }
        Insert: {
          active?: boolean
          code: string
          coming_soon?: boolean
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          active?: boolean
          code?: string
          coming_soon?: boolean
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      support_requests: {
        Row: {
          additional_data: Json | null
          created_at: string
          email: string
          id: string
          ip_address: unknown | null
          message: string
          name: string
          organization: string | null
          phone: string | null
          request_type: string
          status: string
          subject: string
          updated_at: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          additional_data?: Json | null
          created_at?: string
          email: string
          id?: string
          ip_address?: unknown | null
          message: string
          name: string
          organization?: string | null
          phone?: string | null
          request_type: string
          status?: string
          subject: string
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          additional_data?: Json | null
          created_at?: string
          email?: string
          id?: string
          ip_address?: unknown | null
          message?: string
          name?: string
          organization?: string | null
          phone?: string | null
          request_type?: string
          status?: string
          subject?: string
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      system_metrics: {
        Row: {
          id: string
          metadata: Json | null
          metric_name: string
          metric_type: string
          metric_value: number
          recorded_at: string
        }
        Insert: {
          id?: string
          metadata?: Json | null
          metric_name: string
          metric_type: string
          metric_value: number
          recorded_at?: string
        }
        Update: {
          id?: string
          metadata?: Json | null
          metric_name?: string
          metric_type?: string
          metric_value?: number
          recorded_at?: string
        }
        Relationships: []
      }
      user_learning_progress: {
        Row: {
          completed: boolean
          completed_at: string | null
          created_at: string
          id: string
          module_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          module_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          module_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_learning_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "learning_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      website_analytics: {
        Row: {
          action_type: string
          additional_data: Json | null
          created_at: string
          id: string
          ip_address: unknown | null
          page_path: string
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action_type?: string
          additional_data?: Json | null
          created_at?: string
          id?: string
          ip_address?: unknown | null
          page_path: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          additional_data?: Json | null
          created_at?: string
          id?: string
          ip_address?: unknown | null
          page_path?: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_reveal_full_contact: {
        Args: { org_id: string }
        Returns: {
          address: string
          email: string
          phone: string
        }[]
      }
      approve_admin_contact_access: {
        Args: {
          p_decision: string
          p_hours_valid?: number
          p_justification_id: string
        }
        Returns: undefined
      }
      can_view_org_contacts: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      check_admin_operation_limit: {
        Args: { operation_type?: string }
        Returns: boolean
      }
      check_admin_rate_limit: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      check_enhanced_rate_limit: {
        Args: {
          p_limit_per_hour?: number
          p_operation?: string
          p_user_id?: string
        }
        Returns: boolean
      }
      check_ip_rate_limit: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      check_rate_limit: {
        Args: {
          p_limit_per_hour?: number
          p_table_name?: string
          p_user_id?: string
        }
        Returns: boolean
      }
      cleanup_audit_logs: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_expired_contact_permissions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_expired_justifications: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_expired_permissions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_expired_referral_data: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_admin_user: {
        Args: { admin_email: string }
        Returns: undefined
      }
      create_first_admin_user: {
        Args: { admin_email: string }
        Returns: undefined
      }
      create_payment_secure: {
        Args: { p_amount: number; p_status?: string; p_user_id: string }
        Returns: string
      }
      create_security_alert: {
        Args: {
          p_alert_type: string
          p_description?: string
          p_metadata?: Json
          p_severity: string
          p_title: string
          p_user_id?: string
        }
        Returns: string
      }
      create_user_profile: {
        Args: { p_email: string; p_user_id: string }
        Returns: undefined
      }
      detect_advanced_suspicious_activity: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      detect_data_scraping: {
        Args: { table_name_param: string }
        Returns: undefined
      }
      detect_organization_access_abuse: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      detect_suspicious_activity: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      emergency_data_access_check: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      get_masked_contact_info: {
        Args: { contact_text: string; user_id?: string }
        Returns: string
      }
      get_masked_organization_contact: {
        Args: { org_id: string }
        Returns: {
          city: string
          id: string
          masked_email: string
          masked_phone: string
          name: string
          state_code: string
        }[]
      }
      get_organizations_public: {
        Args: Record<PropertyKey, never>
        Returns: {
          city: string
          created_at: string
          description: string
          id: string
          name: string
          state_code: string
          updated_at: string
          verified: boolean
          website: string
        }[]
      }
      get_organizations_public_safe: {
        Args: Record<PropertyKey, never>
        Returns: {
          city: string
          created_at: string
          description: string
          id: string
          name: string
          state_code: string
          updated_at: string
          verified: boolean
          website: string
        }[]
      }
      get_organizations_secure: {
        Args: Record<PropertyKey, never>
        Returns: {
          address: string
          city: string
          created_at: string
          description: string
          email: string
          id: string
          name: string
          phone: string
          state_code: string
          updated_at: string
          verified: boolean
          website: string
        }[]
      }
      get_organizations_with_contacts: {
        Args: Record<PropertyKey, never>
        Returns: {
          address: string
          city: string
          created_at: string
          description: string
          email: string
          id: string
          name: string
          phone: string
          state_code: string
          updated_at: string
          verified: boolean
          website: string
        }[]
      }
      get_organizations_with_contacts_secure: {
        Args: Record<PropertyKey, never>
        Returns: {
          address: string
          city: string
          created_at: string
          description: string
          email: string
          id: string
          name: string
          phone: string
          state_code: string
          updated_at: string
          verified: boolean
          website: string
        }[]
      }
      get_partner_stats: {
        Args: { partner_user_id?: string }
        Returns: Json
      }
      get_resources_public: {
        Args: Record<PropertyKey, never>
        Returns: {
          city: string
          county: string
          created_at: string
          description: string
          id: string
          justice_friendly: boolean
          name: string
          organization: string
          rating: number
          state_code: string
          type: string
          updated_at: string
          verified: string
          website: string
        }[]
      }
      get_resources_secure: {
        Args: Record<PropertyKey, never>
        Returns: {
          address: string
          city: string
          county: string
          created_at: string
          description: string
          id: string
          justice_friendly: boolean
          name: string
          organization: string
          phone: string
          rating: number
          state_code: string
          type: string
          updated_at: string
          verified: string
          website: string
        }[]
      }
      get_safe_organizations_public: {
        Args: Record<PropertyKey, never>
        Returns: {
          city: string
          created_at: string
          description: string
          id: string
          name: string
          state_code: string
          updated_at: string
          verified: boolean
          website: string
        }[]
      }
      get_security_metrics_summary: {
        Args: Record<PropertyKey, never>
        Returns: {
          ai_requests_24h: number
          avg_response_time_ms: number
          critical_alerts: number
          high_alerts: number
          total_alerts: number
          unique_users_24h: number
          unresolved_alerts: number
        }[]
      }
      get_states_with_protection: {
        Args: Record<PropertyKey, never>
        Returns: {
          active: boolean
          code: string
          coming_soon: boolean
          created_at: string
          id: string
          name: string
        }[]
      }
      get_verified_organizations: {
        Args: Record<PropertyKey, never>
        Returns: {
          city: string
          created_at: string
          description: string
          id: string
          name: string
          state_code: string
          updated_at: string
          verified: boolean
          website: string
        }[]
      }
      has_any_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      has_approved_admin_access: {
        Args: { p_admin_user_id: string; p_organization_id: string }
        Returns: boolean
      }
      has_contact_access_permission: {
        Args: { org_id: string; user_id: string }
        Returns: boolean
      }
      is_user_admin: {
        Args: { user_id?: string }
        Returns: boolean
      }
      is_verified_partner: {
        Args: { user_id?: string }
        Returns: boolean
      }
      log_ai_usage: {
        Args: {
          p_endpoint_name: string
          p_error_count?: number
          p_response_time_ms?: number
          p_user_id?: string
        }
        Returns: undefined
      }
      log_contact_access: {
        Args: { contact_type: string; org_id: string }
        Returns: undefined
      }
      log_payment_operation: {
        Args: {
          additional_data?: Json
          amount_cents?: number
          operation_type: string
          payment_id?: string
        }
        Returns: undefined
      }
      log_sensitive_access: {
        Args: {
          is_sensitive?: boolean
          operation: string
          record_id: string
          table_name: string
        }
        Returns: undefined
      }
      manage_contact_access_request: {
        Args: { expiry_days?: number; new_status: string; request_id: string }
        Returns: undefined
      }
      mask_contact_info: {
        Args: { contact_value: string }
        Returns: string
      }
      request_admin_contact_access: {
        Args: {
          p_access_purpose: string
          p_business_justification: string
          p_organization_id: string
        }
        Returns: string
      }
      request_contact_access: {
        Args: { justification?: string; org_id: string; reason: string }
        Returns: string
      }
      resolve_security_alert: {
        Args: { p_alert_id: string }
        Returns: undefined
      }
      reveal_organization_contact: {
        Args: { contact_type: string; org_id: string }
        Returns: string
      }
      secure_payment_access: {
        Args: Record<PropertyKey, never>
        Returns: {
          amount: number
          created_at: string | null
          id: string
          status: string | null
          user_id: string
        }[]
      }
      track_anonymous_ai_usage: {
        Args: {
          p_ai_endpoint: string
          p_conversation_data?: Json
          p_session_token: string
        }
        Returns: Json
      }
      transfer_anonymous_session_to_user: {
        Args: { p_session_token: string; p_user_id: string }
        Returns: Json
      }
      update_partnership_request: {
        Args: { _id: string; _notes?: string; _status?: string }
        Returns: {
          contact_email: string
          created_at: string
          description: string
          id: string
          organization_name: string
          status: string
          team_id: string | null
          updated_at: string
        }
      }
      update_payment_status_secure: {
        Args: { p_new_status: string; p_payment_id: string }
        Returns: undefined
      }
      validate_admin_access_pattern: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      validate_contact_access_permission: {
        Args: { org_id: string; user_id: string }
        Returns: boolean
      }
      validate_contact_input: {
        Args: { p_email?: string; p_name: string; p_phone?: string }
        Returns: boolean
      }
      validate_password_strength: {
        Args: { password: string }
        Returns: boolean
      }
      verify_admin_contact_access: {
        Args: { admin_user_id: string; operation_type: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
