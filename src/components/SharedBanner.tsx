
import React from 'react';
import { Button } from '@/components/ui/button';
import { Flame, MapPin } from 'lucide-react';

interface SharedBannerProps {
  variant?: 'compact' | 'full';
}

const SharedBanner = ({ variant = 'full' }: SharedBannerProps) => {
  // Common classes with conditional sizing
  const containerClasses = variant === 'compact' 
    ? "py-3" 
    : "py-8";
  
  return (
    <div className="flex flex-col space-y-1 border-t border-gray-200 mt-12">
      {/* Firewood Banner */}
      <section className={`bg-gradient-to-r from-sawmill-auburn to-sawmill-orange text-white ${containerClasses}`}>
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-3 md:mb-0 md:mr-6">
              <h2 className={`${variant === 'compact' ? 'text-lg md:text-xl' : 'text-2xl md:text-3xl'} font-bold mb-1`}>
                Need Quality Firewood?
              </h2>
              {variant === 'full' && (
                <p className="text-base md:text-lg">Visit our sister site FlamingFirewood.ca for premium firewood delivery</p>
              )}
            </div>
            <Button 
              size={variant === 'compact' ? "default" : "lg"} 
              className="bg-white text-sawmill-auburn hover:bg-sawmill-light-brown hover:text-sawmill-auburn"
            >
              <a href="https://flamingfirewood.ca" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Flame className="mr-2 h-4 w-4" />
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
            <div className="mb-3 md:mb-0 md:mr-6">
              <h2 className={`${variant === 'compact' ? 'text-lg md:text-xl' : 'text-2xl md:text-3xl'} font-bold mb-1`}>
                Renegade Spores Permaculture Farm & Market
              </h2>
              {variant === 'full' && (
                <p className="text-base md:text-lg mb-2">Visit our friend's farm for fresh local produce and more!</p>
              )}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-sawmill-dark-brown mr-1" />
                  <p className={`${variant === 'compact' ? 'text-sm' : 'text-base'}`}>5.0 ★★★★★</p>
                </div>
                <p className={`${variant === 'compact' ? 'text-sm' : 'text-base'}`}>
                  1234 Farm Road, Countryside, BC
                </p>
              </div>
            </div>
            <Button 
              size={variant === 'compact' ? "default" : "lg"}
              className="bg-[#4285F4] hover:bg-[#3367D6] text-white"
            >
              <a href="https://goo.gl/maps/renegadespores" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
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
