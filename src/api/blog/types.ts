
import { SupabaseClient } from "@supabase/supabase-js";

// Type definitions for blog posts
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category_id: string | null;
  status: string;
  featured_image_url: string | null;
  created_at: string;
  updated_at: string;
  category_name?: string;
}

// Type definitions for blog categories
export interface BlogCategory {
  id: string;
  name: string;
  created_at: string;
}

// Database response type to help with mapping
export interface DatabaseBlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  category_id: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
  blog_categories?: {
    name: string;
  };
}
