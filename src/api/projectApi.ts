
import { supabase } from "@/integrations/supabase/client";

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

// Fetch all projects for the public site
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

// Fetch a single project by ID
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
