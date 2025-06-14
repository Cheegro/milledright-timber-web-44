
import type { AnalyticsPageView } from '../analyticsApi';

export const calculateSessionMetrics = (pageViewsData: AnalyticsPageView[]): { averageSessionDuration: number; bounceRate: number } => {
  if (!pageViewsData || pageViewsData.length === 0) return { averageSessionDuration: 0, bounceRate: 0 };

  const sessions = pageViewsData.reduce((acc, view) => {
    if (view.session_id && view.created_at) {
      if (!acc[view.session_id]) {
        acc[view.session_id] = [];
      }
      acc[view.session_id].push(new Date(view.created_at).getTime());
    }
    return acc;
  }, {} as Record<string, number[]>);

  let totalSessionDuration = 0;
  let bounces = 0;
  const sessionCount = Object.keys(sessions).length;

  if (sessionCount === 0) return { averageSessionDuration: 0, bounceRate: 0 };

  Object.values(sessions).forEach(sessionTimes => {
    sessionTimes.sort((a, b) => a - b);
    if (sessionTimes.length === 1) {
      bounces++;
    } else {
      const duration = sessionTimes[sessionTimes.length - 1] - sessionTimes[0];
      totalSessionDuration += duration;
    }
  });

  const averageSessionDurationMs = sessionCount > bounces ? totalSessionDuration / (sessionCount - bounces) : 0;
  const bounceRatePercent = sessionCount > 0 ? (bounces / sessionCount) * 100 : 0;

  return {
    averageSessionDuration: Math.round(averageSessionDurationMs / 1000 / 60), // Convert to minutes
    bounceRate: Math.round(bounceRatePercent),
  };
};
