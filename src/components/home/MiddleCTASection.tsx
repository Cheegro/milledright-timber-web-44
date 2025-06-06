
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TreePine, Hammer } from 'lucide-react';

const MiddleCTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-sawmill-dark-brown via-black to-sawmill-dark-gray text-white relative overflow-hidden">
      {/* Industrial background elements */}
      <div className="absolute inset-0 industrial-grid opacity-30"></div>
      <div className="absolute inset-0 sawmill-texture"></div>
      
      {/* Animated accent lines */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sawmill-bark via-sawmill-orange to-sawmill-amber animate-industrial-pulse"></div>
      <div className="absolute bottom-0 right-0 w-full h-2 bg-gradient-to-l from-sawmill-bark via-sawmill-orange to-sawmill-amber animate-industrial-pulse"></div>
      
      <div className="container-wide text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-gradient-to-r from-sawmill-bark to-sawmill-orange rounded-full animate-sawmill-glow">
              <Hammer className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-wide">
            <span className="bg-gradient-to-r from-sawmill-light-brown via-sawmill-orange to-sawmill-amber bg-clip-text text-transparent sawmill-text-shadow">
              CUSTOM MILLING SERVICES
            </span>
          </h2>
          
          <div className="h-2 w-32 bg-gradient-to-r from-sawmill-bark to-sawmill-orange mx-auto mb-8 rounded-full animate-sawmill-glow"></div>
          
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed text-gray-300">
            Have logs that deserve professional treatment? 
            <span className="text-sawmill-orange font-bold"> Bring them to our sawmill</span> and we'll transform your timber into 
            <span className="text-sawmill-amber font-bold">premium lumber</span> 
            that meets your exact specifications.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="sawmill-card p-6 sawmill-hover">
              <h3 className="text-xl font-bold text-white mb-2">PRECISION CUTS</h3>
              <p className="text-gray-300">Professional sawmill accuracy</p>
            </div>
            <div className="sawmill-card p-6 sawmill-hover">
              <h3 className="text-xl font-bold text-white mb-2">YOUR SPECS</h3>
              <p className="text-gray-300">Custom dimensions and requirements</p>
            </div>
            <div className="sawmill-card p-6 sawmill-hover">
              <h3 className="text-xl font-bold text-white mb-2">CRAFT QUALITY</h3>
              <p className="text-gray-300">Artisan-level attention to detail</p>
            </div>
          </div>
          
          <Button 
            size="lg" 
            className="sawmill-button text-lg px-10 py-4 hover-grow animate-sawmill-glow"
          >
            <Link to="/contact" className="flex items-center gap-3">
              <TreePine className="h-5 w-5" />
              REQUEST CUSTOM MILLING
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MiddleCTASection;
