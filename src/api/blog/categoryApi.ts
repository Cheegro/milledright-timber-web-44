
import { supabase } from "@/integrations/supabase/client";
import { BlogCategory } from './types';

// Fetch all blog categories
export async function fetchBlogCategories(): Promise<BlogCategory[]> {
  try {
    const { data, error } = await supabase
      .from("blog_categories")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching blog categories:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Exception fetching blog categories:", error);
    throw error;
  }
}

// Create a new blog category
export async function createBlogCategory(name: string): Promise<BlogCategory> {
  try {
    const { data, error } = await supabase
      .from("blog_categories")
      .insert([{ name }])
      .select()
      .single();

    if (error) {
      console.error("Error creating blog category:", error);
      throw new Error(`Failed to create category: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Exception creating blog category:", error);
    throw error;
  }
}

// Delete a blog category
export async function deleteBlogCategory(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("blog_categories")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting blog category:", error);
      throw new Error(`Failed to delete category: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error("Exception deleting blog category:", error);
    throw error;
  }
}
