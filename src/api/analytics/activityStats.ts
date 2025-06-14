
import { supabase } from '@/integrations/supabase/client';
import type { AnalyticsEvent, AnalyticsPageView } from '../analyticsApi';

export const fetchRecentActivity = async (limit: number = 10): Promise<Array<{ type: 'page_view' | 'event'; data: any; created_at: string }>> => {
  try {
    const recentPageViewsPromise = supabase
      .from('analytics_page_views')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(Math.ceil(limit / 2));

    const recentEventsPromise = supabase
      .from('analytics_events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(Math.ceil(limit / 2));

    const [recentPageViews, recentEvents] = await Promise.all([recentPageViewsPromise, recentEventsPromise]);

    if (recentPageViews.error) console.error('Error fetching recent page views:', recentPageViews.error);
    if (recentEvents.error) console.error('Error fetching recent events:', recentEvents.error);

    const activity = [
      ...(recentPageViews.data?.map((pv: AnalyticsPageView) => ({ type: 'page_view' as const, data: pv, created_at: pv.created_at! })) || []),
      ...(recentEvents.data?.map((ev: AnalyticsEvent) => ({ type: 'event' as const, data: ev, created_at: ev.created_at! })) || [])
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, limit);
    
    return activity;
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    return [];
  }
};
