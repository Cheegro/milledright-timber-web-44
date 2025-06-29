
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Users, 
  Eye, 
  TrendingUp, 
  Globe, 
  Smartphone, 
  Clock,
  Activity,
  Download,
  Settings,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { getAdvancedAnalyticsStats } from '@/api/analyticsApi';

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const formatDuration = (minutes: number) => {
  if (minutes < 0) minutes = 0;
  if (minutes < 1) return '<1m';
  if (minutes < 60) return `${Math.round(minutes)}m`;
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

const UnifiedAnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState(30);
  const [activeTab, setActiveTab] = useState('overview');

  const { data: stats, isLoading, refetch } = useQuery({
    queryKey: ['unified-analytics', timeRange],
    queryFn: () => getAdvancedAnalyticsStats(timeRange),
    refetchInterval: 60000,
  });

  const timeRangeOptions = [
    { value: 7, label: 'Last 7 days' },
    { value: 30, label: 'Last 30 days' },
    { value: 90, label: 'Last 90 days' },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-sawmill-dark-brown" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-sawmill-dark-brown">Website Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights into your website performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          {timeRangeOptions.map((option) => (
            <Button
              key={option.value}
              variant={timeRange === option.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(option.value)}
              className={timeRange === option.value ? 'bg-sawmill-dark-brown hover:bg-sawmill-dark-brown/90' : ''}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{formatNumber(stats?.totalPageViews || 0)}</p>
              </div>
              <Eye className="h-8 w-8 text-sawmill-orange" />
            </div>
            <div className="mt-2">
              <Badge variant="outline" className="text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                Live
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unique Visitors</p>
                <p className="text-2xl font-bold">{formatNumber(stats?.uniqueVisitors || 0)}</p>
              </div>
              <Users className="h-8 w-8 text-sawmill-orange" />
            </div>
            <div className="mt-2">
              <Badge variant="outline" className="text-green-600">
                <Activity className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Session</p>
                <p className="text-2xl font-bold">{formatDuration(stats?.averageSessionDuration || 0)}</p>
              </div>
              <Clock className="h-8 w-8 text-sawmill-orange" />
            </div>
            <div className="mt-2">
              <Badge variant="outline">
                {stats?.bounceRate || 0}% bounce rate
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Top Country</p>
                <p className="text-2xl font-bold">
                  {stats?.topCountries?.[0]?.country || 'N/A'}
                </p>
              </div>
              <Globe className="h-8 w-8 text-sawmill-orange" />
            </div>
            <div className="mt-2">
              <Badge variant="outline">
                {stats?.topCountries?.[0]?.percentage || 0}% of traffic
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Pages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Top Pages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.topPages?.slice(0, 5).map((page, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{index + 1}.</span>
                        <span className="font-medium truncate max-w-[200px]">{page.page_path}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{formatNumber(page.views)}</span>
                    </div>
                  )) || (
                    <p className="text-center text-muted-foreground py-4">No page data available</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats?.recentActivity?.slice(0, 5).map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-sawmill-orange rounded-full"></div>
                      <div className="flex-1">
                        <span className="font-medium">{activity.type}</span>
                        <span className="text-muted-foreground ml-2">
                          {new Date(activity.created_at).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  )) || (
                    <p className="text-center text-muted-foreground py-4">No recent activity</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Hourly Traffic Pattern</h4>
                  <div className="space-y-2">
                    {stats?.hourlyStats?.slice(0, 12).map((stat, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{stat.hour}:00</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-sawmill-orange h-2 rounded-full" 
                              style={{ width: `${Math.max(5, (stat.views / Math.max(...(stats?.hourlyStats?.map(h => h.views) || [1]))) * 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-muted-foreground">{stat.views}</span>
                        </div>
                      </div>
                    )) || <p className="text-muted-foreground">No hourly data available</p>}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Peak Hours</h4>
                  <div className="space-y-2">
                    {stats?.peakHours?.map((peak, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{peak.hour}:00</span>
                        <Badge variant="outline">{peak.views} views</Badge>
                      </div>
                    )) || <p className="text-muted-foreground">No peak hour data</p>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Top Countries</h4>
                  <div className="space-y-3">
                    {stats?.topCountries?.slice(0, 5).map((country, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{country.country}</span>
                          <span>{country.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-sawmill-orange rounded-full h-2" 
                            style={{ width: `${country.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )) || <p className="text-muted-foreground">No location data available</p>}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Top Cities</h4>
                  <div className="space-y-2">
                    {stats?.topCities?.slice(0, 5).map((city, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{city.city}, {city.country}</span>
                        <Badge variant="outline">{city.count}</Badge>
                      </div>
                    )) || <p className="text-muted-foreground">No city data available</p>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technology" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Technology Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Device Types</h4>
                  <div className="space-y-3">
                    {stats?.deviceBreakdown?.map((device, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4" />
                            {device.device_type}
                          </div>
                          <span>{device.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-sawmill-orange rounded-full h-2" 
                            style={{ width: `${device.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )) || <p className="text-muted-foreground">No device data available</p>}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Browsers</h4>
                  <div className="space-y-2">
                    {stats?.browserStats?.slice(0, 5).map((browser, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{browser.browser}</span>
                        <Badge variant="outline">{browser.percentage}%</Badge>
                      </div>
                    )) || <p className="text-muted-foreground">No browser data available</p>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Behavior</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-sawmill-orange">{formatDuration(stats?.averageSessionDuration || 0)}</div>
                  <p className="text-sm text-muted-foreground">Average Session Duration</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-sawmill-orange">{stats?.bounceRate || 0}%</div>
                  <p className="text-sm text-muted-foreground">Bounce Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-sawmill-orange">{(stats?.totalPageViews || 0) / Math.max(1, stats?.uniqueVisitors || 1) | 0}</div>
                  <p className="text-sm text-muted-foreground">Pages per Session</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* No Data State */}
      {stats?.totalPageViews === 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 text-yellow-800">
              <Activity className="h-6 w-6" />
              <div>
                <h3 className="font-medium">No Analytics Data Yet</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Visit your website to start collecting analytics data. Tracking will begin automatically once users visit your site.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UnifiedAnalyticsDashboard;
