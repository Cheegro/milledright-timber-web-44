
import { supabase } from '@/integrations/supabase/client';
import type { AnalyticsEvent, AnalyticsPageView } from '../analyticsApi';

export const fetchRecentActivity = async (limit: number = 10): Promise<Array<{ type: 'page_view' | 'event'; data: any; created_at: string }>> => {
  // Analytics disabled - no analytics tables in current database schema
  return [];
};

