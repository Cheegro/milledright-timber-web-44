
import { supabase } from "@/integrations/supabase/client";

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
