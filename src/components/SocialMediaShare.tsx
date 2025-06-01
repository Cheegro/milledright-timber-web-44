
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { trackButtonClick } from '@/utils/analytics';

interface SocialMediaShareProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
  variant?: 'buttons' | 'dropdown';
}

const SocialMediaShare: React.FC<SocialMediaShareProps> = ({
  url,
  title,
  description = '',
  className = '',
  variant = 'buttons'
}) => {
  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);
  const shareDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    whatsapp: `https://wa.me/?text=${shareTitle}%20${shareUrl}`,
  };

  const handleShare = (platform: string, shareUrl: string) => {
    trackButtonClick(`Share on ${platform}`, 'social_share');
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
        trackButtonClick('Native Share', 'social_share');
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  if (variant === 'buttons') {
    return (
      <div className={`flex flex-col sm:flex-row sm:items-center gap-3 ${className}`}>
        <span className="text-sm font-medium text-gray-600">Share:</span>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('Facebook', shareLinks.facebook)}
            className="h-10 px-3 touch-manipulation"
          >
            <Facebook className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Facebook</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('Twitter', shareLinks.twitter)}
            className="h-10 px-3 touch-manipulation"
          >
            <Twitter className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Twitter</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('LinkedIn', shareLinks.linkedin)}
            className="h-10 px-3 touch-manipulation"
          >
            <Linkedin className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">LinkedIn</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('WhatsApp', shareLinks.whatsapp)}
            className="h-10 px-3 touch-manipulation"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">WhatsApp</span>
          </Button>
          {navigator.share && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleNativeShare}
              className="h-10 px-3 touch-manipulation"
            >
              <Share2 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default SocialMediaShare;
