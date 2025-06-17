
import { supabase } from '@/integrations/supabase/client';

export const clearAllAnalyticsData = async () => {
  try {
    console.log('Clearing all analytics data...');
    
    // Delete all page views
    const pageViewsResult = await supabase
      .from('analytics_page_views')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records
    
    console.log('Page views deleted:', pageViewsResult);
    
    // Delete all events
    const eventsResult = await supabase
      .from('analytics_events')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records
    
    console.log('Events deleted:', eventsResult);
    
    // Clear any session storage analytics data
    sessionStorage.removeItem('analytics_session_id');
    sessionStorage.removeItem('session_start_time');
    
    return {
      pageViewsDeleted: !pageViewsResult.error,
      eventsDeleted: !eventsResult.error,
      errors: {
        pageViews: pageViewsResult.error,
        events: eventsResult.error
      }
    };
  } catch (error) {
    console.error('Error clearing analytics data:', error);
    return { error };
  }
};

export const checkAnalyticsTablesExist = async () => {
  try {
    // Try to query each table to see if it exists
    const pageViewsCheck = await supabase
      .from('analytics_page_views')
      .select('count', { count: 'exact', head: true })
      .limit(1);
    
    const eventsCheck = await supabase
      .from('analytics_events')
      .select('count', { count: 'exact', head: true })
      .limit(1);
    
    return {
      pageViewsTableExists: !pageViewsCheck.error,
      eventsTableExists: !eventsCheck.error,
      pageViewsError: pageViewsCheck.error?.message,
      eventsError: eventsCheck.error?.message
    };
  } catch (error) {
    console.error('Error checking analytics tables:', error);
    return { error };
  }
};
