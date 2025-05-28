
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
    .from("reviews")
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
    .from("reviews")
    .select("*")
    .order("date", { ascending: false });
    
  if (error) {
    console.error("Error fetching all testimonials:", error);
    throw error;
  }
  
  return (data || []).map(transformDatabaseTestimonial);
};
