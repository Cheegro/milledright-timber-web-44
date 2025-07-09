
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { SiteSetting, updateMultipleSettings, parseSettingValue } from '@/api/settingsApi';
import { useToast } from '@/hooks/use-toast';

interface SEOTabProps {
  settings: SiteSetting[];
  onSettingsUpdate: () => void;
}

const SEOTab: React.FC<SEOTabProps> = ({ settings, onSettingsUpdate }) => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { isSubmitting }, watch } = useForm();

  const getSettingValue = (key: string): string => {
    const setting = settings.find(s => s.key === key);
    if (!setting) return "";
    const value = parseSettingValue(setting);
    return typeof value === 'string' ? value : "";
  };

  const metaDescription = watch('site_meta_description', getSettingValue('site_meta_description'));

  const onSubmit = async (data: any) => {
    try {
      await updateMultipleSettings(data);
      toast({
        title: "SEO Settings Updated",
        description: "Your search engine optimization settings have been saved.",
      });
      onSettingsUpdate();
    } catch (error) {
      console.error('Error updating SEO settings:', error);
      toast({
        title: "Error",
        description: "Failed to update SEO settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic SEO */}
      <Card>
        <CardHeader>
          <CardTitle>Basic SEO Settings</CardTitle>
          <CardDescription>
            These appear in search results and social media shares
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="site_meta_title">Site Title</Label>
            <Input
              id="site_meta_title"
              {...register('site_meta_title')}
              defaultValue={getSettingValue('site_meta_title')}
              placeholder="MilledRight Sawmill - Quality Lumber & Custom Milling Services"
              maxLength={60}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Keep under 60 characters for best display in search results
            </p>
          </div>
          
          <div>
            <Label htmlFor="site_meta_description">Site Description</Label>
            <Textarea
              id="site_meta_description"
              {...register('site_meta_description')}
              defaultValue={getSettingValue('site_meta_description')}
              placeholder="Premium lumber, live edge slabs, and custom milling services in Whitchurch-Stouffville, ON. Quality wood products direct from our sawmill."
              rows={3}
              maxLength={160}
            />
            <p className="text-sm text-muted-foreground mt-1">
              {metaDescription?.length || 0}/160 characters - This appears in search results
            </p>
          </div>

          <div>
            <Label htmlFor="site_keywords">Keywords</Label>
            <Input
              id="site_keywords"
              {...register('site_keywords')}
              defaultValue={getSettingValue('site_keywords')}
              placeholder="sawmill, lumber, live edge slabs, custom milling, wood products, Whitchurch-Stouffville"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Comma-separated keywords relevant to your business
            </p>
          </div>
        </CardContent>
      </Card>

      {/* SEO Tips */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Best Practices</CardTitle>
          <CardDescription>Tips to improve your search engine ranking</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-3">
                <div>
                  <strong>Title Optimization:</strong>
                  <ul className="list-disc list-inside mt-1 text-sm space-y-1">
                    <li>Include your main service and location</li>
                    <li>Keep under 60 characters</li>
                    <li>Put most important keywords first</li>
                  </ul>
                </div>
                
                <div>
                  <strong>Description Optimization:</strong>
                  <ul className="list-disc list-inside mt-1 text-sm space-y-1">
                    <li>Write compelling copy that makes people want to click</li>
                    <li>Include your location and main services</li>
                    <li>Use action words like "premium," "quality," "custom"</li>
                  </ul>
                </div>

                <div>
                  <strong>Local SEO Keywords:</strong>
                  <p className="text-sm mt-1">
                    Include location-based terms like "Whitchurch-Stouffville," "York Region," 
                    "Durham Region," and nearby cities where you serve customers.
                  </p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Local SEO */}
      <Card>
        <CardHeader>
          <CardTitle>Local Business SEO</CardTitle>
          <CardDescription>
            These settings help local customers find you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p><strong>Additional Local SEO Steps:</strong></p>
                <ol className="list-decimal list-inside text-sm space-y-1">
                  <li>Claim your Google Business Profile</li>
                  <li>Encourage customer reviews on Google</li>
                  <li>Ensure your business name, address, and phone are consistent across all online directories</li>
                  <li>Create content about local projects and customers</li>
                  <li>Use location-specific keywords in your product descriptions</li>
                </ol>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save SEO Settings'}
        </Button>
      </div>
    </form>
  );
};

export default SEOTab;
