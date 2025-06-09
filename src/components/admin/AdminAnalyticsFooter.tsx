
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, RefreshCw, Eye, Users, MousePointer, TrendingUp } from 'lucide-react';
import { getAnalyticsStats } from '@/api/analyticsApi';
import { Skeleton } from '@/components/ui/skeleton';

const AdminAnalyticsFooter: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: stats, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['admin-analytics-footer'],
    queryFn: () => getAnalyticsStats(30),
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  });

  const handleRefresh = () => {
    refetch();
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
                  `${stats?.totalPageViews || 0} Views`
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
              <MousePointer className="h-4 w-4 text-sawmill-orange" />
              <span className="text-sm font-medium text-sawmill-dark-brown">
                {isLoading ? (
                  <Skeleton className="h-4 w-16" />
                ) : (
                  `${stats?.topEvents.reduce((sum, event) => sum + event.count, 0) || 0} Events`
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

        {/* Expanded View - Detailed Stats */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Top Pages */}
              <div>
                <h4 className="text-sm font-semibold text-sawmill-dark-brown mb-2 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1 text-sawmill-orange" />
                  Top Pages
                </h4>
                <div className="space-y-1">
                  {isLoading ? (
                    <>
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </>
                  ) : stats?.topPages.length ? (
                    stats.topPages.slice(0, 3).map((page, index) => (
                      <div key={index} className="flex justify-between text-xs">
                        <span className="text-gray-600 truncate max-w-[120px]">
                          {page.page_path === '/' ? 'Home' : page.page_path}
                        </span>
                        <span className="text-sawmill-orange font-medium">{page.views}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-gray-500">No data yet</div>
                  )}
                </div>
              </div>

              {/* Top Events */}
              <div>
                <h4 className="text-sm font-semibold text-sawmill-dark-brown mb-2 flex items-center">
                  <MousePointer className="h-4 w-4 mr-1 text-sawmill-orange" />
                  Top Events
                </h4>
                <div className="space-y-1">
                  {isLoading ? (
                    <>
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </>
                  ) : stats?.topEvents.length ? (
                    stats.topEvents.slice(0, 3).map((event, index) => (
                      <div key={index} className="flex justify-between text-xs">
                        <span className="text-gray-600 truncate max-w-[120px]">
                          {event.event_name.replace('_', ' ')}
                        </span>
                        <span className="text-sawmill-orange font-medium">{event.count}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-gray-500">No events yet</div>
                  )}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h4 className="text-sm font-semibold text-sawmill-dark-brown mb-2 flex items-center">
                  <Eye className="h-4 w-4 mr-1 text-sawmill-orange" />
                  Recent Activity
                </h4>
                <div className="space-y-1">
                  {isLoading ? (
                    <>
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </>
                  ) : stats?.recentActivity.length ? (
                    stats.recentActivity.slice(0, 3).map((activity, index) => (
                      <div key={index} className="text-xs text-gray-600">
                        <span className="capitalize">{activity.type.replace('_', ' ')}</span>
                        {activity.type === 'page_view' && activity.data.page_path && (
                          <span className="text-sawmill-orange ml-1">
                            {activity.data.page_path === '/' ? 'Home' : activity.data.page_path}
                          </span>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-gray-500">No activity yet</div>
                  )}
                </div>
              </div>
            </div>

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
