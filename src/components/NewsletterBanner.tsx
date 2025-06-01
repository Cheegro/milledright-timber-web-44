
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell, X } from 'lucide-react';

interface NewsletterBannerProps {
  onSubscribeClick: () => void;
  onClose?: () => void;
  showCloseButton?: boolean;
}

const NewsletterBanner: React.FC<NewsletterBannerProps> = ({ 
  onSubscribeClick, 
  onClose,
  showCloseButton = true 
}) => {
  return (
    <div className="bg-gradient-to-r from-sawmill-orange to-sawmill-auburn text-white py-3 px-4 relative">
      <div className="container-wide flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm md:text-base font-medium">
              Stay updated with our latest products, workshop tips, and project showcases!
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            onClick={onSubscribeClick}
            variant="secondary"
            size="sm"
            className="bg-white text-sawmill-dark-brown hover:bg-gray-100 font-medium"
          >
            Subscribe Now
          </Button>
          
          {showCloseButton && onClose && (
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors p-1"
              aria-label="Close banner"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterBanner;
