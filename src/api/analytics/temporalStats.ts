
import type { AnalyticsPageView } from '../analyticsApi';

export const calculateHourlyStats = (pageViewsData: AnalyticsPageView[]): Array<{ hour: number; views: number }> => {
  if (!pageViewsData || pageViewsData.length === 0) return Array(24).fill(0).map((_, hour) => ({ hour, views: 0 }));
  const hourlyData = Array(24).fill(0);
  pageViewsData.forEach(view => {
    if (view.created_at) {
      const hour = new Date(view.created_at).getHours();
      hourlyData[hour]++;
    }
  });
  return hourlyData.map((views, hour) => ({ hour, views }));
};

export const calculatePeakHours = (hourlyStats: Array<{ hour: number; views: number }>, limit: number = 3): Array<{ hour: number; views: number }> => {
  return [...hourlyStats] // Create a copy before sorting
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
};
