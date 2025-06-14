import { supabase } from '@/integrations/supabase/client';
import {
  fetchTotalPageViewsCount,
  fetchRawPageViews,
  calculateUniqueVisitors,
  calculateTopPages,
} from './analytics/pageViewStats';
import {
  calculateTopCountries,
  calculateTopCities,
} from './analytics/geographicStats';
import {
  calculateDeviceBreakdown,
  calculateBrowserStats,
  calculateMobileVsDesktop,
} from './analytics/technologyStats';
import {
  calculateHourlyStats,
  calculatePeakHours,
} from './analytics/temporalStats';
import {
  fetchRawEvents,
  calculateTopEvents,
} from './analytics/eventStats';
import { fetchRecentActivity } from './analytics/activityStats';
import { calculateSessionMetrics } from './analytics/behavioralStats';

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
    const [
      totalPageViews,
      pageViewsData,
      eventsData,
      recentActivityData
    ] = await Promise.all([
      fetchTotalPageViewsCount(startDate),
      fetchRawPageViews(startDate),
      fetchRawEvents(startDate),
      fetchRecentActivity(10) // Fetch 10 recent activities
    ]);

    const uniqueVisitors = calculateUniqueVisitors(pageViewsData);
    const topPages = calculateTopPages(pageViewsData);
    const topCountries = calculateTopCountries(pageViewsData);
    const topCities = calculateTopCities(pageViewsData);
    const deviceBreakdown = calculateDeviceBreakdown(pageViewsData);
    const browserStats = calculateBrowserStats(pageViewsData);
    const mobileVsDesktop = calculateMobileVsDesktop(pageViewsData);
    const hourlyStats = calculateHourlyStats(pageViewsData);
    const peakHours = calculatePeakHours(hourlyStats);
    const topEvents = calculateTopEvents(eventsData);
    const { averageSessionDuration, bounceRate } = calculateSessionMetrics(pageViewsData);
    
    return {
      totalPageViews,
      uniqueVisitors,
      topPages,
      topEvents,
      recentActivity: recentActivityData,
      topCountries,
      topCities,
      deviceBreakdown,
      browserStats,
      mobileVsDesktop,
      hourlyStats,
      averageSessionDuration,
      bounceRate,
      peakHours
    };
  } catch (error) {
    console.error('Error getting advanced analytics stats:', error);
    // Return default structure on error
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
