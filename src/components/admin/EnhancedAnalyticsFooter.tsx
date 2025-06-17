
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer, 
  Smartphone, 
  Monitor, 
  Globe, 
  Clock,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Loader2
} from 'lucide-react';
import { getAdvancedAnalyticsStats } from '@/api/analyticsApi';

// Helper function to format numbers
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

const EnhancedAnalyticsFooter = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [timeRange, setTimeRange] = useState(30);

  // Fetch real analytics data
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['enhanced-analytics-footer', timeRange],
    queryFn: () => getAdvancedAnalyticsStats(timeRange),
    refetchInterval: 60000,
  });

  const renderHourlyChart = () => {
    if (!analytics?.hourlyStats?.length) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          No hourly data available yet
        </div>
      );
    }

    const maxViews = Math.max(...analytics.hourlyStats.map(item => item.views));
    
    return (
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>0</span>
          <span>6</span>
          <span>12</span>
          <span>18</span>
          <span>24</span>
        </div>
        <div className="flex items-end space-x-1 h-32">
          {analytics.hourlyStats.map((item, index) => (
            <div
              key={index}
              className="flex-1 bg-primary/20 rounded-t flex flex-col justify-end relative group"
              style={{ height: maxViews > 0 ? `${(item.views / maxViews) * 100}%` : '2px' }}
            >
              <div className="bg-primary rounded-t h-full min-h-[2px]"></div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg border">
                {item.hour}:00 - {item.views} views
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDeviceChart = () => {
    if (!analytics?.deviceBreakdown?.length) {
      return (
        <div className="text-center py-4 text-muted-foreground">
          No device data available yet
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {analytics.deviceBreakdown.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                {item.device_type === 'Mobile' && <Smartphone className="h-4 w-4 mr-2" />}
                {item.device_type === 'Desktop' && <Monitor className="h-4 w-4 mr-2" />}
                {item.device_type === 'Tablet' && <Globe className="h-4 w-4 mr-2" />}
                {item.device_type}
              </div>
              <span>{item.percentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary rounded-full h-2" 
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTopPagesChart = () => {
    if (!analytics?.topPages?.length) {
      return (
        <div className="text-center py-4 text-muted-foreground">
          No page data available yet
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {analytics.topPages.slice(0, 5).map((page, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-muted-foreground mr-2">{index + 1}.</span>
              <span className="text-sm font-medium truncate max-w-[150px]">{page.page_path}</span>
            </div>
            <span className="text-sm text-muted-foreground">{formatNumber(page.views)}</span>
          </div>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="p-4 border rounded-lg bg-card animate-pulse">
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-sawmill-dark-brown" />
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="p-4 border rounded-lg bg-card">
        <p className="text-center text-muted-foreground">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold">Real Website Analytics</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          <Button 
            variant={timeRange === 30 ? 'default' : 'outline'} 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => setTimeRange(30)}
          >
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Total Views</p>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-2xl font-bold">{formatNumber(analytics.totalPageViews)}</h3>
              {analytics.totalPageViews > 0 && (
                <Badge variant="outline" className="flex items-center gap-1 text-green-500">
                  <TrendingUp className="h-3 w-3" />
                  Live
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Unique Visitors</p>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-2xl font-bold">{formatNumber(analytics.uniqueVisitors)}</h3>
              {analytics.uniqueVisitors > 0 && (
                <Badge variant="outline" className="flex items-center gap-1 text-green-500">
                  <TrendingUp className="h-3 w-3" />
                  Live
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Bounce Rate</p>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-2xl font-bold">{analytics.bounceRate}%</h3>
              {analytics.bounceRate > 0 && (
                <Badge variant="outline" className="flex items-center gap-1 text-blue-500">
                  <Activity className="h-3 w-3" />
                  Live
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Avg. Session</p>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-2xl font-bold">{formatDuration(analytics.averageSessionDuration)}</h3>
              {analytics.averageSessionDuration > 0 && (
                <Badge variant="outline" className="flex items-center gap-1 text-green-500">
                  <TrendingUp className="h-3 w-3" />
                  Live
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Hourly Traffic Pattern</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {renderHourlyChart()}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Peak Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {analytics.peakHours && analytics.peakHours.length > 0 ? (
              <div className="space-y-3">
                {analytics.peakHours.map((peak, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{peak.hour}:00 - {peak.hour + 1}:00</span>
                    <span className="text-sm text-muted-foreground">{peak.views} views</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No peak hour data available yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Top Pages</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {renderTopPagesChart()}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Device Breakdown</CardTitle>
              <Smartphone className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {renderDeviceChart()}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Geographic Distribution</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {analytics.topCountries && analytics.topCountries.length > 0 ? (
              <div className="space-y-4">
                {analytics.topCountries.slice(0, 5).map((country, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{country.country}</span>
                      <span>{country.percentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2" 
                        style={{ width: `${country.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No location data available yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {analytics.totalPageViews === 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-yellow-800">
              <Activity className="h-5 w-5" />
              <p className="font-medium">No Analytics Data Yet</p>
            </div>
            <p className="text-sm text-yellow-700 mt-2">
              Visit your website pages to start collecting real analytics data. The tracking should begin automatically once users visit your site.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedAnalyticsFooter;
