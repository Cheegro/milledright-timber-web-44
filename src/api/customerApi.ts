import { supabase } from "@/integrations/supabase/client";

export const fetchCustomers = async () => {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });
    
  if (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
  
  return data || [];
};

export const createCustomer = async (customer: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source?: string;
  notes?: string;
}) => {
  const { data, error } = await supabase
    .from("customers")
    .insert([customer])
    .select()
    .single();
    
  if (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
  
  return data;
};