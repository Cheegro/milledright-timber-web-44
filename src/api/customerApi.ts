
import { supabase } from "@/integrations/supabase/client";

export interface Customer {
  customer_id: number;
  name: string;
  email: string;
  phone?: string;
  company_name?: string;
  location_city_preference?: string;
  initial_contact_channel?: string;
  preferred_wood_species_notes?: string;
  design_style_preferences?: string;
  created_at: string;
}

export interface Conversation {
  conversation_id: number;
  customer_id: number;
  subject: string;
  status: string;
  dream_board_snapshot?: any;
  estimated_budget_range?: string;
  estimated_completion_date?: string;
  next_follow_up_date?: string;
  created_at: string;
  updated_at: string;
}

export interface ConversationEntry {
  entry_id: number;
  conversation_id: number;
  author: 'Customer' | 'MilledRight';
  entry_text: string;
  entry_timestamp: string;
  attachments?: any;
}

// Fetch all customers
export const fetchCustomers = async (): Promise<Customer[]> => {
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

// Fetch conversations for a customer
export const fetchConversations = async (customerId?: number): Promise<Conversation[]> => {
  let query = supabase
    .from("conversations")
    .select("*")
    .order("updated_at", { ascending: false });
    
  if (customerId) {
    query = query.eq("customer_id", customerId);
  }
    
  const { data, error } = await query;
    
  if (error) {
    console.error("Error fetching conversations:", error);
    throw error;
  }
  
  return data || [];
};

// Create a new customer
export const createCustomer = async (customer: Omit<Customer, 'customer_id' | 'created_at'>): Promise<Customer> => {
  const { data, error } = await supabase
    .from("customers")
    .insert(customer)
    .select("*")
    .single();
    
  if (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
  
  return data;
};

// Create a new conversation
export const createConversation = async (conversation: Omit<Conversation, 'conversation_id' | 'created_at' | 'updated_at'>): Promise<Conversation> => {
  const { data, error } = await supabase
    .from("conversations")
    .insert(conversation)
    .select("*")
    .single();
    
  if (error) {
    console.error("Error creating conversation:", error);
    throw error;
  }
  
  return data;
};

// Update conversation status
export const updateConversationStatus = async (conversationId: number, status: string): Promise<Conversation> => {
  const { data, error } = await supabase
    .from("conversations")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("conversation_id", conversationId)
    .select("*")
    .single();
    
  if (error) {
    console.error("Error updating conversation:", error);
    throw error;
  }
  
  return data;
};
