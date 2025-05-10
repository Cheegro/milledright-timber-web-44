
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative bg-gray-900 text-white">
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/placeholder.svg')` }}
      ></div>
      
      <div className="container-wide py-24 md:py-32 lg:py-40 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow">
            Quality Lumber Direct From Our Sawmill
          </h1>
          <p className="text-xl mb-8 max-w-2xl text-shadow">
            From live edge slabs to dimensional lumber, MilledRight Sawmill provides premium locally sourced wood products and custom milling services.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-sawmill-orange hover:bg-sawmill-auburn text-white">
              <Link to="/products">Browse Our Products</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-sawmill-dark-brown">
              <Link to="/contact">Request Custom Milling</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
