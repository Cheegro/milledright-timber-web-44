
import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { trackPhoneClick, trackEmailClick } from '@/utils/analytics';
import { useSettings } from '@/hooks/useSettings';

interface ContactInfoProps {
  showIcons?: boolean;
  className?: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ 
  showIcons = true, 
  className = '' 
}) => {
  const { getSetting } = useSettings();
  
  const phone = getSetting('business_phone', '(555) 123-4567');
  const email = getSetting('business_email', 'info@milledright.com');

  const handlePhoneClick = () => {
    trackPhoneClick(phone);
  };

  const handleEmailClick = () => {
    trackEmailClick(email);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <a 
        href={`tel:${phone.replace(/[^\d]/g, '')}`}
        onClick={handlePhoneClick}
        className="flex items-center gap-2 text-gray-600 hover:text-sawmill-orange transition-colors"
      >
        {showIcons && <Phone className="h-4 w-4" />}
        <span>{phone}</span>
      </a>
      
      <a 
        href={`mailto:${email}`}
        onClick={handleEmailClick}
        className="flex items-center gap-2 text-gray-600 hover:text-sawmill-orange transition-colors"
      >
        {showIcons && <Mail className="h-4 w-4" />}
        <span>{email}</span>
      </a>
    </div>
  );
};

export default ContactInfo;
