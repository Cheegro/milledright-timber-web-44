
import React from 'react';
import { Button } from '@/components/ui/button';
import { Flame, MapPin } from 'lucide-react';

interface SharedBannerProps {
  variant?: 'compact' | 'full';
}

const SharedBanner = ({ variant = 'full' }: SharedBannerProps) => {
  // Common classes with conditional sizing
  const containerClasses = variant === 'compact' 
    ? "py-4" 
    : "py-12";
  
  return (
    <div className="flex flex-col space-y-2">
      {/* Firewood Banner */}
      <section className={`bg-gradient-to-r from-sawmill-auburn to-sawmill-orange text-white ${containerClasses}`}>
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 md:mr-6">
              <h2 className={`${variant === 'compact' ? 'text-xl md:text-2xl' : 'text-3xl md:text-4xl'} font-bold mb-1`}>
                Need Quality Firewood?
              </h2>
              {variant === 'full' && (
                <p className="text-lg">Visit our sister site FlamingFirewood.ca for premium firewood delivery</p>
              )}
            </div>
            <Button 
              size={variant === 'compact' ? "default" : "lg"} 
              className="bg-white text-sawmill-auburn hover:bg-sawmill-light-brown hover:text-sawmill-auburn"
            >
              <a href="https://flamingfirewood.ca" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Flame className="mr-2 h-5 w-5" />
                Visit FlamingFirewood.ca
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Farmers Market Banner */}
      <section className={`bg-gradient-to-r from-[#F2FCE2] to-[#FEF9D7] text-sawmill-dark-brown ${containerClasses}`}>
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 md:mr-6">
              <h2 className={`${variant === 'compact' ? 'text-xl md:text-2xl' : 'text-3xl md:text-4xl'} font-bold mb-1`}>
                Renegade Spores Permaculture Farm & Market
              </h2>
              {variant === 'full' && (
                <p className="text-lg mb-2">Visit our friend's farm for fresh local produce and more!</p>
              )}
              <div className="flex items-center mt-1">
                <MapPin className="h-4 w-4 text-sawmill-dark-brown mr-1" />
                <p className={`${variant === 'compact' ? 'text-sm' : 'text-lg'}`}>Farm & Market • 5.0 ★★★★★</p>
              </div>
            </div>
            <Button 
              size={variant === 'compact' ? "default" : "lg"}
              className="bg-[#4285F4] hover:bg-[#3367D6] text-white"
            >
              <a href="https://goo.gl/maps/renegadespores" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Directions
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SharedBanner;
