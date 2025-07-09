
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

// Fetch all wood species (table doesn't exist yet)
export async function fetchWoodSpecies(): Promise<WoodSpecies[]> {
  // Wood species table not implemented yet
  console.warn("Wood species table not implemented in database");
  return [];
}

// Fetch a single wood species by ID (table doesn't exist yet)
export async function fetchWoodSpeciesById(id: number): Promise<WoodSpecies | null> {
  // Wood species table not implemented yet
  console.warn("Wood species table not implemented in database");
  return null;
}

// Create a new wood species (table doesn't exist yet)
export async function createWoodSpecies(speciesData: CreateWoodSpeciesData): Promise<WoodSpecies> {
  throw new Error("Wood species table not implemented in database");
}

// Update an existing wood species (table doesn't exist yet)
export async function updateWoodSpecies(
  id: number,
  speciesData: Partial<CreateWoodSpeciesData>
): Promise<WoodSpecies> {
  throw new Error("Wood species table not implemented in database");
}

// Delete a wood species (table doesn't exist yet)
export async function deleteWoodSpecies(id: number): Promise<boolean> {
  throw new Error("Wood species table not implemented in database");
}
