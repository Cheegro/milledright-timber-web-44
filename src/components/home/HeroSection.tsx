
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useSettings } from '@/hooks/useSettings';

const HeroSection = () => {
  const { getSetting } = useSettings();

  const headline = getSetting('hero_headline', 'Quality Lumber Direct From Our Sawmill');
  const subtitle = getSetting('hero_subtitle', 'From live edge slabs to dimensional lumber, MilledRight Sawmill provides premium locally sourced wood products and custom milling services.');
  const primaryCTA = getSetting('hero_primary_cta', 'Browse Our Products');
  const secondaryCTA = getSetting('hero_secondary_cta', 'Request Custom Milling');

  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, parameters);
    }
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', eventName, parameters);
    }
  };

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
              onClick={() => trackEvent('hero_primary_cta_click', { button_text: primaryCTA })}
            >
              <Link to="/products">{primaryCTA}</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-sawmill-dark-brown transition-all duration-300"
              onClick={() => trackEvent('hero_secondary_cta_click', { button_text: secondaryCTA })}
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
