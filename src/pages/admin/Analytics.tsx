import React from 'react';
import { BarChart3 } from 'lucide-react';
import NewAnalyticsDashboard from '@/components/admin/analytics/NewAnalyticsDashboard';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Analytics</h1>
      </div>
      <NewAnalyticsDashboard />
    </div>
  );
};

export default Analytics;