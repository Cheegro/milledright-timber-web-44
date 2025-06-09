export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      analytics_events: {
        Row: {
          browser: string | null
          city: string | null
          country: string | null
          created_at: string
          device_type: string | null
          event_category: string | null
          event_name: string
          id: string
          ip_address: unknown | null
          is_mobile: boolean | null
          latitude: number | null
          longitude: number | null
          operating_system: string | null
          page_path: string | null
          parameters: Json | null
          region: string | null
          screen_resolution: string | null
          session_id: string | null
          timezone: string | null
          user_agent: string | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          event_category?: string | null
          event_name: string
          id?: string
          ip_address?: unknown | null
          is_mobile?: boolean | null
          latitude?: number | null
          longitude?: number | null
          operating_system?: string | null
          page_path?: string | null
          parameters?: Json | null
          region?: string | null
          screen_resolution?: string | null
          session_id?: string | null
          timezone?: string | null
          user_agent?: string | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          event_category?: string | null
          event_name?: string
          id?: string
          ip_address?: unknown | null
          is_mobile?: boolean | null
          latitude?: number | null
          longitude?: number | null
          operating_system?: string | null
          page_path?: string | null
          parameters?: Json | null
          region?: string | null
          screen_resolution?: string | null
          session_id?: string | null
          timezone?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      analytics_page_views: {
        Row: {
          browser: string | null
          city: string | null
          country: string | null
          created_at: string
          device_type: string | null
          id: string
          ip_address: unknown | null
          is_mobile: boolean | null
          latitude: number | null
          longitude: number | null
          operating_system: string | null
          page_path: string
          page_title: string | null
          referrer: string | null
          region: string | null
          screen_resolution: string | null
          session_id: string | null
          timezone: string | null
          user_agent: string | null
          view_duration: number | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          id?: string
          ip_address?: unknown | null
          is_mobile?: boolean | null
          latitude?: number | null
          longitude?: number | null
          operating_system?: string | null
          page_path: string
          page_title?: string | null
          referrer?: string | null
          region?: string | null
          screen_resolution?: string | null
          session_id?: string | null
          timezone?: string | null
          user_agent?: string | null
          view_duration?: number | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          id?: string
          ip_address?: unknown | null
          is_mobile?: boolean | null
          latitude?: number | null
          longitude?: number | null
          operating_system?: string | null
          page_path?: string
          page_title?: string | null
          referrer?: string | null
          region?: string | null
          screen_resolution?: string | null
          session_id?: string | null
          timezone?: string | null
          user_agent?: string | null
          view_duration?: number | null
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string
          category_id: string | null
          content: string
          created_at: string
          excerpt: string
          id: string
          image_url: string | null
          is_published: boolean | null
          optimized_featured_image_url: string | null
          optimized_featured_image_webp_url: string | null
          published_at: string | null
          slug: string
          thumbnail_featured_image_url: string | null
          thumbnail_featured_image_webp_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          category_id?: string | null
          content: string
          created_at?: string
          excerpt: string
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          optimized_featured_image_url?: string | null
          optimized_featured_image_webp_url?: string | null
          published_at?: string | null
          slug: string
          thumbnail_featured_image_url?: string | null
          thumbnail_featured_image_webp_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category_id?: string | null
          content?: string
          created_at?: string
          excerpt?: string
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          optimized_featured_image_url?: string | null
          optimized_featured_image_webp_url?: string | null
          published_at?: string | null
          slug?: string
          thumbnail_featured_image_url?: string | null
          thumbnail_featured_image_webp_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_entries: {
        Row: {
          attachments: Json | null
          author: string
          conversation_id: number
          entry_id: number
          entry_text: string
          entry_timestamp: string | null
        }
        Insert: {
          attachments?: Json | null
          author: string
          conversation_id: number
          entry_id?: number
          entry_text: string
          entry_timestamp?: string | null
        }
        Update: {
          attachments?: Json | null
          author?: string
          conversation_id?: number
          entry_id?: number
          entry_text?: string
          entry_timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversation_entries_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["conversation_id"]
          },
        ]
      }
      conversations: {
        Row: {
          conversation_id: number
          created_at: string | null
          customer_id: number
          dream_board_snapshot: Json | null
          estimated_budget_range: string | null
          estimated_completion_date: string | null
          next_follow_up_date: string | null
          status: string
          subject: string
          updated_at: string | null
        }
        Insert: {
          conversation_id?: number
          created_at?: string | null
          customer_id: number
          dream_board_snapshot?: Json | null
          estimated_budget_range?: string | null
          estimated_completion_date?: string | null
          next_follow_up_date?: string | null
          status?: string
          subject: string
          updated_at?: string | null
        }
        Update: {
          conversation_id?: number
          created_at?: string | null
          customer_id?: number
          dream_board_snapshot?: Json | null
          estimated_budget_range?: string | null
          estimated_completion_date?: string | null
          next_follow_up_date?: string | null
          status?: string
          subject?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["customer_id"]
          },
        ]
      }
      customer_journal: {
        Row: {
          customer_id: number
          entry_date: string | null
          entry_text: string
          entry_type: string | null
          journal_entry_id: number
          next_action_due_date: string | null
          next_action_item: string | null
        }
        Insert: {
          customer_id: number
          entry_date?: string | null
          entry_text: string
          entry_type?: string | null
          journal_entry_id?: number
          next_action_due_date?: string | null
          next_action_item?: string | null
        }
        Update: {
          customer_id?: number
          entry_date?: string | null
          entry_text?: string
          entry_type?: string | null
          journal_entry_id?: number
          next_action_due_date?: string | null
          next_action_item?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_journal_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["customer_id"]
          },
        ]
      }
      customers: {
        Row: {
          company_name: string | null
          created_at: string | null
          customer_id: number
          design_style_preferences: string | null
          email: string
          initial_contact_channel: string | null
          location_city_preference: string | null
          name: string
          phone: string | null
          preferred_wood_species_notes: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string | null
          customer_id?: number
          design_style_preferences?: string | null
          email: string
          initial_contact_channel?: string | null
          location_city_preference?: string | null
          name: string
          phone?: string | null
          preferred_wood_species_notes?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string | null
          customer_id?: number
          design_style_preferences?: string | null
          email?: string
          initial_contact_channel?: string | null
          location_city_preference?: string | null
          name?: string
          phone?: string | null
          preferred_wood_species_notes?: string | null
        }
        Relationships: []
      }
      gallery_categories: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          category_id: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string
          optimized_image_url: string | null
          optimized_image_webp_url: string | null
          thumbnail_url: string
          thumbnail_webp_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url: string
          optimized_image_url?: string | null
          optimized_image_webp_url?: string | null
          thumbnail_url: string
          thumbnail_webp_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
          optimized_image_url?: string | null
          optimized_image_webp_url?: string | null
          thumbnail_url?: string
          thumbnail_webp_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_images_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "gallery_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      log_stock: {
        Row: {
          acquisition_cost: number | null
          created_at: string | null
          date_acquired: string
          date_milled_into_slabs: string | null
          diameter_at_base_inches: number | null
          estimated_yield_board_feet: number | null
          length_feet: number | null
          log_id: number
          moisture_content_initial: number | null
          source_location_gis_latitude: number | null
          source_location_gis_longitude: number | null
          source_location_text: string | null
          species_id: number
          storage_location_in_yard: string | null
          story_of_origin: string | null
          supplier_notes: string | null
          updated_at: string | null
        }
        Insert: {
          acquisition_cost?: number | null
          created_at?: string | null
          date_acquired: string
          date_milled_into_slabs?: string | null
          diameter_at_base_inches?: number | null
          estimated_yield_board_feet?: number | null
          length_feet?: number | null
          log_id?: number
          moisture_content_initial?: number | null
          source_location_gis_latitude?: number | null
          source_location_gis_longitude?: number | null
          source_location_text?: string | null
          species_id: number
          storage_location_in_yard?: string | null
          story_of_origin?: string | null
          supplier_notes?: string | null
          updated_at?: string | null
        }
        Update: {
          acquisition_cost?: number | null
          created_at?: string | null
          date_acquired?: string
          date_milled_into_slabs?: string | null
          diameter_at_base_inches?: number | null
          estimated_yield_board_feet?: number | null
          length_feet?: number | null
          log_id?: number
          moisture_content_initial?: number | null
          source_location_gis_latitude?: number | null
          source_location_gis_longitude?: number | null
          source_location_text?: string | null
          species_id?: number
          storage_location_in_yard?: string | null
          story_of_origin?: string | null
          supplier_notes?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "log_stock_species_id_fkey"
            columns: ["species_id"]
            isOneToOne: false
            referencedRelation: "wood_species"
            referencedColumns: ["species_id"]
          },
        ]
      }
      newsletter_subscriptions: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
          name: string | null
          subscribed_at: string
          unsubscribe_token: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          name?: string | null
          subscribed_at?: string
          unsubscribe_token?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          name?: string | null
          subscribed_at?: string
          unsubscribe_token?: string | null
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          parent_category_id: string | null
          slug: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          parent_category_id?: string | null
          slug?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          parent_category_id?: string | null
          slug?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_categories_parent_category_id_fkey"
            columns: ["parent_category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          board_feet: number | null
          category_id: string | null
          created_at: string
          customization_options_text: string | null
          date_added: string | null
          date_modified: string | null
          description: string | null
          dimensions_inches: Json | null
          drying_method: string | null
          expert_notes: string | null
          id: string
          image_url: string | null
          images: Json | null
          is_active: boolean | null
          is_featured_on_homepage: boolean | null
          is_one_of_a_kind: boolean | null
          meta_seo_description: string | null
          meta_seo_title: string | null
          name: string
          optimized_image_url: string | null
          optimized_image_webp_url: string | null
          parent_log_id: number | null
          price: string
          price_display_text: string | null
          slug: string | null
          species_id: number | null
          surface_finish_options: string[] | null
          thumbnail_url: string | null
          thumbnail_webp_url: string | null
          updated_at: string
          weight_lbs: number | null
        }
        Insert: {
          board_feet?: number | null
          category_id?: string | null
          created_at?: string
          customization_options_text?: string | null
          date_added?: string | null
          date_modified?: string | null
          description?: string | null
          dimensions_inches?: Json | null
          drying_method?: string | null
          expert_notes?: string | null
          id?: string
          image_url?: string | null
          images?: Json | null
          is_active?: boolean | null
          is_featured_on_homepage?: boolean | null
          is_one_of_a_kind?: boolean | null
          meta_seo_description?: string | null
          meta_seo_title?: string | null
          name: string
          optimized_image_url?: string | null
          optimized_image_webp_url?: string | null
          parent_log_id?: number | null
          price: string
          price_display_text?: string | null
          slug?: string | null
          species_id?: number | null
          surface_finish_options?: string[] | null
          thumbnail_url?: string | null
          thumbnail_webp_url?: string | null
          updated_at?: string
          weight_lbs?: number | null
        }
        Update: {
          board_feet?: number | null
          category_id?: string | null
          created_at?: string
          customization_options_text?: string | null
          date_added?: string | null
          date_modified?: string | null
          description?: string | null
          dimensions_inches?: Json | null
          drying_method?: string | null
          expert_notes?: string | null
          id?: string
          image_url?: string | null
          images?: Json | null
          is_active?: boolean | null
          is_featured_on_homepage?: boolean | null
          is_one_of_a_kind?: boolean | null
          meta_seo_description?: string | null
          meta_seo_title?: string | null
          name?: string
          optimized_image_url?: string | null
          optimized_image_webp_url?: string | null
          parent_log_id?: number | null
          price?: string
          price_display_text?: string | null
          slug?: string | null
          species_id?: number | null
          surface_finish_options?: string[] | null
          thumbnail_url?: string | null
          thumbnail_webp_url?: string | null
          updated_at?: string
          weight_lbs?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_parent_log_id_fkey"
            columns: ["parent_log_id"]
            isOneToOne: false
            referencedRelation: "log_stock"
            referencedColumns: ["log_id"]
          },
          {
            foreignKeyName: "products_species_id_fkey"
            columns: ["species_id"]
            isOneToOne: false
            referencedRelation: "wood_species"
            referencedColumns: ["species_id"]
          },
        ]
      }
      projects: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          image_url: string
          optimized_image_url: string | null
          optimized_image_webp_url: string | null
          thumbnail_url: string | null
          thumbnail_webp_url: string | null
          title: string
          updated_at: string
          wood_type: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          image_url: string
          optimized_image_url?: string | null
          optimized_image_webp_url?: string | null
          thumbnail_url?: string | null
          thumbnail_webp_url?: string | null
          title: string
          updated_at?: string
          wood_type: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string
          optimized_image_url?: string | null
          optimized_image_webp_url?: string | null
          thumbnail_url?: string | null
          thumbnail_webp_url?: string | null
          title?: string
          updated_at?: string
          wood_type?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          author: string
          created_at: string
          date: string
          id: string
          location: string | null
          product_id: string | null
          rating: number
          status: string
          text: string
          updated_at: string
        }
        Insert: {
          author: string
          created_at?: string
          date?: string
          id?: string
          location?: string | null
          product_id?: string | null
          rating: number
          status?: string
          text: string
          updated_at?: string
        }
        Update: {
          author?: string
          created_at?: string
          date?: string
          id?: string
          location?: string | null
          product_id?: string | null
          rating?: number
          status?: string
          text?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          role_id: number
          role_name: string
        }
        Insert: {
          role_id?: number
          role_name: string
        }
        Update: {
          role_id?: number
          role_name?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          setting_key: string
          setting_type: string
          setting_value: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key: string
          setting_type?: string
          setting_value?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key?: string
          setting_type?: string
          setting_value?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      site_users: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          hashed_password: string
          is_active: boolean | null
          role_id: number | null
          user_id: number
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          hashed_password: string
          is_active?: boolean | null
          role_id?: number | null
          user_id?: number
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          hashed_password?: string
          is_active?: boolean | null
          role_id?: number | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "site_users_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["role_id"]
          },
        ]
      }
      testimonials: {
        Row: {
          author: string
          created_at: string
          date: string
          id: string
          location: string | null
          product_id: string | null
          rating: number
          status: string
          text: string
          updated_at: string
        }
        Insert: {
          author: string
          created_at?: string
          date?: string
          id?: string
          location?: string | null
          product_id?: string | null
          rating: number
          status?: string
          text: string
          updated_at?: string
        }
        Update: {
          author?: string
          created_at?: string
          date?: string
          id?: string
          location?: string | null
          product_id?: string | null
          rating?: number
          status?: string
          text?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      wood_species: {
        Row: {
          common_name: string
          created_at: string | null
          description: string | null
          hardness_janka: number | null
          image_representative_grain_url: string | null
          scientific_name: string | null
          species_id: number
          sustainability_notes: string | null
          typical_uses: string[] | null
          updated_at: string | null
          workability_notes: string | null
        }
        Insert: {
          common_name: string
          created_at?: string | null
          description?: string | null
          hardness_janka?: number | null
          image_representative_grain_url?: string | null
          scientific_name?: string | null
          species_id?: number
          sustainability_notes?: string | null
          typical_uses?: string[] | null
          updated_at?: string | null
          workability_notes?: string | null
        }
        Update: {
          common_name?: string
          created_at?: string | null
          description?: string | null
          hardness_janka?: number | null
          image_representative_grain_url?: string | null
          scientific_name?: string | null
          species_id?: number
          sustainability_notes?: string | null
          typical_uses?: string[] | null
          updated_at?: string | null
          workability_notes?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      analytics_overview: {
        Row: {
          desktop_views: number | null
          mobile_views: number | null
          top_browser: string | null
          top_country: string | null
          top_device: string | null
          total_page_views: number | null
          unique_visitors: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
