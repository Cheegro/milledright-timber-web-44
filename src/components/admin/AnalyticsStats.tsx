
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { getAdvancedAnalyticsStats } from '@/api/analyticsApi';

// Import new sub-components
import OverviewStats from './analytics/OverviewStats';
import GeographicDistribution from './analytics/GeographicDistribution';
import TechnologyBreakdown from './analytics/TechnologyBreakdown';
import UserBehavior from './analytics/UserBehavior';
import RecentActivity from './analytics/RecentActivity';

const AnalyticsStats = () => {
  const [timeRange, setTimeRange] = useState(30);

  const { data: stats, isLoading } = useQuery({
    queryKey: ['advanced-analytics-stats', timeRange],
    queryFn: () => getAdvancedAnalyticsStats(timeRange),
    refetchInterval: 60000, 
  });

  const timeRangeOptions = [
    { value: 7, label: 'Last 7 days' },
    { value: 30, label: 'Last 30 days' },
    { value: 90, label: 'Last 90 days' },
  ];

  const getCountryFlag = (country: string) => {
    // This specific mapping also exists in RecentActivity.tsx for now
    // Consider moving to a shared utility if this grows or is needed in more places
    const flagMap: Record<string, string> = {
      'United States': '🇺🇸', 'US': '🇺🇸', 
      'Canada': '🇨🇦', 'CA': '🇨🇦',
      'United Kingdom': '🇬🇧', 'GB': '🇬🇧',
      'Germany': '🇩🇪', 'DE': '🇩🇪',
      'France': '🇫🇷', 'FR': '🇫🇷',
      'Australia': '🇦🇺', 'AU': '🇦🇺',
      'Japan': '🇯🇵', 'JP': '🇯🇵',
      'China': '🇨🇳', 'CN': '🇨🇳',
      'India': '🇮🇳', 'IN': '🇮🇳',
      'Brazil': '🇧🇷', 'BR': '🇧🇷'
    };
    return flagMap[country] || '🌍';
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 0) minutes = 0;
    if (minutes < 1) return '<1m'; // Display <1m for very short durations
    if (minutes < 60) return `${Math.round(minutes)}m`;
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    if (mins === 0) return `${hours}h`;
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
              className={timeRange === option.value ? 'bg-sawmill-dark-brown hover:bg-sawmill-dark-brown/90' : 'border-sawmill-dark-brown text-sawmill-dark-brown hover:bg-sawmill-light-gray'}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <OverviewStats stats={stats} formatDuration={formatDuration} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GeographicDistribution stats={stats} getCountryFlag={getCountryFlag} />
        <TechnologyBreakdown stats={stats} />
        <UserBehavior stats={stats} />
      </div>

      <RecentActivity stats={stats} />
    </div>
  );
};

export default AnalyticsStats;
