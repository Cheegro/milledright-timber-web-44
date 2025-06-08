
import { supabase } from '@/integrations/supabase/client';

export interface AnalyticsEvent {
  id?: string;
  event_name: string;
  event_category?: string;
  page_path?: string;
  user_agent?: string;
  ip_address?: string;
  session_id?: string;
  parameters?: Record<string, any>;
  created_at?: string;
}

export interface AnalyticsPageView {
  id?: string;
  page_path: string;
  page_title?: string;
  referrer?: string;
  user_agent?: string;
  ip_address?: string;
  session_id?: string;
  view_duration?: number;
  created_at?: string;
}

export interface AnalyticsStats {
  totalPageViews: number;
  uniqueVisitors: number;
  topPages: Array<{ page_path: string; views: number }>;
  topEvents: Array<{ event_name: string; count: number }>;
  recentActivity: Array<{ type: 'page_view' | 'event'; data: any; created_at: string }>;
}

// Track a page view
export const trackPageView = async (pageView: Omit<AnalyticsPageView, 'id' | 'created_at'>) => {
  try {
    const { error } = await supabase
      .from('analytics_page_views')
      .insert([pageView]);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// Track an event
export const trackEvent = async (event: Omit<AnalyticsEvent, 'id' | 'created_at'>) => {
  try {
    const { error } = await supabase
      .from('analytics_events')
      .insert([event]);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

// Get analytics stats for admin dashboard
export const getAnalyticsStats = async (days: number = 30): Promise<AnalyticsStats> => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  try {
    // Get total page views
    const { count: totalPageViews } = await supabase
      .from('analytics_page_views')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startDate.toISOString());

    // Get unique visitors (based on session_id)
    const { data: uniqueSessionsData } = await supabase
      .from('analytics_page_views')
      .select('session_id')
      .gte('created_at', startDate.toISOString())
      .not('session_id', 'is', null);
    
    const uniqueVisitors = new Set(uniqueSessionsData?.map(d => d.session_id)).size;

    // Get top pages
    const { data: topPagesData } = await supabase
      .from('analytics_page_views')
      .select('page_path')
      .gte('created_at', startDate.toISOString());
    
    const pageViewCounts = topPagesData?.reduce((acc, view) => {
      acc[view.page_path] = (acc[view.page_path] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};
    
    const topPages = Object.entries(pageViewCounts)
      .map(([page_path, views]) => ({ page_path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Get top events
    const { data: topEventsData } = await supabase
      .from('analytics_events')
      .select('event_name')
      .gte('created_at', startDate.toISOString());
    
    const eventCounts = topEventsData?.reduce((acc, event) => {
      acc[event.event_name] = (acc[event.event_name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};
    
    const topEvents = Object.entries(eventCounts)
      .map(([event_name, count]) => ({ event_name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Get recent activity
    const { data: recentPageViews } = await supabase
      .from('analytics_page_views')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    const { data: recentEvents } = await supabase
      .from('analytics_events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    const recentActivity = [
      ...(recentPageViews?.map(pv => ({ type: 'page_view' as const, data: pv, created_at: pv.created_at })) || []),
      ...(recentEvents?.map(ev => ({ type: 'event' as const, data: ev, created_at: ev.created_at })) || [])
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 10);

    return {
      totalPageViews: totalPageViews || 0,
      uniqueVisitors,
      topPages,
      topEvents,
      recentActivity
    };
  } catch (error) {
    console.error('Error getting analytics stats:', error);
    return {
      totalPageViews: 0,
      uniqueVisitors: 0,
      topPages: [],
      topEvents: [],
      recentActivity: []
    };
  }
};
