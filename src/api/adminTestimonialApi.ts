
import { supabase } from "@/integrations/supabase/client";

export type Testimonial = {
  id: string;
  author: string;
  location?: string | null;
  rating: number;
  text: string;
  status: 'Published' | 'Pending';
  product_id?: string | null;
  date: string;
  created_at: string;
  updated_at: string;
};

export type TestimonialFormValues = {
  author: string;
  location?: string | null;
  rating: number;
  text: string;
  status: 'Published' | 'Pending';
  product_id?: string | null;
  date?: string;
};

// Type for raw database response
type DatabaseTestimonial = {
  id: string;
  author: string;
  location?: string | null;
  rating: number;
  text: string;
  status: string;
  product_id?: string | null;
  date: string;
  created_at: string;
  updated_at: string;
};

// Helper function to transform database response to Testimonial type
const transformDatabaseTestimonial = (dbTestimonial: DatabaseTestimonial): Testimonial => {
  return {
    ...dbTestimonial,
    status: (dbTestimonial.status === 'Published' || dbTestimonial.status === 'Pending') 
      ? dbTestimonial.status as 'Published' | 'Pending'
      : 'Pending'
  };
};

// Fetch all testimonials for homepage display
export const fetchPublishedTestimonials = async (): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("status", "Published")
    .order("date", { ascending: false })
    .limit(6);
    
  if (error) {
    console.error("Error fetching published testimonials:", error);
    throw error;
  }
  
  return (data || []).map(transformDatabaseTestimonial);
};

// Fetch all testimonials for admin
export const fetchAllTestimonials = async (): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("date", { ascending: false });
    
  if (error) {
    console.error("Error fetching all testimonials:", error);
    throw error;
  }
  
  return (data || []).map(transformDatabaseTestimonial);
};

// Fetch a single testimonial by ID
export const fetchTestimonial = async (id: string): Promise<Testimonial> => {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single();
    
  if (error) {
    console.error(`Error fetching testimonial with ID ${id}:`, error);
    throw error;
  }
  
  return transformDatabaseTestimonial(data);
};

// Create a new testimonial
export const createTestimonial = async (testimonial: TestimonialFormValues): Promise<Testimonial> => {
  const { data, error } = await supabase
    .from("testimonials")
    .insert([testimonial])
    .select("*")
    .single();
    
  if (error) {
    console.error("Error creating testimonial:", error);
    throw error;
  }
  
  return transformDatabaseTestimonial(data);
};

// Update an existing testimonial
export const updateTestimonial = async (id: string, testimonial: TestimonialFormValues): Promise<Testimonial> => {
  const { data, error } = await supabase
    .from("testimonials")
    .update(testimonial)
    .eq("id", id)
    .select("*")
    .single();
    
  if (error) {
    console.error(`Error updating testimonial with ID ${id}:`, error);
    throw error;
  }
  
  return transformDatabaseTestimonial(data);
};

// Delete a testimonial
export const deleteTestimonial = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", id);
    
  if (error) {
    console.error(`Error deleting testimonial with ID ${id}:`, error);
    throw error;
  }
};

// Fetch all products (for testimonial form)
export const fetchProductsForTestimonial = async () => {
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
