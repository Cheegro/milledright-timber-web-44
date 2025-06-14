
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Users, Globe, Clock, Monitor, TrendingUp } from 'lucide-react';
import type { AdvancedAnalyticsStats } from '@/api/analyticsApi';

interface OverviewStatsProps {
  stats: AdvancedAnalyticsStats | undefined;
  formatDuration: (minutes: number) => string;
}

const OverviewStats: React.FC<OverviewStatsProps> = ({ stats, formatDuration }) => {
  const mobilePercentage = Math.round(
    ((stats?.mobileVsDesktop.mobile || 0) / (stats?.totalPageViews || 1)) * 100
  ) || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-sawmill-dark-brown">
            {stats?.totalPageViews.toLocaleString() || 0}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-sawmill-dark-brown">
            {stats?.uniqueVisitors.toLocaleString() || 0}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Countries</CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-sawmill-dark-brown">
            {stats?.topCountries?.length || 0}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Session</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-sawmill-dark-brown">
            {formatDuration(stats?.averageSessionDuration || 0)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mobile Users</CardTitle>
          <Monitor className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-sawmill-dark-brown">
            {mobilePercentage}%
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-sawmill-dark-brown">
            {stats?.bounceRate || 0}%
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewStats;
