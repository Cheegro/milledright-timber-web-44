
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SiteSetting, updateMultipleSettings, parseSettingValue } from '@/api/settingsApi';
import { useToast } from '@/hooks/use-toast';

interface WebsiteContentTabProps {
  settings: SiteSetting[];
  onSettingsUpdate: () => void;
}

const WebsiteContentTab: React.FC<WebsiteContentTabProps> = ({ settings, onSettingsUpdate }) => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const getSettingValue = (key: string): string => {
    const setting = settings.find(s => s.setting_key === key);
    if (!setting) return "";
    const value = parseSettingValue(setting);
    return typeof value === 'string' ? value : "";
  };

  const onSubmit = async (data: any) => {
    try {
      await updateMultipleSettings(data);
      toast({
        title: "Settings Updated",
        description: "Website content has been updated successfully.",
      });
      onSettingsUpdate();
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Hero Section */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>Main banner content on your homepage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="hero_headline">Main Headline</Label>
            <Input
              id="hero_headline"
              {...register('hero_headline')}
              defaultValue={getSettingValue('hero_headline')}
              placeholder="Quality Lumber Direct From Our Sawmill"
            />
          </div>
          <div>
            <Label htmlFor="hero_subtitle">Subtitle</Label>
            <Textarea
              id="hero_subtitle"
              {...register('hero_subtitle')}
              defaultValue={getSettingValue('hero_subtitle')}
              placeholder="Describe your services and what makes you unique"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hero_primary_cta">Primary Button Text</Label>
              <Input
                id="hero_primary_cta"
                {...register('hero_primary_cta')}
                defaultValue={getSettingValue('hero_primary_cta')}
                placeholder="Browse Our Products"
              />
            </div>
            <div>
              <Label htmlFor="hero_secondary_cta">Secondary Button Text</Label>
              <Input
                id="hero_secondary_cta"
                {...register('hero_secondary_cta')}
                defaultValue={getSettingValue('hero_secondary_cta')}
                placeholder="Request Custom Milling"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Basic business details displayed across your site</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company_name">Business Name</Label>
              <Input
                id="company_name"
                {...register('company_name')}
                defaultValue={getSettingValue('company_name')}
                placeholder="MilledRight Sawmill"
              />
            </div>
            <div>
              <Label htmlFor="company_tagline">Tagline</Label>
              <Input
                id="company_tagline"
                {...register('company_tagline')}
                defaultValue={getSettingValue('company_tagline')}
                placeholder="Your business tagline"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="business_phone">Phone Number</Label>
              <Input
                id="business_phone"
                {...register('business_phone')}
                defaultValue={getSettingValue('business_phone')}
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="business_email">Email Address</Label>
              <Input
                id="business_email"
                type="email"
                {...register('business_email')}
                defaultValue={getSettingValue('business_email')}
                placeholder="info@milledright.com"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="business_address">Business Address</Label>
            <Input
              id="business_address"
              {...register('business_address')}
              defaultValue={getSettingValue('business_address')}
              placeholder="16720 Hwy 48, Whitchurch-Stouffville, ON"
            />
          </div>
        </CardContent>
      </Card>

      {/* Services */}
      <Card>
        <CardHeader>
          <CardTitle>Service Descriptions</CardTitle>
          <CardDescription>Update your main service offerings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="services_custom_milling_title">Custom Milling Title</Label>
              <Input
                id="services_custom_milling_title"
                {...register('services_custom_milling_title')}
                defaultValue={getSettingValue('services_custom_milling_title')}
                placeholder="Custom Log Milling"
              />
            </div>
            <div>
              <Label htmlFor="services_structures_title">Custom Structures Title</Label>
              <Input
                id="services_structures_title"
                {...register('services_structures_title')}
                defaultValue={getSettingValue('services_structures_title')}
                placeholder="Custom Built Structures"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="services_custom_milling_desc">Custom Milling Description</Label>
            <Textarea
              id="services_custom_milling_desc"
              {...register('services_custom_milling_desc')}
              defaultValue={getSettingValue('services_custom_milling_desc')}
              placeholder="Describe your custom milling services"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="services_structures_desc">Custom Structures Description</Label>
            <Textarea
              id="services_structures_desc"
              {...register('services_structures_desc')}
              defaultValue={getSettingValue('services_structures_desc')}
              placeholder="Describe your custom structure building services"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact & Footer */}
      <Card>
        <CardHeader>
          <CardTitle>Contact & Footer Content</CardTitle>
          <CardDescription>Text for contact page and footer sections</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="contact_page_title">Contact Page Title</Label>
            <Input
              id="contact_page_title"
              {...register('contact_page_title')}
              defaultValue={getSettingValue('contact_page_title')}
              placeholder="Get In Touch"
            />
          </div>
          <div>
            <Label htmlFor="contact_form_header">Contact Form Header</Label>
            <Textarea
              id="contact_form_header"
              {...register('contact_form_header')}
              defaultValue={getSettingValue('contact_form_header')}
              placeholder="Ready to discuss your project? Contact us today for a quote."
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="footer_tagline">Footer Tagline</Label>
            <Textarea
              id="footer_tagline"
              {...register('footer_tagline')}
              defaultValue={getSettingValue('footer_tagline')}
              placeholder="Quality lumber and custom milling services..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
};

export default WebsiteContentTab;
