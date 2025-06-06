
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Flame, Zap, Phone } from 'lucide-react';

const ProductsCallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Industrial background elements */}
      <div className="absolute inset-0 industrial-grid opacity-40"></div>
      <div className="absolute inset-0 sawmill-texture"></div>
      
      {/* Animated accent lines */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sawmill-dark-brown via-sawmill-orange to-sawmill-auburn animate-industrial-pulse"></div>
      <div className="absolute bottom-0 right-0 w-full h-2 bg-gradient-to-l from-sawmill-dark-brown via-sawmill-orange to-sawmill-auburn animate-industrial-pulse"></div>
      
      <div className="container-wide text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="p-6 bg-gradient-to-r from-sawmill-orange to-sawmill-auburn rounded-full animate-sawmill-glow">
              <Flame className="h-16 w-16 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-wide text-sawmill-light-brown text-shadow">
            CAN'T FIND WHAT YOU NEED?
          </h2>
          
          <div className="h-2 w-32 bg-gradient-to-r from-sawmill-orange to-sawmill-auburn mx-auto mb-8 rounded-full animate-sawmill-glow"></div>
          
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-gray-300">
            <span className="text-sawmill-orange font-bold">Expand your possibilities!</span> 
            Our inventory is constantly evolving. If you don't see the perfect piece, 
            <span className="text-sawmill-auburn font-bold"> contact our expert team</span> - 
            we'll help you find or create exactly what you need to 
            <span className="text-sawmill-light-brown font-bold">complete your vision</span>.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="sawmill-card p-6 sawmill-hover">
              <Zap className="h-8 w-8 text-sawmill-orange mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">CUSTOM REQUESTS</h3>
              <p className="text-gray-300">Tailored lumber solutions for unique projects</p>
            </div>
            <div className="sawmill-card p-6 sawmill-hover">
              <Phone className="h-8 w-8 text-sawmill-auburn mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">DIRECT CONNECTION</h3>
              <p className="text-gray-300">Speak directly with experienced craftsmen</p>
            </div>
            <div className="sawmill-card p-6 sawmill-hover">
              <Flame className="h-8 w-8 text-sawmill-orange mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">RAPID RESPONSE</h3>
              <p className="text-gray-300">Quick answers from professionals who understand your needs</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Button 
              size="lg" 
              className="sawmill-button text-lg px-10 py-4 hover-grow animate-sawmill-glow"
            >
              <Link to="/contact" className="flex items-center gap-3">
                <Flame className="h-5 w-5" />
                CONTACT OUR EXPERTS
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-2 border-sawmill-orange text-sawmill-orange hover:bg-sawmill-orange hover:text-white font-bold px-10 py-4 text-lg transition-all duration-300 transform hover:scale-105 sawmill-hover"
            >
              <Link to="/board-foot-calculator" className="flex items-center gap-3">
                <Zap className="h-5 w-5" />
                CALCULATE YOUR NEEDS
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsCallToAction;
