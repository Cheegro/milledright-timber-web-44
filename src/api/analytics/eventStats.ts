import { supabase } from '@/integrations/supabase/client';
import type { AnalyticsEvent } from '../analyticsApi';

export const fetchRawEvents = async (startDate: Date): Promise<AnalyticsEvent[]> => {
  // Analytics disabled - no analytics tables in current database schema
  return [];
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
