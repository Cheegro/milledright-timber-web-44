
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export type Review = Tables<"reviews"> & {
  products?: {
    name: string;
  } | null;
};

export type ReviewFormValues = {
  author: string;
  location?: string | null;
  rating: number;
  text: string;
  status: 'Published' | 'Pending';
  product_id?: string | null;
  date?: string;
};

// Fetch all reviews
export const fetchReviews = async (): Promise<Review[]> => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*, products(name)")
    .order("date", { ascending: false });
    
  if (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
  
  return data || [];
};

// Fetch a single review by ID
export const fetchReview = async (id: string): Promise<Review> => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*, products(name)")
    .eq("id", id)
    .single();
    
  if (error) {
    console.error(`Error fetching review with ID ${id}:`, error);
    throw error;
  }
  
  return data;
};

// Create a new review
export const createReview = async (review: ReviewFormValues): Promise<Review> => {
  const { data, error } = await supabase
    .from("reviews")
    .insert([review])
    .select("*")
    .single();
    
  if (error) {
    console.error("Error creating review:", error);
    throw error;
  }
  
  return data;
};

// Update an existing review
export const updateReview = async (id: string, review: ReviewFormValues): Promise<Review> => {
  const { data, error } = await supabase
    .from("reviews")
    .update(review)
    .eq("id", id)
    .select("*")
    .single();
    
  if (error) {
    console.error(`Error updating review with ID ${id}:`, error);
    throw error;
  }
  
  return data;
};

// Delete a review
export const deleteReview = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", id);
    
  if (error) {
    console.error(`Error deleting review with ID ${id}:`, error);
    throw error;
  }
};

// Fetch all products (for review form)
export const fetchProductsForReview = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("id, name")
    .order("name");
    
  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  
  return data || [];
};
