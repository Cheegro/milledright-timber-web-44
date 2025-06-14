import { supabase } from '@/integrations/supabase/client';
import type { AnalyticsEvent } from '../analyticsApi';

export const fetchRawEvents = async (startDate: Date): Promise<AnalyticsEvent[]> => {
  const { data, error } = await supabase
    .from('analytics_events')
    .select('*')
    .gte('created_at', startDate.toISOString());
  if (error) {
    console.error('Error fetching raw events:', error);
    return [];
  }
  // Ensure ip_address conforms to AnalyticsEvent type and other fields match
  return (data?.map(event => ({
    ...event, // Spread all properties from the fetched event
    id: event.id as string, // Assuming id is always a string from DB or handle as needed
    event_name: event.event_name as string, // Assuming event_name is always a string
    // Ensure ip_address is string or undefined
    ip_address: typeof event.ip_address === 'string' ? event.ip_address : undefined,
    // Ensure created_at is string or undefined, or handle as per actual DB schema
    created_at: typeof event.created_at === 'string' ? event.created_at : undefined, 
    // Map other potentially problematic fields if necessary, or ensure they conform via 'as'
    // For example, if session_id could be null from DB but string|undefined in type:
    session_id: typeof event.session_id === 'string' ? event.session_id : undefined,
    page_path: typeof event.page_path === 'string' ? event.page_path : undefined,
    user_agent: typeof event.user_agent === 'string' ? event.user_agent : undefined,
    country: typeof event.country === 'string' ? event.country : undefined,
    region: typeof event.region === 'string' ? event.region : undefined,
    city: typeof event.city === 'string' ? event.city : undefined,
    device_type: typeof event.device_type === 'string' ? event.device_type : undefined,
    browser: typeof event.browser === 'string' ? event.browser : undefined,
    operating_system: typeof event.operating_system === 'string' ? event.operating_system : undefined,
    screen_resolution: typeof event.screen_resolution === 'string' ? event.screen_resolution : undefined,
    timezone: typeof event.timezone === 'string' ? event.timezone : undefined,
    parameters: event.parameters as Record<string, any> | undefined, // Cast if type is just Record<string, any>
    is_mobile: typeof event.is_mobile === 'boolean' ? event.is_mobile : undefined,
    latitude: typeof event.latitude === 'number' ? event.latitude : undefined,
    longitude: typeof event.longitude === 'number' ? event.longitude : undefined,
    event_category: typeof event.event_category === 'string' ? event.event_category : undefined,

  })) as AnalyticsEvent[]) || [];
};

export const calculateTopEvents = (eventsData: AnalyticsEvent[], limit: number = 10): Array<{ event_name: string; count: number }> => {
  if (!eventsData || eventsData.length === 0) return [];
  const eventCounts = eventsData.reduce((acc, event) => {
    if (event.event_name) {
      acc[event.event_name] = (acc[event.event_name] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(eventCounts)
    .map(([event_name, count]) => ({ event_name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};
