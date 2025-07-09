
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExternalLink, Info } from 'lucide-react';
import { SiteSetting, updateMultipleSettings, parseSettingValue } from '@/api/settingsApi';
import { useToast } from '@/hooks/use-toast';

interface AnalyticsTabProps {
  settings: SiteSetting[];
  onSettingsUpdate: () => void;
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ settings, onSettingsUpdate }) => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { isSubmitting }, watch, setValue } = useForm();

  const getSettingValue = (key: string): string | boolean => {
    const setting = settings.find(s => s.key === key);
    if (!setting) return "";
    const value = parseSettingValue(setting);
    return value as string | boolean;
  };

  const analyticsEnabled = watch('analytics_enabled', getSettingValue('analytics_enabled'));

  const onSubmit = async (data: any) => {
    try {
      await updateMultipleSettings(data);
      toast({
        title: "Analytics Settings Updated",
        description: "Your tracking settings have been saved successfully.",
      });
      onSettingsUpdate();
    } catch (error) {
      console.error('Error updating analytics settings:', error);
      toast({
        title: "Error",
        description: "Failed to update analytics settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Analytics Toggle */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics Status</CardTitle>
          <CardDescription>Enable or disable all analytics tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              id="analytics_enabled"
              checked={analyticsEnabled as boolean}
              onCheckedChange={(checked) => setValue('analytics_enabled', checked)}
            />
            <Label htmlFor="analytics_enabled">Enable Analytics Tracking</Label>
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
              <CardDescription>
                Track website visitors, page views, and user behavior
              </CardDescription>
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
                  <ol className="list-decimal list-inside mt-2 space-y-1">
                    <li>Go to <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Analytics</a></li>
                    <li>Create a new GA4 property for your website</li>
                    <li>Copy the Measurement ID (starts with "G-")</li>
                    <li>Paste it in the field above</li>
                  </ol>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Google Tag Manager */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Google Tag Manager
                <ExternalLink className="h-4 w-4" />
              </CardTitle>
              <CardDescription>
                Advanced tracking and conversion management (optional)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
              <CardTitle className="flex items-center gap-2">
                Meta Pixel (Facebook)
                <ExternalLink className="h-4 w-4" />
              </CardTitle>
              <CardDescription>
                Track visitors for Facebook and Instagram advertising
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="meta_pixel_id">Meta Pixel ID</Label>
                <Input
                  id="meta_pixel_id"
                  {...register('meta_pixel_id')}
                  defaultValue={getSettingValue('meta_pixel_id') as string}
                  placeholder="1234567890123456"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  15-16 digit number from your Facebook Business Manager
                </p>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Benefits of Meta Pixel:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Track website visitors for retargeting ads</li>
                    <li>Measure effectiveness of Facebook/Instagram ads</li>
                    <li>Create custom audiences based on website behavior</li>
                    <li>Optimize ads for specific actions (form submissions, calls)</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Analytics Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>What You'll Learn</CardTitle>
              <CardDescription>Key insights these analytics will provide</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Visitor Insights</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• How many people visit your site</li>
                    <li>• Which pages are most popular</li>
                    <li>• Where visitors come from (Google, social media, etc.)</li>
                    <li>• Geographic location of visitors</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Business Impact</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Track contact form submissions</li>
                    <li>• Monitor phone call clicks</li>
                    <li>• See which products generate most interest</li>
                    <li>• Measure return on advertising investment</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Analytics Settings'}
        </Button>
      </div>
    </form>
  );
};

export default AnalyticsTab;
