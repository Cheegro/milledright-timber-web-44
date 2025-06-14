
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

    const [recentPageViewsResult, recentEventsResult] = await Promise.all([recentPageViewsPromise, recentEventsPromise]);

    if (recentPageViewsResult.error) console.error('Error fetching recent page views:', recentPageViewsResult.error);
    if (recentEventsResult.error) console.error('Error fetching recent events:', recentEventsResult.error);

    const mappedPageViews = recentPageViewsResult.data?.map((pv: any) => {
      // Explicitly construct the AnalyticsPageView object for type safety
      const pageViewData: AnalyticsPageView = {
        id: pv.id as string,
        page_path: pv.page_path as string,
        page_title: typeof pv.page_title === 'string' ? pv.page_title : undefined,
        referrer: typeof pv.referrer === 'string' ? pv.referrer : undefined,
        user_agent: typeof pv.user_agent === 'string' ? pv.user_agent : undefined,
        ip_address: typeof pv.ip_address === 'string' ? pv.ip_address : undefined,
        session_id: typeof pv.session_id === 'string' ? pv.session_id : undefined,
        view_duration: typeof pv.view_duration === 'number' ? pv.view_duration : undefined,
        country: typeof pv.country === 'string' ? pv.country : undefined,
        region: typeof pv.region === 'string' ? pv.region : undefined,
        city: typeof pv.city === 'string' ? pv.city : undefined,
        latitude: typeof pv.latitude === 'number' ? pv.latitude : undefined,
        longitude: typeof pv.longitude === 'number' ? pv.longitude : undefined,
        device_type: typeof pv.device_type === 'string' ? pv.device_type : undefined,
        browser: typeof pv.browser === 'string' ? pv.browser : undefined,
        operating_system: typeof pv.operating_system === 'string' ? pv.operating_system : undefined,
        screen_resolution: typeof pv.screen_resolution === 'string' ? pv.screen_resolution : undefined,
        is_mobile: typeof pv.is_mobile === 'boolean' ? pv.is_mobile : undefined,
        timezone: typeof pv.timezone === 'string' ? pv.timezone : undefined,
        created_at: pv.created_at as string, // Assuming created_at is always a string from DB
      };
      return {
        type: 'page_view' as const,
        data: pageViewData,
        created_at: pv.created_at!,
      };
    }) || [];

    const mappedEvents = recentEventsResult.data?.map((ev: any) => {
      // Explicitly construct the AnalyticsEvent object for type safety
      const eventData: AnalyticsEvent = {
        id: ev.id as string,
        event_name: ev.event_name as string,
        event_category: typeof ev.event_category === 'string' ? ev.event_category : undefined,
        page_path: typeof ev.page_path === 'string' ? ev.page_path : undefined,
        user_agent: typeof ev.user_agent === 'string' ? ev.user_agent : undefined,
        ip_address: typeof ev.ip_address === 'string' ? ev.ip_address : undefined,
        session_id: typeof ev.session_id === 'string' ? ev.session_id : undefined,
        parameters: ev.parameters as Record<string, any> | undefined,
        country: typeof ev.country === 'string' ? ev.country : undefined,
        region: typeof ev.region === 'string' ? ev.region : undefined,
        city: typeof ev.city === 'string' ? ev.city : undefined,
        latitude: typeof ev.latitude === 'number' ? ev.latitude : undefined,
        longitude: typeof ev.longitude === 'number' ? ev.longitude : undefined,
        device_type: typeof ev.device_type === 'string' ? ev.device_type : undefined,
        browser: typeof ev.browser === 'string' ? ev.browser : undefined,
        operating_system: typeof ev.operating_system === 'string' ? ev.operating_system : undefined,
        screen_resolution: typeof ev.screen_resolution === 'string' ? ev.screen_resolution : undefined,
        is_mobile: typeof ev.is_mobile === 'boolean' ? ev.is_mobile : undefined,
        timezone: typeof ev.timezone === 'string' ? ev.timezone : undefined,
        created_at: ev.created_at as string, // Assuming created_at is always a string from DB
      };
      return {
        type: 'event' as const,
        data: eventData,
        created_at: ev.created_at!,
      };
    }) || [];

    const activity = [
      ...mappedPageViews,
      ...mappedEvents
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, limit);
    
    return activity;
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    return [];
  }
};

