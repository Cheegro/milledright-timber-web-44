import { supabase } from '@/integrations/supabase/client';
import type { AnalyticsPageView } from '../analyticsApi'; // Adjust path as needed if types move

export const fetchTotalPageViewsCount = async (startDate: Date): Promise<number> => {
  const { count } = await supabase
    .from('analytics_page_views')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', startDate.toISOString());
  return count || 0;
};

export const fetchRawPageViews = async (startDate: Date): Promise<AnalyticsPageView[]> => {
  const { data, error } = await supabase
    .from('analytics_page_views')
    .select('*')
    .gte('created_at', startDate.toISOString());
  if (error) {
    console.error('Error fetching raw page views:', error);
    return [];
  }
  // Ensure ip_address conforms to AnalyticsPageView type and other fields match
  return (data?.map(view => ({
    ...view, // Spread all properties from the fetched view
    id: view.id as string, // Assuming id is always a string from DB
    page_path: view.page_path as string, // Assuming page_path is always a string
    // Ensure ip_address is string or undefined
    ip_address: typeof view.ip_address === 'string' ? view.ip_address : undefined,
    // Ensure created_at is string or undefined
    created_at: typeof view.created_at === 'string' ? view.created_at : undefined,
    session_id: typeof view.session_id === 'string' ? view.session_id : undefined,
    page_title: typeof view.page_title === 'string' ? view.page_title : undefined,
    referrer: typeof view.referrer === 'string' ? view.referrer : undefined,
    user_agent: typeof view.user_agent === 'string' ? view.user_agent : undefined,
    country: typeof view.country === 'string' ? view.country : undefined,
    region: typeof view.region === 'string' ? view.region : undefined,
    city: typeof view.city === 'string' ? view.city : undefined,
    device_type: typeof view.device_type === 'string' ? view.device_type : undefined,
    browser: typeof view.browser === 'string' ? view.browser : undefined,
    operating_system: typeof view.operating_system === 'string' ? view.operating_system : undefined,
    screen_resolution: typeof view.screen_resolution === 'string' ? view.screen_resolution : undefined,
    timezone: typeof view.timezone === 'string' ? view.timezone : undefined,
    view_duration: typeof view.view_duration === 'number' ? view.view_duration : undefined,
    is_mobile: typeof view.is_mobile === 'boolean' ? view.is_mobile : undefined,
    latitude: typeof view.latitude === 'number' ? view.latitude : undefined,
    longitude: typeof view.longitude === 'number' ? view.longitude : undefined,
  })) as AnalyticsPageView[]) || [];
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
