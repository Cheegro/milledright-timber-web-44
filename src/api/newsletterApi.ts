import { supabase } from "@/integrations/supabase/client";

export const subscribeToNewsletter = async (email: string, name?: string, source?: string) => {
  const { data, error } = await supabase
    .from("newsletter_subscriptions")
    .insert([{
      email,
      name,
      source: source || 'website',
      status: 'active'
    }])
    .select()
    .single();
    
  if (error) {
    console.error("Error subscribing to newsletter:", error);
    throw error;
  }
  
  return data;
};

export const fetchNewsletterSubscriptions = async () => {
  const { data, error } = await supabase
    .from("newsletter_subscriptions")
    .select("*")
    .order("subscribed_at", { ascending: false });
    
  if (error) {
    console.error("Error fetching newsletter subscriptions:", error);
    throw error;
  }
  
  return data || [];
};