
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export type GalleryCategory = {
  id: string;
  name: string;
  created_at: string;
};

export type GalleryImage = {
  id: string;
  title: string;
  description: string | null;
  category_id: string | null;
  image_url: string;
  thumbnail_url: string;
  created_at: string;
  updated_at: string;
};

export async function fetchCategories(): Promise<GalleryCategory[]> {
  const { data, error } = await supabase
    .from('gallery_categories')
    .select('*')
    .order('name');
  
  if (error) {
    toast({
      title: "Error fetching categories",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
  
  return data || [];
}

export async function fetchGalleryImages(): Promise<GalleryImage[]> {
  const { data, error } = await supabase
    .from('gallery_images')
    .select(`
      *,
      gallery_categories(name)
    `)
    .order('created_at', { ascending: false });
  
  if (error) {
    toast({
      title: "Error fetching gallery images",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
  
  return data || [];
}

export async function uploadGalleryImage(file: File, category_id: string | null, title: string, description: string | null): Promise<GalleryImage | null> {
  try {
    // Generate a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;
    
    // Upload the file to storage
    const { error: uploadError } = await supabase.storage
      .from('gallery-images')
      .upload(filePath, file);
    
    if (uploadError) {
      throw new Error(uploadError.message);
    }
    
    // Get the public URL
    const { data: { publicUrl: imageUrl } } = supabase.storage
      .from('gallery-images')
      .getPublicUrl(filePath);
    
    // We'll use the same image for thumbnail for simplicity
    // In a production app, you might want to create an actual thumbnail
    const thumbnailUrl = imageUrl;
    
    // Save the image data to the database
    const { data, error } = await supabase
      .from('gallery_images')
      .insert({
        title,
        description,
        category_id,
        image_url: imageUrl,
        thumbnail_url: thumbnailUrl,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (error) {
      throw new Error(error.message);
    }
    
    toast({
      title: "Image uploaded successfully",
      description: "Your gallery image has been uploaded.",
    });
    
    return data;
  } catch (error) {
    toast({
      title: "Error uploading image",
      description: error instanceof Error ? error.message : "An unknown error occurred",
      variant: "destructive",
    });
    
    return null;
  }
}

export async function deleteGalleryImage(id: string, imageUrl: string): Promise<boolean> {
  try {
    // Extract file path from the URL
    const urlParts = imageUrl.split('/');
    const filePath = urlParts[urlParts.length - 1];
    
    // Delete the image from storage
    const { error: storageError } = await supabase.storage
      .from('gallery-images')
      .remove([filePath]);
    
    if (storageError) {
      console.error("Error deleting file from storage:", storageError);
      // Continue anyway to try to delete the database entry
    }
    
    // Delete the database entry
    const { error } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw new Error(error.message);
    }
    
    toast({
      title: "Image deleted successfully",
      description: "The gallery image has been removed.",
    });
    
    return true;
  } catch (error) {
    toast({
      title: "Error deleting image",
      description: error instanceof Error ? error.message : "An unknown error occurred",
      variant: "destructive",
    });
    
    return false;
  }
}

export async function updateGalleryImage(
  id: string,
  updates: {
    title?: string;
    description?: string | null;
    category_id?: string | null;
  }
): Promise<GalleryImage | null> {
  try {
    const { data, error } = await supabase
      .from('gallery_images')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw new Error(error.message);
    }
    
    toast({
      title: "Image updated successfully",
      description: "The gallery image has been updated.",
    });
    
    return data;
  } catch (error) {
    toast({
      title: "Error updating image",
      description: error instanceof Error ? error.message : "An unknown error occurred",
      variant: "destructive",
    });
    
    return null;
  }
}
