
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

// Fetch all customers (table doesn't exist yet)
export const fetchCustomers = async (): Promise<Customer[]> => {
  // Customer table not implemented yet
  console.warn("Customer table not implemented in database");
  return [];
};

// Fetch conversations for a customer (table doesn't exist yet)
export const fetchConversations = async (customerId?: number): Promise<Conversation[]> => {
  // Conversations table not implemented yet
  console.warn("Conversations table not implemented in database");
  return [];
};

// Create a new customer (table doesn't exist yet)
export const createCustomer = async (customer: Omit<Customer, 'customer_id' | 'created_at'>): Promise<Customer> => {
  throw new Error("Customer table not implemented in database");
};

// Create a new conversation (table doesn't exist yet)
export const createConversation = async (conversation: Omit<Conversation, 'conversation_id' | 'created_at' | 'updated_at'>): Promise<Conversation> => {
  throw new Error("Conversations table not implemented in database");
};

// Update conversation status (table doesn't exist yet)
export const updateConversationStatus = async (conversationId: number, status: string): Promise<Conversation> => {
  throw new Error("Conversations table not implemented in database");
};
