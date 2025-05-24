
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

// Type definitions
export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  wood_type: string;
  category: string;
  created_at: string;
  updated_at: string;
}

// Fetch all projects
export async function fetchProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
      throw new Error(error.message);
    }

    return data || [];
  } catch (error) {
    console.error("Exception fetching projects:", error);
    throw error;
  }
}

// Fetch a single project
export async function fetchProject(id: string): Promise<Project> {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching project:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Exception fetching project:", error);
    throw error;
  }
}

// Create a new project
export async function createProject(project: {
  title: string;
  description: string;
  image_url: string;
  wood_type: string;
  category: string;
}): Promise<Project> {
  try {
    const { data, error } = await supabase
      .from("projects")
      .insert([project])
      .select()
      .single();

    if (error) {
      console.error("Error creating project:", error);
      throw new Error(`Failed to create project: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Exception creating project:", error);
    throw error;
  }
}

// Update a project
export async function updateProject(
  id: string,
  project: {
    title?: string;
    description?: string;
    image_url?: string;
    wood_type?: string;
    category?: string;
  }
): Promise<Project> {
  try {
    const { data, error } = await supabase
      .from("projects")
      .update(project)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating project:", error);
      throw new Error(`Failed to update project: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Exception updating project:", error);
    throw error;
  }
}

// Delete a project
export async function deleteProject(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting project:", error);
      throw new Error(`Failed to delete project: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error("Exception deleting project:", error);
    throw error;
  }
}

// Upload a project image
export async function uploadProjectImage(file: File): Promise<string | null> {
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
    
    console.log(`Uploading project image: ${uniqueFileName} (original type: ${file.type})`);
    
    // For HEIC/HEIF files, force the content type to image/jpeg
    let contentType = file.type;
    if (fileExt === 'heic' || fileExt === 'heif' || fileName.endsWith('.heic') || fileName.endsWith('.heif')) {
      console.log('HEIC/HEIF file detected, setting content-type to image/jpeg');
      contentType = 'image/jpeg';
    }
    
    // Upload the file to the bucket
    const { data, error } = await supabase.storage
      .from('project-images')
      .upload(uniqueFileName, file, {
        contentType: contentType,
        upsert: false,
        cacheControl: '3600'
      });

    if (error) {
      console.error("Error uploading project image:", error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('project-images')
      .getPublicUrl(uniqueFileName);

    console.log("Project image uploaded successfully:", publicUrlData.publicUrl);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Exception uploading project image:", error);
    throw error;
  }
}
