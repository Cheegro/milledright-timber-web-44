
import type { AnalyticsPageView } from '../analyticsApi';

export const calculateDeviceBreakdown = (pageViewsData: AnalyticsPageView[]): Array<{ device_type: string; count: number; percentage: number }> => {
  if (!pageViewsData || pageViewsData.length === 0) return [];
  const deviceCounts = pageViewsData.reduce((acc, view) => {
    if (view.device_type) {
      acc[view.device_type] = (acc[view.device_type] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const totalDeviceViews = Object.values(deviceCounts).reduce((sum, count) => sum + count, 0);
  return Object.entries(deviceCounts)
    .map(([device_type, count]) => ({ 
      device_type, 
      count, 
      percentage: totalDeviceViews > 0 ? parseFloat(((count / totalDeviceViews) * 100).toFixed(2)) : 0 
    }))
    .sort((a, b) => b.count - a.count);
};

export const calculateBrowserStats = (pageViewsData: AnalyticsPageView[], limit: number = 10): Array<{ browser: string; count: number; percentage: number }> => {
  if (!pageViewsData || pageViewsData.length === 0) return [];
  const browserCounts = pageViewsData.reduce((acc, view) => {
    if (view.browser) {
      acc[view.browser] = (acc[view.browser] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const totalBrowserViews = Object.values(browserCounts).reduce((sum, count) => sum + count, 0);
  return Object.entries(browserCounts)
    .map(([browser, count]) => ({ 
      browser, 
      count, 
      percentage: totalBrowserViews > 0 ? parseFloat(((count / totalBrowserViews) * 100).toFixed(2)) : 0 
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

export const calculateMobileVsDesktop = (pageViewsData: AnalyticsPageView[]): { mobile: number; desktop: number; tablet: number } => {
  if (!pageViewsData || pageViewsData.length === 0) return { mobile: 0, desktop: 0, tablet: 0 };
  const mobileViews = pageViewsData.filter(view => view.is_mobile === true).length;
  const desktopViews = pageViewsData.filter(view => view.is_mobile === false && view.device_type !== 'Tablet').length;
  const tabletViews = pageViewsData.filter(view => view.device_type === 'Tablet').length;
  return { mobile: mobileViews, desktop: desktopViews, tablet: tabletViews };
};
