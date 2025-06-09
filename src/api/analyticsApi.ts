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
  // Enhanced fields
  country?: string;
  region?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  device_type?: string;
  browser?: string;
  operating_system?: string;
  screen_resolution?: string;
  is_mobile?: boolean;
  timezone?: string;
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
  // Enhanced fields
  country?: string;
  region?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  device_type?: string;
  browser?: string;
  operating_system?: string;
  screen_resolution?: string;
  is_mobile?: boolean;
  timezone?: string;
  created_at?: string;
}

export interface AdvancedAnalyticsStats {
  totalPageViews: number;
  uniqueVisitors: number;
  topPages: Array<{ page_path: string; views: number }>;
  topEvents: Array<{ event_name: string; count: number }>;
  recentActivity: Array<{ type: 'page_view' | 'event'; data: any; created_at: string }>;
  // Enhanced stats
  topCountries: Array<{ country: string; count: number; percentage: number }>;
  topCities: Array<{ city: string; country: string; count: number }>;
  deviceBreakdown: Array<{ device_type: string; count: number; percentage: number }>;
  browserStats: Array<{ browser: string; count: number; percentage: number }>;
  mobileVsDesktop: { mobile: number; desktop: number; tablet: number };
  hourlyStats: Array<{ hour: number; views: number }>;
  averageSessionDuration: number;
  bounceRate: number;
  peakHours: Array<{ hour: number; views: number }>;
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

// Get advanced analytics stats
export const getAdvancedAnalyticsStats = async (days: number = 30): Promise<AdvancedAnalyticsStats> => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  try {
    // Get total page views
    const { count: totalPageViews } = await supabase
      .from('analytics_page_views')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startDate.toISOString());

    // Get unique visitors
    const { data: uniqueSessionsData } = await supabase
      .from('analytics_page_views')
      .select('session_id')
      .gte('created_at', startDate.toISOString())
      .not('session_id', 'is', null);
    
    const uniqueVisitors = new Set(uniqueSessionsData?.map(d => d.session_id)).size;

    // Get page views with enhanced data
    const { data: pageViewsData } = await supabase
      .from('analytics_page_views')
      .select('*')
      .gte('created_at', startDate.toISOString());

    // Top pages
    const pageViewCounts = pageViewsData?.reduce((acc, view) => {
      acc[view.page_path] = (acc[view.page_path] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};
    
    const topPages = Object.entries(pageViewCounts)
      .map(([page_path, views]) => ({ page_path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Top countries with percentages
    const countryCounts = pageViewsData?.reduce((acc, view) => {
      if (view.country) {
        acc[view.country] = (acc[view.country] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>) || {};

    const totalCountryViews = Object.values(countryCounts).reduce((sum, count) => sum + count, 0);
    const topCountries = Object.entries(countryCounts)
      .map(([country, count]) => ({ 
        country, 
        count, 
        percentage: totalCountryViews > 0 ? (count / totalCountryViews) * 100 : 0 
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Top cities
    const cityCounts = pageViewsData?.reduce((acc, view) => {
      if (view.city && view.country) {
        const key = `${view.city}, ${view.country}`;
        acc[key] = (acc[key] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>) || {};

    const topCities = Object.entries(cityCounts)
      .map(([cityCountry, count]) => {
        const [city, country] = cityCountry.split(', ');
        return { city, country, count };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Device breakdown
    const deviceCounts = pageViewsData?.reduce((acc, view) => {
      if (view.device_type) {
        acc[view.device_type] = (acc[view.device_type] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>) || {};

    const totalDeviceViews = Object.values(deviceCounts).reduce((sum, count) => sum + count, 0);
    const deviceBreakdown = Object.entries(deviceCounts)
      .map(([device_type, count]) => ({ 
        device_type, 
        count, 
        percentage: totalDeviceViews > 0 ? (count / totalDeviceViews) * 100 : 0 
      }))
      .sort((a, b) => b.count - a.count);

    // Browser stats
    const browserCounts = pageViewsData?.reduce((acc, view) => {
      if (view.browser) {
        acc[view.browser] = (acc[view.browser] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>) || {};

    const totalBrowserViews = Object.values(browserCounts).reduce((sum, count) => sum + count, 0);
    const browserStats = Object.entries(browserCounts)
      .map(([browser, count]) => ({ 
        browser, 
        count, 
        percentage: totalBrowserViews > 0 ? (count / totalBrowserViews) * 100 : 0 
      }))
      .sort((a, b) => b.count - a.count);

    // Mobile vs Desktop
    const mobileViews = pageViewsData?.filter(view => view.is_mobile === true).length || 0;
    const desktopViews = pageViewsData?.filter(view => view.is_mobile === false && view.device_type !== 'Tablet').length || 0;
    const tabletViews = pageViewsData?.filter(view => view.device_type === 'Tablet').length || 0;

    // Hourly stats
    const hourlyData = Array(24).fill(0);
    pageViewsData?.forEach(view => {
      const hour = new Date(view.created_at).getHours();
      hourlyData[hour]++;
    });
    const hourlyStats = hourlyData.map((views, hour) => ({ hour, views }));

    // Peak hours (top 3)
    const peakHours = hourlyStats
      .sort((a, b) => b.views - a.views)
      .slice(0, 3);

    // Get events data
    const { data: eventsData } = await supabase
      .from('analytics_events')
      .select('*')
      .gte('created_at', startDate.toISOString());

    const eventCounts = eventsData?.reduce((acc, event) => {
      acc[event.event_name] = (acc[event.event_name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};
    
    const topEvents = Object.entries(eventCounts)
      .map(([event_name, count]) => ({ event_name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Recent activity
    const recentPageViews = await supabase
      .from('analytics_page_views')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    const recentEvents = await supabase
      .from('analytics_events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    const recentActivity = [
      ...(recentPageViews.data?.map(pv => ({ type: 'page_view' as const, data: pv, created_at: pv.created_at })) || []),
      ...(recentEvents.data?.map(ev => ({ type: 'event' as const, data: ev, created_at: ev.created_at })) || [])
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 10);

    // Calculate average session duration and bounce rate
    const sessions = pageViewsData?.reduce((acc, view) => {
      if (view.session_id) {
        if (!acc[view.session_id]) {
          acc[view.session_id] = [];
        }
        acc[view.session_id].push(new Date(view.created_at).getTime());
      }
      return acc;
    }, {} as Record<string, number[]>) || {};

    let totalSessionDuration = 0;
    let bounces = 0;
    const sessionCount = Object.keys(sessions).length;

    Object.values(sessions).forEach(sessionTimes => {
      sessionTimes.sort((a, b) => a - b);
      if (sessionTimes.length === 1) {
        bounces++;
      } else {
        const duration = sessionTimes[sessionTimes.length - 1] - sessionTimes[0];
        totalSessionDuration += duration;
      }
    });

    const averageSessionDuration = sessionCount > bounces ? totalSessionDuration / (sessionCount - bounces) : 0;
    const bounceRate = sessionCount > 0 ? (bounces / sessionCount) * 100 : 0;

    return {
      totalPageViews: totalPageViews || 0,
      uniqueVisitors,
      topPages,
      topEvents,
      recentActivity,
      topCountries,
      topCities,
      deviceBreakdown,
      browserStats,
      mobileVsDesktop: { mobile: mobileViews, desktop: desktopViews, tablet: tabletViews },
      hourlyStats,
      averageSessionDuration: Math.round(averageSessionDuration / 1000 / 60), // Convert to minutes
      bounceRate: Math.round(bounceRate),
      peakHours
    };
  } catch (error) {
    console.error('Error getting advanced analytics stats:', error);
    return {
      totalPageViews: 0,
      uniqueVisitors: 0,
      topPages: [],
      topEvents: [],
      recentActivity: [],
      topCountries: [],
      topCities: [],
      deviceBreakdown: [],
      browserStats: [],
      mobileVsDesktop: { mobile: 0, desktop: 0, tablet: 0 },
      hourlyStats: Array(24).fill(0).map((_, hour) => ({ hour, views: 0 })),
      averageSessionDuration: 0,
      bounceRate: 0,
      peakHours: []
    };
  }
};

// Keep the original function for backward compatibility
export const getAnalyticsStats = getAdvancedAnalyticsStats;
