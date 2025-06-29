
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UnifiedAnalyticsDashboard from '@/components/admin/analytics/UnifiedAnalyticsDashboard';
import AnalyticsSettings from '@/components/admin/analytics/AnalyticsSettings';
import AnalyticsAdminTools from '@/components/admin/analytics/AnalyticsAdminTools';
import { BarChart3, Settings, Database } from 'lucide-react';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-sawmill-dark-brown">Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive website analytics and insights
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="admin" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Admin Tools
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <UnifiedAnalyticsDashboard />
        </TabsContent>

        <TabsContent value="settings">
          <AnalyticsSettings />
        </TabsContent>

        <TabsContent value="admin">
          <AnalyticsAdminTools />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
