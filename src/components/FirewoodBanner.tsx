
import React from 'react';
import { Button } from '@/components/ui/button';
import { Flame, MapPin } from 'lucide-react';

interface BannerProps {
  type?: 'firewood' | 'farmers-market';
}

const FirewoodBanner = ({ type = 'firewood' }: BannerProps) => {
  if (type === 'farmers-market') {
    return (
      <section className="bg-gradient-to-r from-[#F2FCE2] to-[#FEF7CD] text-sawmill-dark-brown py-12">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Renegade Spores Permaculture Farm & Market</h2>
              <p className="text-xl mb-2">Visit our friend's farm for fresh local produce and more!</p>
              <div className="flex items-center mt-3">
                <MapPin className="h-5 w-5 text-sawmill-dark-brown mr-1" />
                <p className="text-lg">Farm & Market • 5.0 ★★★★★ (8)</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button 
                size="lg" 
                className="bg-[#4285F4] hover:bg-[#3367D6] text-white"
              >
                <a href="https://goo.gl/maps/renegadespores" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Directions
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default firewood banner
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
