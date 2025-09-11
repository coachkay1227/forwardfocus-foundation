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
          contact_info: string
          created_at: string
          id: string
          name: string
          notes: string | null
          status: string
          updated_at: string
        }
        Insert: {
          contact_info: string
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
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
      create_admin_user: {
        Args: { admin_email: string }
        Returns: undefined
      }
      create_user_profile: {
        Args: { p_email: string; p_user_id: string }
        Returns: undefined
      }
      detect_suspicious_activity: {
        Args: Record<PropertyKey, never>
        Returns: undefined
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
      is_user_admin: {
        Args: { user_id?: string }
        Returns: boolean
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
      mask_contact_info: {
        Args: { contact_data: string }
        Returns: string
      }
      reveal_organization_contact: {
        Args: { contact_type: string; org_id: string }
        Returns: string
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
      validate_admin_access_pattern: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      validate_contact_input: {
        Args: { p_email?: string; p_name: string; p_phone?: string }
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
