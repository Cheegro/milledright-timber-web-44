
import { supabase } from "@/integrations/supabase/client";

export interface WoodSpecies {
  species_id: number;
  common_name: string;
  scientific_name?: string;
  description?: string;
  hardness_janka?: number;
  typical_uses?: string[];
  workability_notes?: string;
  image_representative_grain_url?: string;
  sustainability_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateWoodSpeciesData {
  common_name: string;
  scientific_name?: string;
  description?: string;
  hardness_janka?: number;
  typical_uses?: string[];
  workability_notes?: string;
  image_representative_grain_url?: string;
  sustainability_notes?: string;
}

// Fetch all wood species
export async function fetchWoodSpecies(): Promise<WoodSpecies[]> {
  try {
    const { data, error } = await supabase
      .from("wood_species")
      .select("*")
      .order("common_name");

    if (error) {
      console.error("Error fetching wood species:", error);
      throw new Error(error.message);
    }

    return data || [];
  } catch (error) {
    console.error("Exception fetching wood species:", error);
    throw error;
  }
}

// Fetch a single wood species by ID
export async function fetchWoodSpeciesById(id: number): Promise<WoodSpecies | null> {
  try {
    const { data, error } = await supabase
      .from("wood_species")
      .select("*")
      .eq("species_id", id)
      .single();

    if (error) {
      console.error("Error fetching wood species:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Exception fetching wood species:", error);
    throw error;
  }
}

// Create a new wood species
export async function createWoodSpecies(speciesData: CreateWoodSpeciesData): Promise<WoodSpecies> {
  try {
    const { data, error } = await supabase
      .from("wood_species")
      .insert([speciesData])
      .select()
      .single();

    if (error) {
      console.error("Error creating wood species:", error);
      throw new Error(`Failed to create wood species: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Exception creating wood species:", error);
    throw error;
  }
}

// Update an existing wood species
export async function updateWoodSpecies(
  id: number,
  speciesData: Partial<CreateWoodSpeciesData>
): Promise<WoodSpecies> {
  try {
    const { data, error } = await supabase
      .from("wood_species")
      .update(speciesData)
      .eq("species_id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating wood species:", error);
      throw new Error(`Failed to update wood species: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Exception updating wood species:", error);
    throw error;
  }
}

// Delete a wood species
export async function deleteWoodSpecies(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("wood_species")
      .delete()
      .eq("species_id", id);

    if (error) {
      console.error("Error deleting wood species:", error);
      throw new Error(`Failed to delete wood species: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error("Exception deleting wood species:", error);
    throw error;
  }
}
