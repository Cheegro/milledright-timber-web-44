
import React from 'react';
import { Button } from '@/components/ui/button';

const MapEmbed = () => {
  return (
    <div className="w-full">
      <div className="container-wide py-10">
        <h2 className="section-title text-center mx-auto mb-8">Find Us</h2>
        <div className="w-full h-[450px] overflow-hidden rounded-lg shadow-lg mb-10">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d426.10063910550645!2d-79.30670120233295!3d44.0740233272581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d533306e003157%3A0xb4a0e15bbaac592b!2sMilled%20Right%20Sawmill!5e0!3m2!1sen!2sca!4v1746884582926!5m2!1sen!2sca" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MapEmbed;
