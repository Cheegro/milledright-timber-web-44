
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WebsiteContentTab from '@/components/admin/settings/WebsiteContentTab';
import AnalyticsTab from '@/components/admin/settings/AnalyticsTab';
import SEOTab from '@/components/admin/settings/SEOTab';
import AnalyticsExclusionControls from '@/components/admin/AnalyticsExclusionControls';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('content');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-sawmill-dark-brown">Settings</h1>
        <p className="text-muted-foreground">
          Manage your website settings and configuration
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Website Content</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="exclusion">Analytics Exclusion</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <WebsiteContentTab />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsTab />
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <SEOTab />
        </TabsContent>

        <TabsContent value="exclusion" className="space-y-6">
          <AnalyticsExclusionControls />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
