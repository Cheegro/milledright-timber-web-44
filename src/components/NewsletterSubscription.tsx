
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { subscribeToNewsletter } from '@/api/newsletterApi';
import { useSettings } from '@/hooks/useSettings';
import { trackFormSubmission } from '@/utils/analytics';

interface NewsletterSubscriptionProps {
  variant?: 'footer' | 'inline' | 'modal';
  className?: string;
}

const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({ 
  variant = 'footer',
  className = '' 
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { getSetting, getBooleanSetting } = useSettings();

  const newsletterEnabled = getBooleanSetting('newsletter_enabled', true);
  const title = getSetting('newsletter_title', 'Stay Updated with MilledRight');
  const description = getSetting('newsletter_description', 'Get updates on new products, workshop tips, and exclusive offers');

  if (!newsletterEnabled) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await subscribeToNewsletter(email, name || undefined);
      
      trackFormSubmission('newsletter_subscription', { 
        variant,
        has_name: !!name 
      });
      
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      
      setEmail('');
      setName('');
    } catch (error: any) {
      toast({
        title: "Subscription failed",
        description: error.message || "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'footer') {
    return (
      <div className={className}>
        <h3 className="text-xl font-bold mb-4 border-b border-border pb-2 text-foreground">
          {title}
        </h3>
        <p className="mb-4 text-muted-foreground">{description}</p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground border-border"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors px-4 py-2 rounded font-bold"
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`bg-secondary/20 p-6 rounded-lg border border-border ${className}`}>
        <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-sm mb-4 text-muted-foreground">{description}</p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-background text-foreground border-border"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </div>
    );
  }

  return null;
};

export default NewsletterSubscription;
