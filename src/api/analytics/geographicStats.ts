
import type { AnalyticsPageView } from '../analyticsApi';

export const calculateTopCountries = (pageViewsData: AnalyticsPageView[], limit: number = 10): Array<{ country: string; count: number; percentage: number }> => {
  if (!pageViewsData || pageViewsData.length === 0) return [];
  const countryCounts = pageViewsData.reduce((acc, view) => {
    if (view.country) {
      acc[view.country] = (acc[view.country] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const totalCountryViews = Object.values(countryCounts).reduce((sum, count) => sum + count, 0);
  return Object.entries(countryCounts)
    .map(([country, count]) => ({ 
      country, 
      count, 
      percentage: totalCountryViews > 0 ? parseFloat(((count / totalCountryViews) * 100).toFixed(2)) : 0 
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

export const calculateTopCities = (pageViewsData: AnalyticsPageView[], limit: number = 10): Array<{ city: string; country: string; count: number }> => {
  if (!pageViewsData || pageViewsData.length === 0) return [];
  const cityCounts = pageViewsData.reduce((acc, view) => {
    if (view.city && view.country) {
      const key = `${view.city}, ${view.country}`;
      acc[key] = (acc[key] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(cityCounts)
    .map(([cityCountry, count]) => {
      const parts = cityCountry.split(', ');
      return { city: parts[0], country: parts[1] || '', count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};
