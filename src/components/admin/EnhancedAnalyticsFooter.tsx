import React, { useState, useEffect } from 'react';
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
  Activity
} from 'lucide-react';

interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: string;
  topPages: { page: string; views: number }[];
  deviceBreakdown: { device: string; percentage: number }[];
  trafficSources: { source: string; percentage: number }[];
  hourlyViews: { hour: number; views: number }[];
  dailyViews: { date: string; views: number }[];
  weeklyViews: { week: string; views: number }[];
  monthlyViews: { month: string; views: number }[];
}

// Helper function to format numbers
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const EnhancedAnalyticsFooter = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [activeTab, setActiveTab] = useState('daily');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch analytics data
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll use mock data
        setTimeout(() => {
          const mockData: AnalyticsData = {
            totalViews: 128547,
            uniqueVisitors: 45289,
            bounceRate: 42.3,
            avgSessionDuration: '2m 37s',
            topPages: [
              { page: '/products', views: 32456 },
              { page: '/blog/woodworking-tips', views: 18932 },
              { page: '/contact', views: 12543 },
              { page: '/about', views: 9876 },
              { page: '/gallery', views: 7654 }
            ],
            deviceBreakdown: [
              { device: 'Mobile', percentage: 58 },
              { device: 'Desktop', percentage: 34 },
              { device: 'Tablet', percentage: 8 }
            ],
            trafficSources: [
              { source: 'Organic Search', percentage: 45 },
              { source: 'Direct', percentage: 30 },
              { source: 'Social', percentage: 15 },
              { source: 'Referral', percentage: 10 }
            ],
            hourlyViews: Array.from({ length: 24 }, (_, i) => ({
              hour: i,
              views: Math.floor(Math.random() * 500) + 100
            })),
            dailyViews: Array.from({ length: 30 }, (_, i) => ({
              date: `${i + 1}/5`,
              views: Math.floor(Math.random() * 2000) + 500
            })),
            weeklyViews: Array.from({ length: 12 }, (_, i) => ({
              week: `W${i + 1}`,
              views: Math.floor(Math.random() * 10000) + 5000
            })),
            monthlyViews: Array.from({ length: 12 }, (_, i) => ({
              month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
              views: Math.floor(Math.random() * 50000) + 20000
            }))
          };
          setAnalytics(mockData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const renderHourlyChart = () => {
    if (!analytics?.hourlyViews?.length) return null;

    const maxViews = Math.max(...analytics.hourlyViews.map(item => item.views));
    
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
          {analytics.hourlyViews.map((item, index) => (
            <div
              key={index}
              className="flex-1 bg-primary/20 rounded-t flex flex-col justify-end relative group"
              style={{ height: `${(item.views / maxViews) * 100}%` }}
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

  const renderTimeSeriesChart = () => {
    if (!analytics) return null;

    let data;
    let labelKey;
    let valueKey;

    switch (activeTab) {
      case 'daily':
        data = analytics.dailyViews;
        labelKey = 'date';
        valueKey = 'views';
        break;
      case 'weekly':
        data = analytics.weeklyViews;
        labelKey = 'week';
        valueKey = 'views';
        break;
      case 'monthly':
        data = analytics.monthlyViews;
        labelKey = 'month';
        valueKey = 'views';
        break;
      default:
        data = analytics.dailyViews;
        labelKey = 'date';
        valueKey = 'views';
    }

    const maxValue = Math.max(...data.map(item => item[valueKey]));

    return (
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          {data.filter((_, i) => i % Math.ceil(data.length / 5) === 0).map((item, index) => (
            <span key={index}>{item[labelKey]}</span>
          ))}
        </div>
        <div className="flex items-end space-x-1 h-32">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex-1 bg-primary/20 rounded-t flex flex-col justify-end relative group"
              style={{ height: `${(item[valueKey] / maxValue) * 100}%` }}
            >
              <div className="bg-primary rounded-t h-full min-h-[2px]"></div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg border">
                {item[labelKey]}: {formatNumber(item[valueKey])} views
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDeviceChart = () => {
    if (!analytics?.deviceBreakdown?.length) return null;

    return (
      <div className="space-y-4">
        {analytics.deviceBreakdown.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                {item.device === 'Mobile' && <Smartphone className="h-4 w-4 mr-2" />}
                {item.device === 'Desktop' && <Monitor className="h-4 w-4 mr-2" />}
                {item.device === 'Tablet' && <Globe className="h-4 w-4 mr-2" />}
                {item.device}
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

  const renderTrafficSourcesChart = () => {
    if (!analytics?.trafficSources?.length) return null;

    const colors = ['bg-primary', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];

    return (
      <div className="space-y-4">
        {analytics.trafficSources.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{item.source}</span>
              <span>{item.percentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`${colors[index % colors.length]} rounded-full h-2`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="p-4 border rounded-lg bg-card animate-pulse">
        <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="h-24 bg-muted rounded"></div>
          <div className="h-24 bg-muted rounded"></div>
          <div className="h-24 bg-muted rounded"></div>
          <div className="h-24 bg-muted rounded"></div>
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
        <h2 className="text-2xl font-bold">Analytics Overview</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
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
              <h3 className="text-2xl font-bold">{formatNumber(analytics.totalViews)}</h3>
              <Badge variant="outline" className="flex items-center gap-1 text-green-500">
                <TrendingUp className="h-3 w-3" />
                12.5%
              </Badge>
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
              <Badge variant="outline" className="flex items-center gap-1 text-green-500">
                <TrendingUp className="h-3 w-3" />
                8.2%
              </Badge>
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
              <Badge variant="outline" className="flex items-center gap-1 text-red-500">
                <TrendingUp className="h-3 w-3" />
                2.1%
              </Badge>
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
              <h3 className="text-2xl font-bold">{analytics.avgSessionDuration}</h3>
              <Badge variant="outline" className="flex items-center gap-1 text-green-500">
                <TrendingUp className="h-3 w-3" />
                5.3%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Traffic Overview</CardTitle>
              <div className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="daily" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
              <TabsContent value="daily" className="mt-0">
                {renderTimeSeriesChart()}
              </TabsContent>
              <TabsContent value="weekly" className="mt-0">
                {renderTimeSeriesChart()}
              </TabsContent>
              <TabsContent value="monthly" className="mt-0">
                {renderTimeSeriesChart()}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Hourly Traffic</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {renderHourlyChart()}
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
            <div className="space-y-4">
              {analytics.topPages.map((page, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-2">{index + 1}.</span>
                    <span className="text-sm font-medium truncate max-w-[150px]">{page.page}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{formatNumber(page.views)}</span>
                </div>
              ))}
            </div>
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
              <CardTitle className="text-lg font-medium">Traffic Sources</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {renderTrafficSourcesChart()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedAnalyticsFooter;
