import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Eye, TrendingUp, Users, Clock, RefreshCw } from 'lucide-react';
import { newAnalytics, SimplePageView, SimpleEvent } from '@/services/newAnalytics';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const NewAnalyticsDashboard = () => {
  const [pageViews, setPageViews] = useState<SimplePageView[]>([]);
  const [events, setEvents] = useState<SimpleEvent[]>([]);
  const [topPages, setTopPages] = useState<Array<{ page: string; views: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(7);

  const loadData = async () => {
    setLoading(true);
    try {
      const [pageViewsData, eventsData, topPagesData] = await Promise.all([
        newAnalytics.getPageViews(timeRange),
        newAnalytics.getEvents(timeRange),
        newAnalytics.getTopPages(timeRange)
      ]);
      
      setPageViews(pageViewsData);
      setEvents(eventsData);
      setTopPages(topPagesData);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [timeRange]);

  const getViewsByDay = () => {
    const days = Array.from({ length: timeRange }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return days.map(day => {
      const viewsCount = pageViews.filter(view => 
        view.timestamp.startsWith(day)
      ).length;
      
      return {
        date: new Date(day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        views: viewsCount
      };
    });
  };

  const getUniqueVisitors = () => {
    const uniqueSessions = new Set(pageViews.map(view => view.session_id));
    return uniqueSessions.size;
  };

  const getBounceRate = () => {
    const sessionPageCounts = pageViews.reduce((acc, view) => {
      acc[view.session_id] = (acc[view.session_id] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const singlePageSessions = Object.values(sessionPageCounts).filter(count => count === 1).length;
    const totalSessions = Object.keys(sessionPageCounts).length;
    
    return totalSessions > 0 ? Math.round((singlePageSessions / totalSessions) * 100) : 0;
  };

  const getAverageSessionDuration = () => {
    const sessionTimes = pageViews.reduce((acc, view) => {
      if (!acc[view.session_id]) {
        acc[view.session_id] = [];
      }
      acc[view.session_id].push(new Date(view.timestamp).getTime());
      return acc;
    }, {} as Record<string, number[]>);

    let totalDuration = 0;
    let sessionCount = 0;

    Object.values(sessionTimes).forEach(times => {
      if (times.length > 1) {
        times.sort((a, b) => a - b);
        const duration = times[times.length - 1] - times[0];
        totalDuration += duration;
        sessionCount++;
      }
    });

    return sessionCount > 0 ? Math.round(totalDuration / sessionCount / 1000 / 60) : 0; // minutes
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Website Analytics</h2>
        <div className="flex gap-2">
          {[7, 30, 90].map(days => (
            <Button
              key={days}
              variant={timeRange === days ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(days)}
            >
              {days} days
            </Button>
          ))}
          <Button onClick={loadData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pageViews.length}</div>
            <p className="text-xs text-muted-foreground">
              Last {timeRange} days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getUniqueVisitors()}</div>
            <p className="text-xs text-muted-foreground">
              Unique sessions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getBounceRate()}%</div>
            <p className="text-xs text-muted-foreground">
              Single page sessions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getAverageSessionDuration()}m</div>
            <p className="text-xs text-muted-foreground">
              Average minutes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Page Views Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Page Views Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getViewsByDay()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topPages.slice(0, 5)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="page" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Page Views</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {pageViews.slice(0, 10).map((view, index) => (
              <div key={index} className="flex justify-between items-center p-2 border rounded">
                <div>
                  <span className="font-medium">{view.page}</span>
                  {view.referrer && (
                    <span className="text-sm text-muted-foreground ml-2">
                      from {new URL(view.referrer).hostname}
                    </span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(view.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewAnalyticsDashboard;