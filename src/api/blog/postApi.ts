
import { supabase } from "@/integrations/supabase/client";
import { BlogPost, DatabaseBlogPost } from './types';
import { mapDbPostToBlogPost } from './utils';

// Fetch all blog posts
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        slug,
        blog_categories(name)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blog posts:", error);
      throw new Error(error.message);
    }

    return (data || []).map(post => mapDbPostToBlogPost(post as DatabaseBlogPost));
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
        slug,
        blog_categories(name)
      `)
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching blog post:", error);
      throw new Error(error.message);
    }

    if (!data) return null;
    
    return mapDbPostToBlogPost({
      id: data.id,
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      author: data.author,
      category_id: data.category_id,
      is_published: data.is_published,
      image_url: data.image_url,
      created_at: data.created_at,
      updated_at: data.updated_at,
      published_at: data.published_at,
      slug: data.slug || data.id,
      blog_categories: data.blog_categories
    });
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
        slug,
        blog_categories(name)
      `)
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Error fetching blog post by slug:", error);
      throw new Error(error.message);
    }

    if (!data) return null;
    
    return mapDbPostToBlogPost({
      id: data.id,
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      author: data.author,
      category_id: data.category_id,
      is_published: data.is_published,
      image_url: data.image_url,
      created_at: data.created_at,
      updated_at: data.updated_at,
      published_at: data.published_at,
      slug: data.slug || data.id,
      blog_categories: data.blog_categories
    });
  } catch (error) {
    console.error("Exception fetching blog post by slug:", error);
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
    const dbData = {
      title: postData.title,
      slug: postData.slug,
      content: postData.content,
      excerpt: postData.excerpt,
      author: postData.author_name,
      category_id: postData.category_id,
      is_published: postData.is_published,
      image_url: postData.featured_image_url
    };

    const { data, error } = await supabase
      .from("blog_posts")
      .insert([dbData])
      .select(`
        *,
        slug
      `)
      .single();

    if (error) {
      console.error("Error creating blog post:", error);
      throw new Error(`Failed to create blog post: ${error.message}`);
    }

    return mapDbPostToBlogPost({
      id: data.id,
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      author: data.author,
      category_id: data.category_id,
      is_published: data.is_published,
      image_url: data.image_url,
      created_at: data.created_at,
      updated_at: data.updated_at,
      published_at: data.published_at,
      slug: data.slug || data.id
    });
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
    const dbData: Record<string, any> = {};
    if (postData.title) dbData.title = postData.title;
    if (postData.slug) dbData.slug = postData.slug;
    if (postData.content) dbData.content = postData.content;
    if (postData.excerpt) dbData.excerpt = postData.excerpt;
    if (postData.author_name) dbData.author = postData.author_name;
    if (postData.category_id !== undefined) dbData.category_id = postData.category_id;
    if (postData.is_published !== undefined) dbData.is_published = postData.is_published;
    if (postData.featured_image_url !== undefined) dbData.image_url = postData.featured_image_url;

    const { data, error } = await supabase
      .from("blog_posts")
      .update(dbData)
      .eq("id", id)
      .select(`
        *,
        slug
      `)
      .single();

    if (error) {
      console.error("Error updating blog post:", error);
      throw new Error(`Failed to update blog post: ${error.message}`);
    }

    return mapDbPostToBlogPost({
      id: data.id,
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      author: data.author,
      category_id: data.category_id,
      is_published: data.is_published,
      image_url: data.image_url,
      created_at: data.created_at,
      updated_at: data.updated_at,
      published_at: data.published_at,
      slug: data.slug || data.id
    });
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
