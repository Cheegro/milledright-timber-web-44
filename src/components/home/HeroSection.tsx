
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useSettings } from '@/hooks/useSettings';
import { trackButtonClick } from '@/utils/analytics';

const HeroSection = () => {
  const { getSetting, isLoading } = useSettings();

  const headline = getSetting('hero_headline', 'PREMIUM LUMBER DIRECT FROM OUR SAWMILL');
  const subtitle = getSetting('hero_subtitle', 'Break away from ordinary. MilledRight Sawmill delivers premium lumber that rebels against mediocrity - live edge slabs, dimensional lumber, and custom milling that defies convention.');
  const primaryCTA = getSetting('hero_primary_cta', 'EXPLORE OUR LUMBER');
  const secondaryCTA = getSetting('hero_secondary_cta', 'CUSTOM MILLING');

  const handlePrimaryCTAClick = () => {
    trackButtonClick(primaryCTA, 'hero_primary');
  };

  const handleSecondaryCTAClick = () => {
    trackButtonClick(secondaryCTA, 'hero_secondary');
  };

  if (isLoading) {
    return (
      <section className="relative bg-gradient-to-br from-sawmill-dark-brown via-black to-sawmill-dark-gray text-white">
        <div className="absolute inset-0 bg-black opacity-70 z-0"></div>
        <div className="absolute inset-0 industrial-grid opacity-20"></div>
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/lovable-uploads/a86a2200-0386-4fb1-adbf-bdf3d636bba2.png')` }}
        ></div>
        <div className="container-wide py-24 md:py-32 lg:py-40 relative z-10">
          <div className="max-w-3xl">
            <div className="animate-pulse">
              <div className="h-12 bg-gradient-to-r from-sawmill-dark-brown to-sawmill-orange rounded mb-6 animate-industrial-pulse"></div>
              <div className="h-6 bg-sawmill-dark-gray rounded mb-8 w-2/3"></div>
              <div className="flex gap-4">
                <div className="h-12 bg-gradient-to-r from-sawmill-warm-brown to-sawmill-orange rounded w-48"></div>
                <div className="h-12 bg-sawmill-dark-gray rounded w-48"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-sawmill-dark-brown via-black to-sawmill-dark-gray text-white overflow-hidden">
      {/* Industrial background elements */}
      <div className="absolute inset-0 bg-black opacity-70 z-0"></div>
      <div className="absolute inset-0 industrial-grid opacity-30"></div>
      <div className="absolute inset-0 sawmill-texture"></div>
      
      {/* Hero image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url('/lovable-uploads/a86a2200-0386-4fb1-adbf-bdf3d636bba2.png')` }}
      ></div>
      
      {/* Animated accent lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sawmill-bark via-sawmill-orange to-sawmill-amber animate-industrial-pulse"></div>
      <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-sawmill-bark via-sawmill-orange to-sawmill-amber animate-industrial-pulse"></div>
      
      <div className="container-wide py-24 md:py-32 lg:py-40 relative z-10">
        <motion.div 
          className="max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 tracking-wider sawmill-text-shadow"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-sawmill-light-brown via-sawmill-orange to-sawmill-amber bg-clip-text text-transparent">
              {headline}
            </span>
          </motion.h1>
          
          <motion.div
            className="h-2 w-48 bg-gradient-to-r from-sawmill-bark to-sawmill-orange mb-8 rounded-full animate-sawmill-glow"
            initial={{ width: 0 }}
            animate={{ width: 192 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          ></motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl mb-10 max-w-3xl text-gray-300 leading-relaxed sawmill-text-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {subtitle}
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="sawmill-button text-lg px-8 py-4 hover-grow animate-sawmill-glow"
              onClick={handlePrimaryCTAClick}
            >
              <Link to="/products" className="flex items-center gap-2">
                🌲 {primaryCTA}
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-2 border-sawmill-orange text-sawmill-orange hover:bg-sawmill-orange hover:text-white font-bold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 sawmill-hover"
              onClick={handleSecondaryCTAClick}
            >
              <Link to="/contact" className="flex items-center gap-2">
                🔨 {secondaryCTA}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
