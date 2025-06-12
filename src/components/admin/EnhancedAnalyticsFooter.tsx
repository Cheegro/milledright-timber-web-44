
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronUp, ChevronDown, RefreshCw, Eye, Users, Globe, Monitor, Clock, MapPin, Smartphone, BarChart3, TrendingUp, Activity } from 'lucide-react';
import { getAdvancedAnalyticsStats } from '@/api/analyticsApi';

const EnhancedAnalyticsFooter: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const { data: stats, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['enhanced-analytics-footer'],
    queryFn: () => getAdvancedAnalyticsStats(30),
    refetchInterval: 30000,
  });

  // Helper functions with clean data formatting
  const getCountryFlag = (country: string) => {
    const flagMap: Record<string, string> = {
      'United States': '🇺🇸', 'Canada': '🇨🇦', 'United Kingdom': '🇬🇧',
      'Germany': '🇩🇪', 'France': '🇫🇷', 'Australia': '🇦🇺',
      'Japan': '🇯🇵', 'China': '🇨🇳', 'India': '🇮🇳', 'Brazil': '🇧🇷',
      'Netherlands': '🇳🇱', 'Sweden': '🇸🇪', 'Norway': '🇳🇴', 'Italy': '🇮🇹'
    };
    return flagMap[country] || '🌍';
  };

  const getPeakHourLabel = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getMobilePercentage = () => {
    if (!stats?.totalPageViews || !stats?.mobileVsDesktop) return 0;
    return Math.round((stats.mobileVsDesktop.mobile / stats.totalPageViews) * 100);
  };

  const getTrendIcon = (value: number, threshold: number = 0) => {
    return value > threshold ? 
      <TrendingUp className="h-3 w-3 text-green-500" /> : 
      <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />;
  };

  // Count active users (exclude admin sessions)
  const getActiveUsersCount = () => {
    if (!stats?.recentActivity) return 0;
    // Count unique sessions from last 5 minutes, excluding admin IPs
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recentSessions = new Set();
    
    stats.recentActivity.forEach(activity => {
      if (new Date(activity.created_at) > fiveMinutesAgo) {
        // Only count if not from admin IP (basic check)
        if (!activity.data.user_agent?.includes('admin') && activity.data.session_id) {
          recentSessions.add(activity.data.session_id);
        }
      }
    });
    
    return recentSessions.size;
  };

  // Real data validation - no placeholders
  const hasRealData = stats && stats.totalPageViews > 0;
  const activeUsersCount = getActiveUsersCount();

  return (
    <Card className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-sawmill-orange shadow-lg">
      <div className="px-6 py-3">
        {/* Compact View - Real Data Only */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-sawmill-orange" />
              <span className="text-sm font-medium text-sawmill-dark-brown">
                {isLoading ? '...' : `${stats?.totalPageViews?.toLocaleString() || 0} views`}
              </span>
              {hasRealData && getTrendIcon(stats.totalPageViews, 0)}
            </div>

            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-sawmill-orange" />
              <span className="text-sm font-medium text-sawmill-dark-brown">
                {isLoading ? '...' : `${stats?.uniqueVisitors || 0} visitors`}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-sawmill-orange" />
              <span className="text-sm font-medium text-sawmill-dark-brown">
                {isLoading ? '...' : (
                  hasRealData && stats.topCountries?.length ? 
                    `${getCountryFlag(stats.topCountries[0].country)} ${stats.topCountries[0].country} (${Math.round(stats.topCountries[0].percentage)}%)` :
                    '🌍 No data'
                )}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4 text-sawmill-orange" />
              <span className="text-sm font-medium text-sawmill-dark-brown">
                {isLoading ? '...' : `${getMobilePercentage()}% mobile`}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-sawmill-orange" />
              <span className="text-sm font-medium text-sawmill-dark-brown">
                {isLoading ? '...' : (
                  hasRealData && stats.peakHours?.length ? 
                    `Peak: ${getPeakHourLabel(stats.peakHours[0].hour)}` : 
                    'No peak data'
                )}
              </span>
            </div>

            {/* Active Users - Real Count Only */}
            <div className="flex items-center space-x-2">
              <Activity className={`h-4 w-4 ${activeUsersCount > 0 ? 'text-green-500' : 'text-gray-400'}`} />
              <span className="text-sm font-medium text-sawmill-dark-brown">
                {activeUsersCount > 0 ? `${activeUsersCount} active` : 'No active users'}
              </span>
            </div>

            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Activity className="h-3 w-3" />
              Last 30 days
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => refetch()}
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

        {/* Expanded Analytics Dashboard - Real Data Only */}
        {isExpanded && (
          <div className="mt-6 pt-4 border-t border-gray-200">
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

              {/* Overview Tab - Real Metrics Only */}
              <TabsContent value="overview" className="mt-4">
                {hasRealData ? (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-blue-600 font-medium">Total Views</p>
                          <p className="text-xl font-bold text-blue-800">
                            {stats.totalPageViews.toLocaleString()}
                          </p>
                          <p className="text-xs text-blue-600">Real traffic</p>
                        </div>
                        <Eye className="h-6 w-6 text-blue-500" />
                      </div>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-green-600 font-medium">Visitors</p>
                          <p className="text-xl font-bold text-green-800">{stats.uniqueVisitors}</p>
                          <p className="text-xs text-green-600">Unique users</p>
                        </div>
                        <Users className="h-6 w-6 text-green-500" />
                      </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-purple-600 font-medium">Avg Session</p>
                          <p className="text-xl font-bold text-purple-800">
                            {formatDuration(Math.round(stats.averageSessionDuration || 0))}
                          </p>
                          <p className="text-xs text-purple-600">Engagement</p>
                        </div>
                        <Clock className="h-6 w-6 text-purple-500" />
                      </div>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-orange-600 font-medium">Bounce Rate</p>
                          <p className="text-xl font-bold text-orange-800">{Math.round(stats.bounceRate || 0)}%</p>
                          <p className="text-xs text-orange-600">
                            {(stats.bounceRate || 0) < 60 ? 'Excellent' : 'Good'}
                          </p>
                        </div>
                        <TrendingUp className="h-6 w-6 text-orange-500" />
                      </div>
                    </div>

                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-indigo-600 font-medium">Countries</p>
                          <p className="text-xl font-bold text-indigo-800">{stats.topCountries?.length || 0}</p>
                          <p className="text-xs text-indigo-600">Global reach</p>
                        </div>
                        <Globe className="h-6 w-6 text-indigo-500" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Activity className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium">No Analytics Data Yet</p>
                    <p className="text-sm">Real visitor data will appear here once traffic starts</p>
                  </div>
                )}
              </TabsContent>

              {/* Geography Tab - Real Data Only */}
              <TabsContent value="geography" className="mt-4">
                {hasRealData && stats.topCountries?.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-sawmill-dark-brown mb-3 flex items-center gap-2">
                        <Globe className="h-4 w-4 text-sawmill-orange" />
                        Geographic Distribution
                      </h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {stats.topCountries.slice(0, 8).map((country, index) => (
                          <div key={index} className="flex items-center justify-between text-sm py-1">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{getCountryFlag(country.country)}</span>
                              <span className="font-medium">{country.country}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Progress value={Math.round(country.percentage)} className="w-16 h-2" />
                              <span className="text-sawmill-orange font-medium text-xs min-w-[2rem]">
                                {Math.round(country.percentage)}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-sawmill-dark-brown mb-3 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-sawmill-orange" />
                        Top Cities
                      </h4>
                      <div className="space-y-1 max-h-40 overflow-y-auto">
                        {stats.topCities?.slice(0, 8).map((city, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3 w-3 text-gray-400" />
                              <span className="font-medium">{city.city}</span>
                              <span className="text-gray-500 text-xs">{city.country}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {city.count}
                            </Badge>
                          </div>
                        )) || (
                          <div className="text-xs text-gray-500">No city data available</div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium">No Geographic Data</p>
                    <p className="text-sm">Location data will appear as visitors browse your site</p>
                  </div>
                )}
              </TabsContent>

              {/* Technology Tab - Real Data Only */}
              <TabsContent value="technology" className="mt-4">
                {hasRealData ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-sawmill-dark-brown mb-3">Device Types</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>📱 Mobile</span>
                          <div className="flex items-center gap-2">
                            <Progress value={getMobilePercentage()} className="w-16 h-2" />
                            <span className="font-medium min-w-[2rem]">{stats.mobileVsDesktop?.mobile || 0}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>💻 Desktop</span>
                          <div className="flex items-center gap-2">
                            <Progress value={Math.round((stats.mobileVsDesktop?.desktop || 0) / (stats.totalPageViews || 1) * 100)} className="w-16 h-2" />
                            <span className="font-medium min-w-[2rem]">{stats.mobileVsDesktop?.desktop || 0}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>📟 Tablet</span>
                          <div className="flex items-center gap-2">
                            <Progress value={Math.round((stats.mobileVsDesktop?.tablet || 0) / (stats.totalPageViews || 1) * 100)} className="w-16 h-2" />
                            <span className="font-medium min-w-[2rem]">{stats.mobileVsDesktop?.tablet || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-sawmill-dark-brown mb-3">Browsers</h4>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {stats.browserStats?.slice(0, 6).map((browser, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="font-medium">{browser.browser}</span>
                            <div className="flex items-center gap-2">
                              <Progress value={Math.round(browser.percentage)} className="w-12 h-2" />
                              <span className="text-sawmill-orange text-xs min-w-[2rem]">{browser.count}</span>
                            </div>
                          </div>
                        )) || (
                          <div className="text-xs text-gray-500">No browser data</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-sawmill-dark-brown mb-3">Peak Hours</h4>
                      <div className="space-y-1">
                        {stats.peakHours?.slice(0, 5).map((peak, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="font-medium">{getPeakHourLabel(peak.hour)}</span>
                            <Badge className="bg-sawmill-orange text-white text-xs">
                              {peak.count}
                            </Badge>
                          </div>
                        )) || (
                          <div className="text-xs text-gray-500">No peak data</div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Monitor className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium">No Technology Data</p>
                    <p className="text-sm">Device and browser data will appear with real traffic</p>
                  </div>
                )}
              </TabsContent>

              {/* Behavior Tab - Real Data Only */}
              <TabsContent value="behavior" className="mt-4">
                {hasRealData ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-sawmill-dark-brown mb-3">Popular Content</h4>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {stats.topPages?.slice(0, 6).map((page, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="font-medium truncate max-w-[120px]">
                              {page.page_path === '/' ? '🏠 Home' : 
                               page.page_path.includes('products') ? '🪵 ' + page.page_path.split('/').pop() :
                               page.page_path}
                            </span>
                            <Badge className="bg-sawmill-orange text-white text-xs">
                              {page.views}
                            </Badge>
                          </div>
                        )) || (
                          <div className="text-xs text-gray-500">No page data</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-sawmill-dark-brown mb-3">User Interactions</h4>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {stats.topEvents?.slice(0, 6).map((event, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="font-medium truncate max-w-[120px]">
                              {event.event_name === 'page_view' ? '👁️ Page Views' :
                               event.event_name === 'button_click' ? '🔘 Button Clicks' :
                               event.event_name === 'phone_click' ? '📞 Phone Clicks' :
                               event.event_name === 'email_click' ? '✉️ Email Clicks' :
                               event.event_name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                            <Badge className="bg-sawmill-medium-brown text-white text-xs">
                              {event.count}
                            </Badge>
                          </div>
                        )) || (
                          <div className="text-xs text-gray-500">No interaction data</div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium">No Behavior Data</p>
                    <p className="text-sm">User behavior insights will appear with site activity</p>
                  </div>
                )}
              </TabsContent>

              {/* Real-time Activity */}
              <TabsContent value="realtime" className="mt-4">
                {hasRealData && stats.recentActivity?.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-sawmill-dark-brown mb-3 flex items-center gap-2">
                        <Activity className="h-4 w-4 text-green-500" />
                        Live Activity (Non-Admin)
                      </h4>
                      <div className="space-y-1 max-h-40 overflow-y-auto">
                        {stats.recentActivity
                          .filter(activity => !activity.data.user_agent?.includes('admin'))
                          .slice(0, 10)
                          .map((activity, index) => (
                          <div key={index} className="flex items-center justify-between text-xs py-1 border-b last:border-b-0">
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant={activity.type === 'page_view' ? 'default' : 'secondary'} 
                                className="text-xs px-1 py-0"
                              >
                                {activity.type === 'page_view' ? '👁️' : '⚡'}
                              </Badge>
                              <span className="truncate max-w-[140px]">
                                {activity.type === 'page_view' 
                                  ? `${activity.data.page_path === '/' ? 'Home' : activity.data.page_path}`
                                  : activity.data.event_name?.replace(/_/g, ' ')
                                }
                              </span>
                              {activity.data.country && (
                                <span className="text-xs">
                                  {getCountryFlag(activity.data.country)}
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(activity.created_at).toLocaleTimeString('en-US', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                          </div>
                        ))}
                        {stats.recentActivity.filter(activity => !activity.data.user_agent?.includes('admin')).length === 0 && (
                          <div className="text-xs text-gray-500">No recent non-admin activity</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-sawmill-dark-brown mb-3">Current Status</h4>
                      <div className="space-y-3">
                        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-green-800">Active Now</span>
                            <Badge className={`${activeUsersCount > 0 ? 'bg-green-500' : 'bg-gray-400'} text-white`}>
                              {activeUsersCount} visitor{activeUsersCount !== 1 ? 's' : ''}
                            </Badge>
                          </div>
                          <p className="text-xs text-green-600 mt-1">
                            {activeUsersCount > 0 ? 'Currently browsing your site' : 'No active visitors'}
                          </p>
                        </div>
                        
                        {hasRealData && (
                          <>
                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-blue-800">Total Traffic</span>
                                <Badge className="bg-blue-500 text-white">
                                  {stats.totalPageViews} views
                                </Badge>
                              </div>
                              <p className="text-xs text-blue-600 mt-1">From {stats.uniqueVisitors} unique visitors</p>
                            </div>

                            <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-purple-800">Engagement</span>
                                <Badge className="bg-purple-500 text-white">
                                  {Math.round(stats.averageSessionDuration || 0)}m avg
                                </Badge>
                              </div>
                              <p className="text-xs text-purple-600 mt-1">
                                {Math.round(stats.bounceRate || 0)}% bounce rate
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium">No Real-time Activity</p>
                    <p className="text-sm">Live visitor activity will appear here</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {!hasRealData && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm text-blue-800">
                  <strong>🚀 Analytics System Active!</strong> 
                  <div className="mt-1 text-xs">
                    Your enhanced analytics with admin exclusion is running. 
                    Real visitor data will appear here as people browse your site.
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

export default EnhancedAnalyticsFooter;
