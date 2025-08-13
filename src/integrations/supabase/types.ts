export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      modules: {
        Row: {
          bundle: string
          created_at: string
          description: string
          display_order: number
          external_url: string | null
          features: string[]
          id: string
          image_url: string | null
          is_free: boolean | null
          is_popular: boolean | null
          price: number | null
          title: string
          updated_at: string
        }
        Insert: {
          bundle: string
          created_at?: string
          description: string
          display_order?: number
          external_url?: string | null
          features: string[]
          id?: string
          image_url?: string | null
          is_free?: boolean | null
          is_popular?: boolean | null
          price?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          bundle?: string
          created_at?: string
          description?: string
          display_order?: number
          external_url?: string | null
          features?: string[]
          id?: string
          image_url?: string | null
          is_free?: boolean | null
          is_popular?: boolean | null
          price?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      partner_referrals: {
        Row: {
          contact_info: string
          created_at: string
          id: string
          name: string
          notes: string
          status: string
          updated_at: string
        }
        Insert: {
          contact_info: string
          created_at?: string
          id?: string
          name: string
          notes: string
          status?: string
          updated_at?: string
        }
        Update: {
          contact_info?: string
          created_at?: string
          id?: string
          name?: string
          notes?: string
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
          updated_at: string
        }
        Insert: {
          contact_email: string
          created_at?: string
          description: string
          id?: string
          organization_name: string
          status?: string
          updated_at?: string
        }
        Update: {
          contact_email?: string
          created_at?: string
          description?: string
          id?: string
          organization_name?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      resources: {
        Row: {
          category: string | null
          contact_info: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          organization: string | null
          state_code: string | null
          title: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          category?: string | null
          contact_info?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          organization?: string | null
          state_code?: string | null
          title: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          category?: string | null
          contact_info?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          organization?: string | null
          state_code?: string | null
          title?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          plan_type: string
          price: number
          status: string
          subscription_end_date: string | null
          subscription_start_date: string | null
          tool_name: string
          trial_end_date: string | null
          trial_start_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          plan_type: string
          price?: number
          status?: string
          subscription_end_date?: string | null
          subscription_start_date?: string | null
          tool_name: string
          trial_end_date?: string | null
          trial_start_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          plan_type?: string
          price?: number
          status?: string
          subscription_end_date?: string | null
          subscription_start_date?: string | null
          tool_name?: string
          trial_end_date?: string | null
          trial_start_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      trials: {
        Row: {
          created_at: string
          email: string
          expires_at: string
          id: string
          started_at: string
        }
        Insert: {
          created_at?: string
          email: string
          expires_at?: string
          id?: string
          started_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          started_at?: string
        }
        Relationships: []
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
          role: Database["public"]["Enums"]["app_role"]
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
      generate_affiliate_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_email: {
        Args: { p_user_id: string }
        Returns: string
      }
      has_active_tool_subscription: {
        Args: { p_user_id: string; p_tool_name: string }
        Returns: boolean
      }
      has_active_tool_subscription_self: {
        Args: { p_tool_name: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      is_trial_active: {
        Args: { user_email: string }
        Returns: boolean
      }
      is_trial_active_self: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_user_admin: {
        Args: { p_user_id: string }
        Returns: boolean
      }
      start_tool_trial: {
        Args: { p_user_id: string; p_email: string; p_tool_name: string }
        Returns: string
      }
      start_tool_trial_self: {
        Args: { p_tool_name: string }
        Returns: string
      }
      start_trial: {
        Args: { user_email: string }
        Returns: boolean
      }
      start_trial_self: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      track_affiliate_click: {
        Args: {
          p_affiliate_code: string
          p_module_bundle?: string
          p_ip_address?: string
          p_user_agent?: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
