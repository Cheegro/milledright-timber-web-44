
import React from 'react';
import { Button } from '@/components/ui/button';
import { Flame } from 'lucide-react';

const FirewoodBanner = () => {
  return (
    <section className="bg-gradient-to-r from-sawmill-auburn to-sawmill-orange text-white py-12">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Need Quality Firewood?</h2>
            <p className="text-xl">Visit our sister site FlamingFirewood.ca for premium firewood delivery</p>
          </div>
          <div className="flex space-x-4">
            <Button 
              size="lg" 
              className="bg-white text-sawmill-auburn hover:bg-sawmill-light-brown hover:text-sawmill-auburn"
            >
              <a href="https://flamingfirewood.ca" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Flame className="mr-2 h-5 w-5" />
                Visit FlamingFirewood.ca
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirewoodBanner;
