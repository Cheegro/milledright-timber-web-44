
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export type SiteSetting = Tables<"site_settings">;

export type SettingValue = string | boolean | object;

// Fetch all settings
export const fetchSettings = async (): Promise<SiteSetting[]> => {
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .order("setting_key");
    
  if (error) {
    console.error("Error fetching settings:", error);
    throw error;
  }
  
  return data || [];
};

// Get a specific setting by key
export const getSetting = async (key: string): Promise<SiteSetting | null> => {
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("setting_key", key)
    .single();
    
  if (error && error.code !== 'PGRST116') {
    console.error(`Error fetching setting ${key}:`, error);
    throw error;
  }
  
  return data;
};

// Update a setting
export const updateSetting = async (key: string, value: SettingValue): Promise<SiteSetting> => {
  const { data, error } = await supabase
    .from("site_settings")
    .update({ 
      setting_value: JSON.stringify(value),
      updated_at: new Date().toISOString()
    })
    .eq("setting_key", key)
    .select("*")
    .single();
    
  if (error) {
    console.error(`Error updating setting ${key}:`, error);
    throw error;
  }
  
  return data;
};

// Update multiple settings at once
export const updateMultipleSettings = async (updates: Record<string, SettingValue>): Promise<void> => {
  const promises = Object.entries(updates).map(([key, value]) => 
    updateSetting(key, value)
  );
  
  await Promise.all(promises);
};

// Helper function to parse setting value
export const parseSettingValue = (setting: SiteSetting): SettingValue => {
  if (!setting.setting_value) return "";
  
  try {
    const parsed = JSON.parse(setting.setting_value as string);
    return parsed;
  } catch {
    return setting.setting_value as string;
  }
};
