
import { SupabaseClient } from "@supabase/supabase-js";

// Type definitions for blog posts
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author_name: string;
  category_id: string | null;
  is_published: boolean;
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
  content: string;
  excerpt: string;
  author: string;
  category_id: string | null;
  is_published: boolean;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  published_at?: string;
  slug?: string;
  blog_categories?: {
    name: string;
  };
}
