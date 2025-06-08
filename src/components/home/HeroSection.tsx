
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useSettings } from '@/hooks/useSettings';
import { trackButtonClick } from '@/utils/analytics';

const HeroSection = () => {
  const { getSetting, isLoading } = useSettings();

  const headline = getSetting('hero_headline', 'Complete Lumber & Woodworking Solutions');
  const subtitle = getSetting('hero_subtitle', 'From custom wooden structures and live edge slabs to dimensional lumber and firewood - we handle all your wood needs. Plus, we accept free lumber and can mill your logs with no money transaction required.');
  const primaryCTA = getSetting('hero_primary_cta', 'Explore Our Services');
  const secondaryCTA = getSetting('hero_secondary_cta', 'Get Custom Quote');

  const handlePrimaryCTAClick = () => {
    trackButtonClick(primaryCTA, 'hero_primary');
  };

  const handleSecondaryCTAClick = () => {
    trackButtonClick(secondaryCTA, 'hero_secondary');
  };

  if (isLoading) {
    return (
      <section className="relative bg-sawmill-dark-brown text-white">
        <div className="container-wide py-24 md:py-32 lg:py-40">
          <div className="max-w-4xl">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-700 rounded mb-6"></div>
              <div className="h-6 bg-gray-700 rounded mb-8 w-2/3"></div>
              <div className="flex gap-4">
                <div className="h-12 bg-gray-700 rounded w-48"></div>
                <div className="h-12 bg-gray-700 rounded w-48"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-sawmill-dark-brown via-sawmill-medium-brown to-sawmill-auburn text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-sawmill-orange rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-sawmill-light-brown rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-wide py-24 md:py-32 lg:py-40 relative z-10">
        <motion.div 
          className="max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
            {headline}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl text-gray-200 leading-relaxed">
            {subtitle}
          </p>
          
          {/* Service highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-8 h-8 bg-sawmill-orange rounded-full mx-auto mb-2"></div>
              <h3 className="font-bold text-sm">Custom Structures</h3>
            </motion.div>
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-8 h-8 bg-sawmill-forest rounded-full mx-auto mb-2"></div>
              <h3 className="font-bold text-sm">Live Edge Slabs</h3>
            </motion.div>
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="w-8 h-8 bg-sawmill-auburn rounded-full mx-auto mb-2"></div>
              <h3 className="font-bold text-sm">Custom Milling</h3>
            </motion.div>
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="w-8 h-8 bg-sawmill-light-brown rounded-full mx-auto mb-2"></div>
              <h3 className="font-bold text-sm">Firewood Sales</h3>
            </motion.div>
          </div>
          
          {/* Special offer callout */}
          <motion.div 
            className="bg-sawmill-orange/20 border border-sawmill-orange/30 rounded-2xl p-6 mb-10 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <h3 className="text-xl font-bold text-sawmill-orange mb-2">Free Lumber Acceptance & Log Milling Deals!</h3>
            <p className="text-white">Got lumber to get rid of? We'll take it! Have logs? Let's work out a deal to mill some for you - no money transaction required.</p>
          </motion.div>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-sawmill-orange hover:bg-sawmill-auburn text-white transition-all duration-300 transform hover:scale-105 shadow-xl"
              onClick={handlePrimaryCTAClick}
            >
              <Link to="/products">{primaryCTA}</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-sawmill-dark-brown transition-all duration-300 shadow-lg"
              onClick={handleSecondaryCTAClick}
            >
              <Link to="/contact">{secondaryCTA}</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
