
import { supabase } from "@/integrations/supabase/client";

export interface LogStock {
  log_id: number;
  species_id: number;
  date_acquired: string;
  source_location_text?: string;
  source_location_gis_latitude?: number;
  source_location_gis_longitude?: number;
  diameter_at_base_inches?: number;
  length_feet?: number;
  estimated_yield_board_feet?: number;
  moisture_content_initial?: number;
  date_milled_into_slabs?: string;
  storage_location_in_yard?: string;
  story_of_origin?: string;
  acquisition_cost?: number;
  supplier_notes?: string;
  created_at: string;
  updated_at: string;
  wood_species?: {
    common_name: string;
    scientific_name?: string;
  };
}

export interface CreateLogStockData {
  species_id: number;
  date_acquired: string;
  source_location_text?: string;
  source_location_gis_latitude?: number;
  source_location_gis_longitude?: number;
  diameter_at_base_inches?: number;
  length_feet?: number;
  estimated_yield_board_feet?: number;
  moisture_content_initial?: number;
  date_milled_into_slabs?: string;
  storage_location_in_yard?: string;
  story_of_origin?: string;
  acquisition_cost?: number;
  supplier_notes?: string;
}

// Fetch all log stock with wood species information
export async function fetchLogStock(): Promise<LogStock[]> {
  try {
    const { data, error } = await supabase
      .from("log_stock")
      .select(`
        *,
        wood_species(common_name, scientific_name)
      `)
      .order("date_acquired", { ascending: false });

    if (error) {
      console.error("Error fetching log stock:", error);
      throw new Error(error.message);
    }

    return data || [];
  } catch (error) {
    console.error("Exception fetching log stock:", error);
    throw error;
  }
}

// Fetch a single log stock item by ID
export async function fetchLogStockById(id: number): Promise<LogStock | null> {
  try {
    const { data, error } = await supabase
      .from("log_stock")
      .select(`
        *,
        wood_species(common_name, scientific_name)
      `)
      .eq("log_id", id)
      .single();

    if (error) {
      console.error("Error fetching log stock:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Exception fetching log stock:", error);
    throw error;
  }
}

// Create a new log stock entry
export async function createLogStock(logData: CreateLogStockData): Promise<LogStock> {
  try {
    const { data, error } = await supabase
      .from("log_stock")
      .insert([logData])
      .select(`
        *,
        wood_species(common_name, scientific_name)
      `)
      .single();

    if (error) {
      console.error("Error creating log stock:", error);
      throw new Error(`Failed to create log stock: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Exception creating log stock:", error);
    throw error;
  }
}

// Update an existing log stock entry
export async function updateLogStock(
  id: number,
  logData: Partial<CreateLogStockData>
): Promise<LogStock> {
  try {
    const { data, error } = await supabase
      .from("log_stock")
      .update(logData)
      .eq("log_id", id)
      .select(`
        *,
        wood_species(common_name, scientific_name)
      `)
      .single();

    if (error) {
      console.error("Error updating log stock:", error);
      throw new Error(`Failed to update log stock: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Exception updating log stock:", error);
    throw error;
  }
}

// Delete a log stock entry
export async function deleteLogStock(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("log_stock")
      .delete()
      .eq("log_id", id);

    if (error) {
      console.error("Error deleting log stock:", error);
      throw new Error(`Failed to delete log stock: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error("Exception deleting log stock:", error);
    throw error;
  }
}
