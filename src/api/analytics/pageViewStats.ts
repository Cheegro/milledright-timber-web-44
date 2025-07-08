import { supabase } from '@/integrations/supabase/client';
import type { AnalyticsPageView } from '../analyticsApi'; // Adjust path as needed if types move

export const fetchTotalPageViewsCount = async (startDate: Date): Promise<number> => {
  // Analytics disabled - no analytics tables in current database schema
  return 0;
};

export const fetchRawPageViews = async (startDate: Date): Promise<AnalyticsPageView[]> => {
  // Analytics disabled - no analytics tables in current database schema
  return [];
};

export const calculateUniqueVisitors = (pageViewsData: AnalyticsPageView[]): number => {
  if (!pageViewsData || pageViewsData.length === 0) return 0;
  const uniqueSessionIds = new Set(pageViewsData.map(d => d.session_id).filter(Boolean));
  return uniqueSessionIds.size;
};

export const calculateTopPages = (pageViewsData: AnalyticsPageView[], limit: number = 10): Array<{ page_path: string; views: number }> => {
  if (!pageViewsData || pageViewsData.length === 0) return [];
  const pageViewCounts = pageViewsData.reduce((acc, view) => {
    if (view.page_path) {
      acc[view.page_path] = (acc[view.page_path] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(pageViewCounts)
    .map(([page_path, views]) => ({ page_path, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
};
