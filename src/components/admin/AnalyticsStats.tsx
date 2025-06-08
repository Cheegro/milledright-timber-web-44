
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Eye, MousePointer, Users, TrendingUp } from 'lucide-react';
import { getAnalyticsStats } from '@/api/analyticsApi';
import { format } from 'date-fns';

const AnalyticsStats = () => {
  const [timeRange, setTimeRange] = useState(30);

  const { data: stats, isLoading, refetch } = useQuery({
    queryKey: ['analytics-stats', timeRange],
    queryFn: () => getAnalyticsStats(timeRange),
    refetchInterval: 60000, // Refresh every minute
  });

  const timeRangeOptions = [
    { value: 7, label: 'Last 7 days' },
    { value: 30, label: 'Last 30 days' },
    { value: 90, label: 'Last 90 days' },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-sawmill-dark-brown" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-sawmill-dark-brown">Website Analytics</h2>
        <div className="flex gap-2">
          {timeRangeOptions.map((option) => (
            <Button
              key={option.value}
              variant={timeRange === option.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(option.value)}
              className={timeRange === option.value ? 'bg-sawmill-dark-brown' : ''}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
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
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sawmill-dark-brown">
              {stats?.topEvents.reduce((sum, event) => sum + event.count, 0).toLocaleString() || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Pages/Visit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sawmill-dark-brown">
              {stats?.uniqueVisitors && stats?.totalPageViews 
                ? (stats.totalPageViews / stats.uniqueVisitors).toFixed(1) 
                : '0'}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Most Visited Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats?.topPages && stats.topPages.length > 0 ? (
                stats.topPages.map((page, index) => (
                  <div key={page.page_path} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                        {index + 1}
                      </Badge>
                      <span className="text-sm font-medium truncate">
                        {page.page_path === '/' ? 'Home' : page.page_path}
                      </span>
                    </div>
                    <Badge className="bg-sawmill-orange text-white">
                      {page.views} views
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">No page views recorded yet.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Events */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Most Clicked Elements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats?.topEvents && stats.topEvents.length > 0 ? (
                stats.topEvents.map((event, index) => (
                  <div key={event.event_name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                        {index + 1}
                      </Badge>
                      <span className="text-sm font-medium truncate">
                        {event.event_name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                    <Badge className="bg-sawmill-medium-brown text-white">
                      {event.count} clicks
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">No events recorded yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats?.recentActivity && stats.recentActivity.length > 0 ? (
              stats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex items-center gap-3">
                    <Badge variant={activity.type === 'page_view' ? 'default' : 'secondary'}>
                      {activity.type === 'page_view' ? 'Page View' : 'Event'}
                    </Badge>
                    <span className="text-sm">
                      {activity.type === 'page_view' 
                        ? `${activity.data.page_path === '/' ? 'Home' : activity.data.page_path}`
                        : activity.data.event_name.replace(/_/g, ' ')
                      }
                    </span>
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
    </div>
  );
};

export default AnalyticsStats;
