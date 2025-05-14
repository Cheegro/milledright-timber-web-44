
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

// Create a new blog post
export async function createBlogPost(postData: any) {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .insert(postData)
      .select()
      .single();

    if (error) {
      console.error("Error creating blog post:", error);
      toast({
        title: "Error",
        description: "Failed to create blog post",
        variant: "destructive",
      });
      return null;
    }

    toast({
      title: "Success",
      description: "Blog post created successfully",
    });
    return data;
  } catch (error) {
    console.error("Exception creating blog post:", error);
    toast({
      title: "Error",
      description: "Failed to create blog post",
      variant: "destructive",
    });
    return null;
  }
}

// Update an existing blog post
export async function updateBlogPost(id: string, postData: any) {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .update(postData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating blog post:", error);
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive",
      });
      return null;
    }

    toast({
      title: "Success",
      description: "Blog post updated successfully",
    });
    return data;
  } catch (error) {
    console.error("Exception updating blog post:", error);
    toast({
      title: "Error",
      description: "Failed to update blog post",
      variant: "destructive",
    });
    return null;
  }
}

// Delete a blog post
export async function deleteBlogPost(id: string) {
  try {
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting blog post:", error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
      return false;
    }

    toast({
      title: "Success",
      description: "Blog post deleted successfully",
    });
    return true;
  } catch (error) {
    console.error("Exception deleting blog post:", error);
    toast({
      title: "Error",
      description: "Failed to delete blog post",
      variant: "destructive",
    });
    return false;
  }
}

// Upload a blog post image
export async function uploadBlogImage(file: File) {
  try {
    // Create a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
      return null;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Exception uploading image:", error);
    toast({
      title: "Error",
      description: "Failed to upload image",
      variant: "destructive",
    });
    return null;
  }
}

// Fetch all blog posts for admin (including drafts)
export async function fetchAllBlogPosts() {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        blog_categories(name)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching all blog posts:", error);
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive",
      });
      return [];
    }

    return data.map(post => ({
      ...post,
      category: post.blog_categories?.name || "Uncategorized",
      status: post.is_published ? "Published" : "Draft"
    }));
  } catch (error) {
    console.error("Exception fetching all blog posts:", error);
    toast({
      title: "Error",
      description: "Failed to load blog posts",
      variant: "destructive",
    });
    return [];
  }
}
