
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useSettings } from '@/hooks/useSettings';
import { trackButtonClick } from '@/utils/analytics';

const HeroSection = () => {
  const { getSetting, isLoading } = useSettings();

  const headline = getSetting('hero_headline', 'Quality Lumber Direct From Our Sawmill');
  const subtitle = getSetting('hero_subtitle', 'From live edge slabs to dimensional lumber, MilledRight Sawmill provides premium locally sourced wood products and custom milling services.');
  const primaryCTA = getSetting('hero_primary_cta', 'Browse Our Products');
  const secondaryCTA = getSetting('hero_secondary_cta', 'Request Custom Milling');

  const handlePrimaryCTAClick = () => {
    trackButtonClick(primaryCTA, 'hero_primary');
  };

  const handleSecondaryCTAClick = () => {
    trackButtonClick(secondaryCTA, 'hero_secondary');
  };

  // Show loading state while settings are being fetched
  if (isLoading) {
    return (
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://lh3.googleusercontent.com/pw/AP1GczPTRLiCj-uABM3l1danyqwliakkiNlE1J2GunUYMhSQox9oWd_6xgYZ50AcIO39LB_tiSChg-kOvEOeg1Wd7qhXvShvHpCxdQLvYCJt7SOrzNZ7=w2400')` }}
        ></div>
        <div className="container-wide py-24 md:py-32 lg:py-40 relative z-10">
          <div className="max-w-3xl">
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
    <section className="relative bg-gray-900 text-white">
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://lh3.googleusercontent.com/pw/AP1GczPTRLiCj-uABM3l1danyqwliakkiNlE1J2GunUYMhSQox9oWd_6xgYZ50AcIO39LB_tiSChg-kOvEOeg1Wd7qhXvShvHpCxdQLvYCJt7SOrzNZ7=w2400')` }}
      ></div>
      
      <div className="container-wide py-24 md:py-32 lg:py-40 relative z-10">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow">
            {headline}
          </h1>
          <p className="text-xl mb-8 max-w-2xl text-shadow">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-sawmill-orange hover:bg-sawmill-auburn text-white transition-all duration-300 transform hover:scale-105"
              onClick={handlePrimaryCTAClick}
            >
              <Link to="/products">{primaryCTA}</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-sawmill-dark-brown transition-all duration-300"
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
