
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Globe, BarChart3, Search, Building } from 'lucide-react';
import { fetchSettings } from '@/api/settingsApi';
import WebsiteContentTab from '@/components/admin/settings/WebsiteContentTab';
import AnalyticsTab from '@/components/admin/settings/AnalyticsTab';
import SEOTab from '@/components/admin/settings/SEOTab';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('content');

  const {
    data: settings = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['settings'],
    queryFn: fetchSettings,
  });

  const handleSettingsUpdate = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <Card>
          <CardContent className="pt-6">
            <p className="text-red-600">Error loading settings. Please try again.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-sawmill-dark-brown">
          Website Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your website content, analytics tracking, and SEO settings
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Website Content
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="business" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Business Info
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-6">
          <WebsiteContentTab 
            settings={settings} 
            onSettingsUpdate={handleSettingsUpdate}
          />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <AnalyticsTab 
            settings={settings} 
            onSettingsUpdate={handleSettingsUpdate}
          />
        </TabsContent>

        <TabsContent value="seo" className="mt-6">
          <SEOTab 
            settings={settings} 
            onSettingsUpdate={handleSettingsUpdate}
          />
        </TabsContent>

        <TabsContent value="business" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Additional business details and operating information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Business hours and additional company information can be managed in the 
                Website Content tab. Additional business features will be added in future updates.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
