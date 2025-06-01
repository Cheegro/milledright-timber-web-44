
import { supabase } from "@/integrations/supabase/client";

export interface NewsletterSubscription {
  id?: string;
  email: string;
  name?: string;
  subscribed_at?: string;
  is_active?: boolean;
  unsubscribe_token?: string;
  created_at?: string;
}

export const subscribeToNewsletter = async (email: string, name?: string): Promise<NewsletterSubscription> => {
  const { data, error } = await supabase
    .from("newsletter_subscriptions")
    .insert({
      email,
      name: name || null,
    })
    .select()
    .single();
    
  if (error) {
    if (error.code === '23505') { // Unique constraint violation
      throw new Error('This email is already subscribed to our newsletter.');
    }
    throw error;
  }
  
  return data;
};

export const unsubscribeFromNewsletter = async (token: string): Promise<void> => {
  const { error } = await supabase
    .from("newsletter_subscriptions")
    .update({ is_active: false })
    .eq("unsubscribe_token", token);
    
  if (error) {
    throw error;
  }
};

export const checkSubscriptionStatus = async (email: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from("newsletter_subscriptions")
    .select("is_active")
    .eq("email", email)
    .maybeSingle();
    
  if (error) {
    throw error;
  }
  
  return data?.is_active || false;
};
