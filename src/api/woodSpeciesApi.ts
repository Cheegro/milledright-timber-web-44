import { supabase } from "@/integrations/supabase/client";

export interface WoodSpecies {
  id: string;
  name: string;
  scientific_name?: string;
  description?: string;
  hardness_rating?: number;
  created_at: string;
  updated_at: string;
}

export const fetchWoodSpecies = async (): Promise<WoodSpecies[]> => {
  const { data, error } = await supabase
    .from("wood_species")
    .select("*")
    .order("name");
    
  if (error) {
    console.error("Error fetching wood species:", error);
    throw error;
  }
  
  return data || [];
};

export const createWoodSpecies = async (species: Omit<WoodSpecies, 'id' | 'created_at' | 'updated_at'>): Promise<WoodSpecies> => {
  const { data, error } = await supabase
    .from("wood_species")
    .insert([species])
    .select()
    .single();
    
  if (error) {
    console.error("Error creating wood species:", error);
    throw error;
  }
  
  return data;
};