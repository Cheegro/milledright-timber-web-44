
// Analytics calculation utilities with proper rounding
export const calculateBounceRate = (sessions: any[]): number => {
  if (sessions.length === 0) return 0;
  const bounces = sessions.filter(session => session.page_count <= 1).length;
  return Math.round((bounces / sessions.length) * 100);
};

export const calculateAverageSessionDuration = (sessions: any[]): number => {
  if (sessions.length === 0) return 0;
  const totalDuration = sessions.reduce((sum, session) => sum + (session.duration || 0), 0);
  return Math.round(totalDuration / sessions.length / 60); // Convert to minutes
};

export const getTopCountries = (data: any[]): Array<{country: string, count: number, percentage: number}> => {
  const countryCounts: Record<string, number> = {};
  
  // Build the counts
  data.forEach(item => {
    if (item.country) {
      countryCounts[item.country] = (countryCounts[item.country] || 0) + 1;
    }
  });

  // Calculate total
  const total = Object.values(countryCounts).reduce((sum: number, count: number) => sum + count, 0);
  
  return Object.entries(countryCounts)
    .map(([country, count]): {country: string, count: number, percentage: number} => ({
      country,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0 // Clean integer percentages
    }))
    .sort((a, b) => b.count - a.count);
};

export const getPeakHours = (data: any[]): Array<{hour: number, count: number}> => {
  const hourCounts = Array(24).fill(0);
  
  data.forEach(item => {
    if (item.created_at) {
      const hour = new Date(item.created_at).getHours();
      hourCounts[hour]++;
    }
  });

  return hourCounts
    .map((count, hour) => ({ hour, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
};
