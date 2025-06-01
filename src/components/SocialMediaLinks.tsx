
import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import { trackButtonClick } from '@/utils/analytics';

interface SocialMediaLinksProps {
  className?: string;
  showLabels?: boolean;
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({ 
  className = '',
  showLabels = false 
}) => {
  const { getSetting } = useSettings();
  
  const facebookUrl = getSetting('social_facebook_url', '');
  const instagramUrl = getSetting('social_instagram_url', '');
  const twitterUrl = getSetting('social_twitter_url', '');
  const youtubeUrl = getSetting('social_youtube_url', '');

  const socialLinks = [
    {
      name: 'Facebook',
      url: facebookUrl,
      icon: Facebook,
    },
    {
      name: 'Instagram', 
      url: instagramUrl,
      icon: Instagram,
    },
    {
      name: 'Twitter',
      url: twitterUrl,
      icon: Twitter,
    },
    {
      name: 'YouTube',
      url: youtubeUrl,
      icon: ({ className }: { className: string }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
  ].filter(link => link.url); // Only show links that have URLs configured

  if (socialLinks.length === 0) {
    return null;
  }

  const handleSocialClick = (platform: string) => {
    trackButtonClick(`${platform} Link`, 'social_footer');
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {showLabels && <span className="text-sm font-medium">Follow Us:</span>}
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleSocialClick(link.name)}
          className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-sawmill-medium-brown rounded"
          aria-label={`Follow us on ${link.name}`}
        >
          <link.icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
};

export default SocialMediaLinks;
