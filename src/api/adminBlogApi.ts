
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

// Type definitions
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
}

export interface BlogCategory {
  id: string;
  name: string;
  created_at: string;
}

// Fetch all blog posts
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        blog_categories(name)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blog posts:", error);
      throw new Error(error.message);
    }

    return data.map(post => ({
      ...post,
      category_name: post.blog_categories?.name || null
    }));
  } catch (error) {
    console.error("Exception fetching blog posts:", error);
    throw error;
  }
}

// Fetch a single blog post
export async function fetchBlogPost(id: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        blog_categories(name)
      `)
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching blog post:", error);
      throw new Error(error.message);
    }

    return {
      ...data,
      category_name: data.blog_categories?.name || null
    };
  } catch (error) {
    console.error("Exception fetching blog post:", error);
    throw error;
  }
}

// Fetch a blog post by slug
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        blog_categories(name)
      `)
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Error fetching blog post by slug:", error);
      throw new Error(error.message);
    }

    return {
      ...data,
      category_name: data.blog_categories?.name || null
    };
  } catch (error) {
    console.error("Exception fetching blog post by slug:", error);
    throw error;
  }
}

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

// Create a new blog post
export async function createBlogPost(postData: {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author_name: string;
  category_id?: string | null;
  is_published: boolean;
  featured_image_url?: string | null;
}): Promise<BlogPost> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .insert([postData])
      .select()
      .single();

    if (error) {
      console.error("Error creating blog post:", error);
      throw new Error(`Failed to create blog post: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Exception creating blog post:", error);
    throw error;
  }
}

// Update an existing blog post
export async function updateBlogPost(
  id: string,
  postData: {
    title?: string;
    slug?: string;
    content?: string;
    excerpt?: string;
    author_name?: string;
    category_id?: string | null;
    is_published?: boolean;
    featured_image_url?: string | null;
  }
): Promise<BlogPost> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .update(postData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating blog post:", error);
      throw new Error(`Failed to update blog post: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Exception updating blog post:", error);
    throw error;
  }
}

// Delete a blog post
export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting blog post:", error);
      throw new Error(`Failed to delete blog post: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error("Exception deleting blog post:", error);
    throw error;
  }
}

// Upload a blog featured image
export async function uploadBlogImage(file: File): Promise<string | null> {
  try {
    // Check file size before uploading
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error(`File size exceeds limit of 5MB. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
    }
    
    // Create a unique file name
    const fileName = file.name.toLowerCase();
    const fileExt = fileName.split('.').pop() || 'jpg';
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    
    console.log(`Uploading blog image: ${uniqueFileName} (original type: ${file.type})`);
    
    // For HEIC/HEIF files, force the content type to image/jpeg
    let contentType = file.type;
    if (fileExt === 'heic' || fileExt === 'heif' || fileName.endsWith('.heic') || fileName.endsWith('.heif')) {
      console.log('HEIC/HEIF file detected, setting content-type to image/jpeg');
      contentType = 'image/jpeg';
    }
    
    // Upload the file to the bucket
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(uniqueFileName, file, {
        contentType: contentType,
        upsert: false,
        cacheControl: '3600'
      });

    if (error) {
      console.error("Error uploading blog image:", error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(uniqueFileName);

    console.log("Blog image uploaded successfully:", publicUrlData.publicUrl);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Exception uploading blog image:", error);
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
