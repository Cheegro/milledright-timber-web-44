
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AdvancedAnalyticsStats } from '@/api/analyticsApi';
import { format } from 'date-fns';

interface RecentActivityProps {
  stats: AdvancedAnalyticsStats | undefined;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ stats }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Visitor Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {stats?.recentActivity && stats.recentActivity.length > 0 ? (
            stats.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div className="flex items-center gap-3">
                  <Badge variant={activity.type === 'page_view' ? 'default' : 'secondary'} className={activity.type === 'page_view' ? 'bg-sawmill-Toyota-Personalized-Electric-Turquoise-color text-white' : 'bg-sawmill-medium-brown text-white'}>
                    {activity.type === 'page_view' ? 'Page View' : 'Event'}
                  </Badge>
                  <span className="text-sm">
                    {activity.type === 'page_view' 
                      ? `${activity.data.page_path === '/' ? 'Home' : activity.data.page_path}`
                      : activity.data.event_name.replace(/_/g, ' ')
                    }
                  </span>
                  {activity.data.country && (
                    <span className="text-xs text-muted-foreground">
                      from {getCountryFlag(activity.data.country)} {activity.data.city || activity.data.country}
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(activity.created_at), 'MMM d, h:mm a')}
                </span>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">No recent activity recorded.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function, can be moved to utils if used elsewhere
const getCountryFlag = (countryCode: string | undefined) => {
  if (!countryCode) return '🌍';
  // Simple mapping for common countries, extend as needed
  const flagMap: Record<string, string> = {
      'United States': '🇺🇸', 'US': '🇺🇸', 
      'Canada': '🇨🇦', 'CA': '🇨🇦',
      'United Kingdom': '🇬🇧', 'GB': '🇬🇧',
      'Germany': '🇩🇪', 'DE': '🇩🇪',
      'France': '🇫🇷', 'FR': '🇫🇷',
      'Australia': '🇦🇺', 'AU': '🇦🇺',
      'Japan': '🇯🇵', 'JP': '🇯🇵',
      'China': '🇨🇳', 'CN': '🇨🇳',
      'India': '🇮🇳', 'IN': '🇮🇳',
      'Brazil': '🇧🇷', 'BR': '🇧🇷'
  };
  return flagMap[countryCode] || '🌍';
};

export default RecentActivity;
