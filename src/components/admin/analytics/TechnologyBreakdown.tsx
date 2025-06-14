
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Monitor } from 'lucide-react';
import type { AdvancedAnalyticsStats } from '@/api/analyticsApi';

interface TechnologyBreakdownProps {
  stats: AdvancedAnalyticsStats | undefined;
}

const TechnologyBreakdown: React.FC<TechnologyBreakdownProps> = ({ stats }) => {
  const mobilePercentage = (stats?.mobileVsDesktop.mobile / (stats?.totalPageViews || 1)) * 100;
  const desktopPercentage = (stats?.mobileVsDesktop.desktop / (stats?.totalPageViews || 1)) * 100;
  const tabletPercentage = (stats?.mobileVsDesktop.tablet / (stats?.totalPageViews || 1)) * 100;

  return (
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
                  <Progress value={mobilePercentage || 0} className="w-16 h-2" />
                  <span className="text-sm font-medium">{stats?.mobileVsDesktop.mobile || 0}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">💻 Desktop</span>
                <div className="flex items-center gap-2">
                  <Progress value={desktopPercentage || 0} className="w-16 h-2" />
                  <span className="text-sm font-medium">{stats?.mobileVsDesktop.desktop || 0}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">📟 Tablet</span>
                <div className="flex items-center gap-2">
                  <Progress value={tabletPercentage || 0} className="w-16 h-2" />
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
  );
};

export default TechnologyBreakdown;
