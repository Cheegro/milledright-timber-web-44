
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';
import type { AdvancedAnalyticsStats } from '@/api/analyticsApi';

interface UserBehaviorProps {
  stats: AdvancedAnalyticsStats | undefined;
}

const UserBehavior: React.FC<UserBehaviorProps> = ({ stats }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-sawmill-orange" />
          User Behavior
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold mb-2">Most Popular Pages</h4>
            {stats?.topPages && stats.topPages.length > 0 ? (
              stats.topPages.slice(0, 5).map((page, index) => (
                <div key={index} className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium truncate max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[120px] xl:max-w-[150px]">
                    {page.page_path === '/' ? 'Home' : page.page_path}
                  </span>
                  <Badge className="bg-sawmill-orange text-white text-xs">
                    {page.views} views
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No page data recorded yet.</p>
            )}
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2">Top Interactions</h4>
            {stats?.topEvents && stats.topEvents.length > 0 ? (
              stats.topEvents.slice(0, 5).map((event, index) => (
                <div key={index} className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium truncate max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[120px] xl:max-w-[150px]">
                    {event.event_name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  <Badge className="bg-sawmill-medium-brown text-white text-xs">
                    {event.count} clicks
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No events recorded yet.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserBehavior;
