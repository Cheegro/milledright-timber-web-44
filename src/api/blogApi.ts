
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  category_id: string;
  published_at: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  created_at: string;
}

// Fetch all published blog posts
export async function fetchBlogPosts() {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        blog_categories(name)
      `)
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Error fetching blog posts:", error);
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive",
      });
      return [];
    }

    return data.map(post => ({
      ...post,
      category: post.blog_categories?.name || "Uncategorized"
    }));
  } catch (error) {
    console.error("Exception fetching blog posts:", error);
    toast({
      title: "Error",
      description: "Failed to load blog posts",
      variant: "destructive",
    });
    return [];
  }
}

// Fetch a single blog post by ID
export async function fetchBlogPost(id: string) {
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
      toast({
        title: "Error",
        description: "Failed to load blog post",
        variant: "destructive",
      });
      return null;
    }

    return {
      ...data,
      category: data.blog_categories?.name || "Uncategorized"
    };
  } catch (error) {
    console.error("Exception fetching blog post:", error);
    toast({
      title: "Error",
      description: "Failed to load blog post",
      variant: "destructive",
    });
    return null;
  }
}

// Fetch all blog categories
export async function fetchBlogCategories() {
  try {
    const { data, error } = await supabase
      .from("blog_categories")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching blog categories:", error);
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      });
      return [];
    }

    return data.map(category => ({
      ...category,
      count: 0 // We'll update this in a separate query
    }));
  } catch (error) {
    console.error("Exception fetching blog categories:", error);
    toast({
      title: "Error",
      description: "Failed to load categories",
      variant: "destructive",
    });
    return [];
  }
}

// Fetch category post counts
export async function fetchCategoryPostCounts() {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("category_id, blog_categories(id, name)")
      .eq("is_published", true);

    if (error) {
      console.error("Error fetching category counts:", error);
      return {};
    }

    const counts: Record<string, number> = {};
    data.forEach(post => {
      if (post.category_id) {
        counts[post.category_id] = (counts[post.category_id] || 0) + 1;
      }
    });

    return counts;
  } catch (error) {
    console.error("Exception fetching category counts:", error);
    return {};
  }
}

// Fetch recent posts
export async function fetchRecentBlogPosts(limit = 3) {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        id,
        title,
        excerpt,
        image_url,
        published_at
      `)
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching recent blog posts:", error);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Exception fetching recent blog posts:", error);
    return [];
  }
}

// Fetch related blog posts
export async function fetchRelatedBlogPosts(currentPostId: string, categoryId: string, limit = 2) {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        id,
        title,
        excerpt,
        image_url,
        published_at
      `)
      .eq("category_id", categoryId)
      .eq("is_published", true)
      .neq("id", currentPostId)
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching related blog posts:", error);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Exception fetching related blog posts:", error);
    return [];
  }
}
