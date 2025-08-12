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
      affiliate_clicks: {
        Row: {
          affiliate_code: string
          created_at: string
          id: string
          ip_address: string | null
          module_bundle: string | null
          user_agent: string | null
        }
        Insert: {
          affiliate_code: string
          created_at?: string
          id?: string
          ip_address?: string | null
          module_bundle?: string | null
          user_agent?: string | null
        }
        Update: {
          affiliate_code?: string
          created_at?: string
          id?: string
          ip_address?: string | null
          module_bundle?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      affiliate_commissions: {
        Row: {
          affiliate_code: string
          commission_amount: number
          commission_rate: number
          created_at: string
          id: string
          order_id: string | null
          paid_at: string | null
          status: string
        }
        Insert: {
          affiliate_code: string
          commission_amount: number
          commission_rate: number
          created_at?: string
          id?: string
          order_id?: string | null
          paid_at?: string | null
          status?: string
        }
        Update: {
          affiliate_code?: string
          commission_amount?: number
          commission_rate?: number
          created_at?: string
          id?: string
          order_id?: string | null
          paid_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_commissions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliates: {
        Row: {
          affiliate_code: string
          created_at: string
          email: string
          experience: string | null
          id: string
          name: string
          social_media: string | null
          status: string
          updated_at: string
          website: string | null
        }
        Insert: {
          affiliate_code: string
          created_at?: string
          email: string
          experience?: string | null
          id?: string
          name: string
          social_media?: string | null
          status?: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          affiliate_code?: string
          created_at?: string
          email?: string
          experience?: string | null
          id?: string
          name?: string
          social_media?: string | null
          status?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      credit_transactions: {
        Row: {
          amount: number
          created_at: string
          email: string
          id: string
          metadata: Json | null
          order_id: string | null
          reason: string
          stripe_session_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          order_id?: string | null
          reason: string
          stripe_session_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          order_id?: string | null
          reason?: string
          stripe_session_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
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
      orders: {
        Row: {
          amount: number | null
          bundle: string
          coupon_code: string | null
          created_at: string
          currency: string | null
          email: string
          id: string
          status: string | null
          stripe_session_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          bundle: string
          coupon_code?: string | null
          created_at?: string
          currency?: string | null
          email: string
          id?: string
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          bundle?: string
          coupon_code?: string | null
          created_at?: string
          currency?: string | null
          email?: string
          id?: string
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      otp_codes: {
        Row: {
          code: string
          created_at: string
          email: string
          expires_at: string
          id: string
          module_id: string | null
          used_at: string | null
        }
        Insert: {
          code: string
          created_at?: string
          email: string
          expires_at?: string
          id?: string
          module_id?: string | null
          used_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          module_id?: string | null
          used_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "otp_codes_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          album_title: string | null
          created_at: string
          id: string
          rating: number
          review_text: string
          reviewer_email: string | null
          reviewer_name: string | null
          status: string
          updated_at: string
        }
        Insert: {
          album_title?: string | null
          created_at?: string
          id?: string
          rating: number
          review_text: string
          reviewer_email?: string | null
          reviewer_name?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          album_title?: string | null
          created_at?: string
          id?: string
          rating?: number
          review_text?: string
          reviewer_email?: string | null
          reviewer_name?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      shop_custom_ai_art_requests: {
        Row: {
          budget: string | null
          created_at: string
          description: string
          email: string
          id: string
          name: string
          reference_url: string | null
          status: string
          style: string | null
          updated_at: string
        }
        Insert: {
          budget?: string | null
          created_at?: string
          description: string
          email: string
          id?: string
          name: string
          reference_url?: string | null
          status?: string
          style?: string | null
          updated_at?: string
        }
        Update: {
          budget?: string | null
          created_at?: string
          description?: string
          email?: string
          id?: string
          name?: string
          reference_url?: string | null
          status?: string
          style?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      shop_digital_assets: {
        Row: {
          created_at: string
          display_name: string | null
          file_path: string
          file_type: string | null
          id: string
          product_id: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          file_path: string
          file_type?: string | null
          id?: string
          product_id: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          display_name?: string | null
          file_path?: string
          file_type?: string | null
          id?: string
          product_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "shop_digital_assets_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "shop_digital_products"
            referencedColumns: ["id"]
          },
        ]
      }
      shop_digital_products: {
        Row: {
          cover_image_path: string | null
          created_at: string
          currency: string
          description: string | null
          id: string
          is_active: boolean
          price_cents: number
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          cover_image_path?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          is_active?: boolean
          price_cents?: number
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          cover_image_path?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          is_active?: boolean
          price_cents?: number
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      shop_newsletter_signups: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          source: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name?: string | null
          source?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          source?: string
        }
        Relationships: []
      }
      shop_signed_art_pieces: {
        Row: {
          active: boolean
          art_image_path: string
          autograph_image_path: string
          created_at: string
          description: string | null
          id: string
          number: number
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          art_image_path: string
          autograph_image_path: string
          created_at?: string
          description?: string | null
          id?: string
          number: number
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          art_image_path?: string
          autograph_image_path?: string
          created_at?: string
          description?: string | null
          id?: string
          number?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      shop_signed_artwork_requests: {
        Row: {
          created_at: string
          details: string
          email: string
          id: string
          name: string
          piece_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          details: string
          email: string
          id?: string
          name: string
          piece_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          details?: string
          email?: string
          id?: string
          name?: string
          piece_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "shop_signed_artwork_requests_piece_id_fkey"
            columns: ["piece_id"]
            isOneToOne: false
            referencedRelation: "shop_signed_art_pieces"
            referencedColumns: ["id"]
          },
        ]
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
      tool_submissions: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          preview_url: string | null
          summary: string | null
          tool: string
          user_email: string | null
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          preview_url?: string | null
          summary?: string | null
          tool: string
          user_email?: string | null
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          preview_url?: string | null
          summary?: string | null
          tool?: string
          user_email?: string | null
        }
        Relationships: []
      }
      tool_usage: {
        Row: {
          id: string
          metadata: Json | null
          subscription_id: string
          tool_name: string
          usage_count: number
          usage_date: string
          user_id: string
        }
        Insert: {
          id?: string
          metadata?: Json | null
          subscription_id: string
          tool_name: string
          usage_count?: number
          usage_date?: string
          user_id: string
        }
        Update: {
          id?: string
          metadata?: Json | null
          subscription_id?: string
          tool_name?: string
          usage_count?: number
          usage_date?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tool_usage_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
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
      user_access: {
        Row: {
          access_type: string
          created_at: string
          email: string
          expires_at: string | null
          granted_at: string
          id: string
          module_id: string | null
          order_id: string | null
        }
        Insert: {
          access_type: string
          created_at?: string
          email: string
          expires_at?: string | null
          granted_at?: string
          id?: string
          module_id?: string | null
          order_id?: string | null
        }
        Update: {
          access_type?: string
          created_at?: string
          email?: string
          expires_at?: string | null
          granted_at?: string
          id?: string
          module_id?: string | null
          order_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_access_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_access_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      user_credits: {
        Row: {
          balance: number
          created_at: string
          email: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          email: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          email?: string
          id?: string
          updated_at?: string
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
      has_active_tool_subscription: {
        Args: { p_user_id: string; p_tool_name: string }
        Returns: boolean
      }
      is_trial_active: {
        Args: { user_email: string }
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
      start_trial: {
        Args: { user_email: string }
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
      [_ in never]: never
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
    Enums: {},
  },
} as const
