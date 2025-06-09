
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Loader2, Eye, MousePointer, Users, TrendingUp, Globe, Monitor, Clock, MapPin } from 'lucide-react';
import { getAdvancedAnalyticsStats } from '@/api/analyticsApi';
import { format } from 'date-fns';

const AnalyticsStats = () => {
  const [timeRange, setTimeRange] = useState(30);

  const { data: stats, isLoading, refetch } = useQuery({
    queryKey: ['advanced-analytics-stats', timeRange],
    queryFn: () => getAdvancedAnalyticsStats(timeRange),
    refetchInterval: 60000, // Refresh every minute
  });

  const timeRangeOptions = [
    { value: 7, label: 'Last 7 days' },
    { value: 30, label: 'Last 30 days' },
    { value: 90, label: 'Last 90 days' },
  ];

  const getCountryFlag = (country: string) => {
    const flagMap: Record<string, string> = {
      'United States': '🇺🇸', 'Canada': '🇨🇦', 'United Kingdom': '🇬🇧',
      'Germany': '🇩🇪', 'France': '🇫🇷', 'Australia': '🇦🇺',
      'Japan': '🇯🇵', 'China': '🇨🇳', 'India': '🇮🇳', 'Brazil': '🇧🇷'
    };
    return flagMap[country] || '🌍';
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

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
        <h2 className="text-2xl font-bold text-sawmill-dark-brown">Advanced Website Analytics</h2>
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

      {/* Enhanced Overview Stats */}
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
              {stats?.topCountries.length || 0}
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
              {Math.round((stats?.mobileVsDesktop.mobile / (stats?.totalPageViews || 1)) * 100) || 0}%
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Geographic Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="h-5 w-5 text-sawmill-orange" />
              Geographic Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold mb-2">Top Countries</h4>
                {stats?.topCountries && stats.topCountries.length > 0 ? (
                  stats.topCountries.slice(0, 5).map((country, index) => (
                    <div key={index} className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getCountryFlag(country.country)}</span>
                        <span className="text-sm font-medium">{country.country}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={country.percentage} className="w-16 h-2" />
                        <Badge className="bg-sawmill-orange text-white text-xs">
                          {country.count}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">No location data recorded yet.</p>
                )}
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-2">Top Cities</h4>
                {stats?.topCities && stats.topCities.length > 0 ? (
                  stats.topCities.slice(0, 3).map((city, index) => (
                    <div key={index} className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{city.city}, {city.country}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {city.count}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">No city data recorded yet.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Monitor className="h-5 w-5 text-sawmill-orange" />
              Technology Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-2">Device Types</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">📱 Mobile</span>
                    <div className="flex items-center gap-2">
                      <Progress value={(stats?.mobileVsDesktop.mobile / (stats?.totalPageViews || 1)) * 100} className="w-16 h-2" />
                      <span className="text-sm font-medium">{stats?.mobileVsDesktop.mobile || 0}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">💻 Desktop</span>
                    <div className="flex items-center gap-2">
                      <Progress value={(stats?.mobileVsDesktop.desktop / (stats?.totalPageViews || 1)) * 100} className="w-16 h-2" />
                      <span className="text-sm font-medium">{stats?.mobileVsDesktop.desktop || 0}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">📟 Tablet</span>
                    <div className="flex items-center gap-2">
                      <Progress value={(stats?.mobileVsDesktop.tablet / (stats?.totalPageViews || 1)) * 100} className="w-16 h-2" />
                      <span className="text-sm font-medium">{stats?.mobileVsDesktop.tablet || 0}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Top Browsers</h4>
                {stats?.browserStats && stats.browserStats.length > 0 ? (
                  stats.browserStats.slice(0, 4).map((browser, index) => (
                    <div key={index} className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{browser.browser}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={browser.percentage} className="w-12 h-2" />
                        <Badge className="bg-sawmill-medium-brown text-white text-xs">
                          {browser.count}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">No browser data recorded yet.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Behavior Analytics */}
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
                      <span className="text-sm font-medium truncate max-w-[120px]">
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
                      <span className="text-sm font-medium truncate max-w-[120px]">
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
      </div>

      {/* Recent Activity */}
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
                    <Badge variant={activity.type === 'page_view' ? 'default' : 'secondary'}>
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
                        from {activity.data.country}
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
    </div>
  );
};

export default AnalyticsStats;
