
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronUp, ChevronDown, RefreshCw, Eye, Users, MousePointer, TrendingUp, Globe, Monitor, Clock, MapPin, Smartphone, BarChart3 } from 'lucide-react';
import { getAdvancedAnalyticsStats } from '@/api/analyticsApi';
import { Skeleton } from '@/components/ui/skeleton';

const AdminAnalyticsFooter: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const { data: stats, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['advanced-analytics-footer'],
    queryFn: () => getAdvancedAnalyticsStats(30),
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  });

  const handleRefresh = () => {
    refetch();
  };

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

  const getPeakHourLabel = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  return (
    <Card className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-sawmill-orange shadow-lg">
      <div className="px-4 py-2">
        {/* Collapsed View - Always Visible */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-sawmill-orange" />
              <span className="text-sm font-medium text-sawmill-dark-brown">
                {isLoading ? (
                  <Skeleton className="h-4 w-16" />
                ) : (
                  `${stats?.totalPageViews.toLocaleString() || 0} Views`
                )}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-sawmill-orange" />
              <span className="text-sm font-medium text-sawmill-dark-brown">
                {isLoading ? (
                  <Skeleton className="h-4 w-16" />
                ) : (
                  `${stats?.uniqueVisitors || 0} Visitors`
                )}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-sawmill-orange" />
              <span className="text-sm font-medium text-sawmill-dark-brown">
                {isLoading ? (
                  <Skeleton className="h-4 w-16" />
                ) : (
                  `${stats?.topCountries.length || 0} Countries`
                )}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4 text-sawmill-orange" />
              <span className="text-sm font-medium text-sawmill-dark-brown">
                {isLoading ? (
                  <Skeleton className="h-4 w-16" />
                ) : (
                  `${Math.round((stats?.mobileVsDesktop.mobile / (stats?.totalPageViews || 1)) * 100) || 0}% Mobile`
                )}
              </span>
            </div>

            <div className="text-xs text-muted-foreground">
              Last 30 days
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefetching}
              className="h-8 w-8 p-0"
            >
              <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8 p-0"
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Expanded View - Comprehensive Analytics Dashboard */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview" className="flex items-center gap-1 text-xs">
                  <BarChart3 className="h-3 w-3" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="geography" className="flex items-center gap-1 text-xs">
                  <Globe className="h-3 w-3" />
                  Geography
                </TabsTrigger>
                <TabsTrigger value="technology" className="flex items-center gap-1 text-xs">
                  <Monitor className="h-3 w-3" />
                  Technology
                </TabsTrigger>
                <TabsTrigger value="behavior" className="flex items-center gap-1 text-xs">
                  <TrendingUp className="h-3 w-3" />
                  Behavior
                </TabsTrigger>
                <TabsTrigger value="realtime" className="flex items-center gap-1 text-xs">
                  <Clock className="h-3 w-3" />
                  Real-time
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-blue-600 font-medium">Total Views</p>
                        <p className="text-lg font-bold text-blue-800">
                          {stats?.totalPageViews.toLocaleString() || 0}
                        </p>
                      </div>
                      <Eye className="h-5 w-5 text-blue-500" />
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-green-600 font-medium">Unique Visitors</p>
                        <p className="text-lg font-bold text-green-800">{stats?.uniqueVisitors || 0}</p>
                      </div>
                      <Users className="h-5 w-5 text-green-500" />
                    </div>
                  </div>

                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-purple-600 font-medium">Avg Session</p>
                        <p className="text-lg font-bold text-purple-800">
                          {formatDuration(stats?.averageSessionDuration || 0)}
                        </p>
                      </div>
                      <Clock className="h-5 w-5 text-purple-500" />
                    </div>
                  </div>

                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-orange-600 font-medium">Bounce Rate</p>
                        <p className="text-lg font-bold text-orange-800">{stats?.bounceRate || 0}%</p>
                      </div>
                      <TrendingUp className="h-5 w-5 text-orange-500" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Geography Tab */}
              <TabsContent value="geography" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-sawmill-dark-brown mb-2">Top Countries</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {stats?.topCountries.slice(0, 5).map((country, index) => (
                        <div key={index} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span>{getCountryFlag(country.country)}</span>
                            <span className="font-medium">{country.country}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={country.percentage} className="w-12 h-2" />
                            <span className="text-sawmill-orange font-medium">{country.count}</span>
                          </div>
                        </div>
                      )) || (
                        <div className="text-xs text-gray-500">No location data yet</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-sawmill-dark-brown mb-2">Top Cities</h4>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {stats?.topCities.slice(0, 5).map((city, index) => (
                        <div key={index} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span className="font-medium">{city.city}</span>
                            <span className="text-gray-500">{city.country}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {city.count}
                          </Badge>
                        </div>
                      )) || (
                        <div className="text-xs text-gray-500">No city data yet</div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Technology Tab */}
              <TabsContent value="technology" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-sawmill-dark-brown mb-2">Device Types</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>📱 Mobile</span>
                        <div className="flex items-center gap-2">
                          <Progress value={(stats?.mobileVsDesktop.mobile / (stats?.totalPageViews || 1)) * 100} className="w-12 h-2" />
                          <span className="font-medium">{stats?.mobileVsDesktop.mobile || 0}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>💻 Desktop</span>
                        <div className="flex items-center gap-2">
                          <Progress value={(stats?.mobileVsDesktop.desktop / (stats?.totalPageViews || 1)) * 100} className="w-12 h-2" />
                          <span className="font-medium">{stats?.mobileVsDesktop.desktop || 0}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>📟 Tablet</span>
                        <div className="flex items-center gap-2">
                          <Progress value={(stats?.mobileVsDesktop.tablet / (stats?.totalPageViews || 1)) * 100} className="w-12 h-2" />
                          <span className="font-medium">{stats?.mobileVsDesktop.tablet || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-sawmill-dark-brown mb-2">Top Browsers</h4>
                    <div className="space-y-1 max-h-24 overflow-y-auto">
                      {stats?.browserStats.slice(0, 4).map((browser, index) => (
                        <div key={index} className="flex items-center justify-between text-xs">
                          <span className="font-medium">{browser.browser}</span>
                          <div className="flex items-center gap-2">
                            <Progress value={browser.percentage} className="w-8 h-2" />
                            <span className="text-sawmill-orange">{browser.count}</span>
                          </div>
                        </div>
                      )) || (
                        <div className="text-xs text-gray-500">No browser data</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-sawmill-dark-brown mb-2">Peak Hours</h4>
                    <div className="space-y-1">
                      {stats?.peakHours.map((peak, index) => (
                        <div key={index} className="flex items-center justify-between text-xs">
                          <span className="font-medium">{getPeakHourLabel(peak.hour)}</span>
                          <Badge className="bg-sawmill-orange text-white text-xs">
                            {peak.views} views
                          </Badge>
                        </div>
                      )) || (
                        <div className="text-xs text-gray-500">No peak data</div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Behavior Tab */}
              <TabsContent value="behavior" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-sawmill-dark-brown mb-2">Most Popular Pages</h4>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {stats?.topPages.slice(0, 5).map((page, index) => (
                        <div key={index} className="flex items-center justify-between text-xs">
                          <span className="font-medium truncate max-w-[120px]">
                            {page.page_path === '/' ? 'Home' : page.page_path}
                          </span>
                          <Badge className="bg-sawmill-medium-brown text-white text-xs">
                            {page.views}
                          </Badge>
                        </div>
                      )) || (
                        <div className="text-xs text-gray-500">No page data</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-sawmill-dark-brown mb-2">User Interactions</h4>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {stats?.topEvents.slice(0, 5).map((event, index) => (
                        <div key={index} className="flex items-center justify-between text-xs">
                          <span className="font-medium truncate max-w-[120px]">
                            {event.event_name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {event.count}
                          </Badge>
                        </div>
                      )) || (
                        <div className="text-xs text-gray-500">No interaction data</div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Real-time Tab */}
              <TabsContent value="realtime" className="mt-4">
                <div>
                  <h4 className="text-sm font-semibold text-sawmill-dark-brown mb-2">Recent Activity</h4>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {stats?.recentActivity.slice(0, 8).map((activity, index) => (
                      <div key={index} className="flex items-center justify-between text-xs py-1 border-b last:border-b-0">
                        <div className="flex items-center gap-2">
                          <Badge variant={activity.type === 'page_view' ? 'default' : 'secondary'} className="text-xs">
                            {activity.type === 'page_view' ? 'View' : 'Event'}
                          </Badge>
                          <span className="truncate max-w-[140px]">
                            {activity.type === 'page_view' 
                              ? `${activity.data.page_path === '/' ? 'Home' : activity.data.page_path}`
                              : activity.data.event_name.replace(/_/g, ' ')
                            }
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(activity.created_at).toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    )) || (
                      <div className="text-xs text-gray-500">No recent activity</div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {(!stats?.totalPageViews || stats.totalPageViews === 0) && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-sm text-yellow-800">
                  <strong>No analytics data found.</strong> 
                  <div className="mt-1 text-xs">
                    Analytics tracking may need to be enabled in Settings → Analytics, 
                    or visitors haven't started browsing your site yet.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default AdminAnalyticsFooter;
