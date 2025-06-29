
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Shield, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  Info, 
  CheckCircle,
  AlertTriangle 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSettings } from '@/hooks/useSettings';
import { updateMultipleSettings, parseSettingValue } from '@/api/settingsApi';
import { 
  enableAnalytics, 
  disableAnalytics, 
  setAdminExclusion, 
  getAnalyticsStatus 
} from '@/services/analytics/core';

const AnalyticsSettings = () => {
  const { toast } = useToast();
  const { settings, refetch } = useSettings();
  const [exclusionStatus, setExclusionStatus] = useState(getAnalyticsStatus());
  
  const { register, handleSubmit, formState: { isSubmitting }, watch, setValue } = useForm();

  const getSettingValue = (key: string): string | boolean => {
    const setting = settings.find(s => s.setting_key === key);
    if (!setting) return "";
    return parseSettingValue(setting) as string | boolean;
  };

  const analyticsEnabled = watch('analytics_enabled', getSettingValue('analytics_enabled'));

  const onSubmit = async (data: any) => {
    try {
      await updateMultipleSettings(data);
      toast({
        title: "Settings Updated",
        description: "Your analytics settings have been saved successfully.",
      });
      refetch();
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAdminExclusion = (exclude: boolean) => {
    setAdminExclusion(exclude);
    setExclusionStatus(getAnalyticsStatus());
    toast({
      title: exclude ? "Admin Exclusion Enabled" : "Admin Exclusion Disabled",
      description: exclude ? "Admin traffic will be excluded from analytics" : "Admin traffic will be tracked",
    });
  };

  const handleAnalyticsToggle = (enabled: boolean) => {
    if (enabled) {
      enableAnalytics();
    } else {
      disableAnalytics();
    }
    setExclusionStatus(getAnalyticsStatus());
    toast({
      title: enabled ? "Analytics Enabled" : "Analytics Disabled",
      description: enabled ? "Analytics tracking is now active" : "All analytics tracking has been disabled",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="h-6 w-6 text-sawmill-orange" />
        <h2 className="text-2xl font-bold text-sawmill-dark-brown">Analytics Settings</h2>
      </div>

      <Tabs defaultValue="tracking" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tracking">Tracking Setup</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Controls</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="tracking">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Analytics Status */}
            <Card>
              <CardHeader>
                <CardTitle>Analytics Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Enable Analytics Tracking</Label>
                    <p className="text-sm text-muted-foreground">Master switch for all analytics functionality</p>
                  </div>
                  <Switch
                    checked={analyticsEnabled as boolean}
                    onCheckedChange={(checked) => {
                      setValue('analytics_enabled', checked);
                      handleAnalyticsToggle(checked);
                    }}
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {exclusionStatus.enabled && !exclusionStatus.disabled ? (
                      <>
                        <Eye className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Currently Tracking</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">Not Tracking</span>
                      </>
                    )}
                  </div>
                  <Badge variant={exclusionStatus.enabled && !exclusionStatus.disabled ? "default" : "secondary"}>
                    {exclusionStatus.enabled && !exclusionStatus.disabled ? "Active" : "Disabled"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {analyticsEnabled && (
              <>
                {/* Google Analytics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Google Analytics 4
                      <ExternalLink className="h-4 w-4" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="google_analytics_id">GA4 Measurement ID</Label>
                      <Input
                        id="google_analytics_id"
                        {...register('google_analytics_id')}
                        defaultValue={getSettingValue('google_analytics_id') as string}
                        placeholder="G-XXXXXXXXXX"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Find this in your Google Analytics property settings
                      </p>
                    </div>
                    
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Setup Instructions:</strong>
                        <ol className="list-decimal list-inside mt-2 space-y-1 text-sm">
                          <li>Visit <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Analytics</a></li>
                          <li>Create a new GA4 property</li>
                          <li>Copy the Measurement ID (starts with "G-")</li>
                          <li>Paste it above and save</li>
                        </ol>
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>

                {/* Google Tag Manager */}
                <Card>
                  <CardHeader>
                    <CardTitle>Google Tag Manager</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="google_tag_manager_id">GTM Container ID</Label>
                      <Input
                        id="google_tag_manager_id"
                        {...register('google_tag_manager_id')}
                        defaultValue={getSettingValue('google_tag_manager_id') as string}
                        placeholder="GTM-XXXXXXX"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Optional: For advanced tracking and remarketing
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Meta Pixel */}
                <Card>
                  <CardHeader>
                    <CardTitle>Meta Pixel (Facebook)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="meta_pixel_id">Meta Pixel ID</Label>
                      <Input
                        id="meta_pixel_id"
                        {...register('meta_pixel_id')}
                        defaultValue={getSettingValue('meta_pixel_id') as string}
                        placeholder="1234567890123456"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        15-16 digit number from Facebook Business Manager
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Settings'}
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Exclude Admin Traffic</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically exclude your visits when logged in as admin
                    </p>
                  </div>
                  <Switch
                    checked={exclusionStatus.adminExcluded}
                    onCheckedChange={handleAdminExclusion}
                  />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Admin Pages:</span>
                    <Badge variant={exclusionStatus.onAdminPage ? "destructive" : "outline"}>
                      {exclusionStatus.onAdminPage ? "Auto-excluded" : "Not excluded"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Admin Exclusion:</span>
                    <Badge variant={exclusionStatus.adminExcluded ? "destructive" : "outline"}>
                      {exclusionStatus.adminExcluded ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>How Privacy Controls Work:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                      <li>Admin pages are automatically excluded from tracking</li>
                      <li>Admin exclusion applies to all pages when enabled</li>
                      <li>Changes take effect immediately</li>
                      <li>Your IP address is remembered for exclusion</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Google Analytics</h4>
                    <Badge variant={getSettingValue('google_analytics_id') ? "default" : "secondary"}>
                      {getSettingValue('google_analytics_id') ? "Connected" : "Not Connected"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Website traffic and behavior analysis
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Google Tag Manager</h4>
                    <Badge variant={getSettingValue('google_tag_manager_id') ? "default" : "secondary"}>
                      {getSettingValue('google_tag_manager_id') ? "Connected" : "Not Connected"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Advanced tracking and tag management
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Meta Pixel</h4>
                    <Badge variant={getSettingValue('meta_pixel_id') ? "default" : "secondary"}>
                      {getSettingValue('meta_pixel_id') ? "Connected" : "Not Connected"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Facebook and Instagram advertising tracking
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Internal Analytics</h4>
                    <Badge variant="default">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Built-in analytics database and reporting
                  </p>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Integration Benefits:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li><strong>Google Analytics:</strong> Industry-standard web analytics</li>
                    <li><strong>Google Tag Manager:</strong> Centralized tag management</li>
                    <li><strong>Meta Pixel:</strong> Social media advertising optimization</li>
                    <li><strong>Internal Analytics:</strong> Real-time data and custom insights</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsSettings;
