
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Phone } from 'lucide-react';

const MapEmbed = () => {
  return (
    <div className="w-full bg-gray-50">
      <div className="container-wide py-16">
        <h2 className="section-title text-center mx-auto mb-8">Find Us</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="w-full h-[450px] overflow-hidden rounded-lg shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d426.10063910550645!2d-79.30670120233295!3d44.0740233272581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d533306e003157%3A0xb4a0e15bbaac592b!2sMilled%20Right%20Sawmill!5e0!3m2!1sen!2sca!4v1746884582926!5m2!1sen!2sca" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Milled Right Sawmill Location"
              ></iframe>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-sawmill-dark-brown mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-sawmill-orange mr-2 mt-1" />
                  <div>
                    <p className="font-medium">Milled Right Sawmill</p>
                    <p className="text-sawmill-dark-gray">16720 ON-48, Whitchurch-Stouffville, ON L4A 3M6</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-sawmill-orange mr-2" />
                  <a href="tel:+17059891941" className="hover:underline">(705) 989-1941</a>
                </div>
              </div>
              <div className="mt-6">
                <Button className="w-full bg-sawmill-dark-brown hover:bg-sawmill-medium-brown">
                  <a href="https://maps.google.com/?q=16720+ON-48,+Whitchurch-Stouffville,+ON+L4A+3M6" target="_blank" rel="noopener noreferrer">
                    Get Directions
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapEmbed;
