
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TreePine, Hammer } from 'lucide-react';

const BottomCTASection = () => {
  return (
    <section className="py-20 text-white bg-gradient-to-br from-sawmill-dark-brown via-black to-sawmill-dark-gray relative overflow-hidden">
      {/* Industrial background elements */}
      <div className="absolute inset-0 industrial-grid opacity-40"></div>
      <div className="absolute inset-0 sawmill-texture"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sawmill-bark via-sawmill-orange to-sawmill-amber animate-industrial-pulse"></div>
      <div className="absolute bottom-0 right-0 w-full h-2 bg-gradient-to-l from-sawmill-bark via-sawmill-orange to-sawmill-amber animate-industrial-pulse"></div>
      
      {/* Glowing corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-sawmill-bark/20 to-transparent rounded-full blur-3xl animate-industrial-pulse"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-sawmill-orange/20 to-transparent rounded-full blur-3xl animate-industrial-pulse"></div>
      
      <div className="container-wide text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-4 mb-8">
            <div className="p-4 bg-gradient-to-r from-sawmill-bark to-sawmill-orange rounded-full animate-sawmill-glow">
              <TreePine className="h-10 w-10 text-white" />
            </div>
            <div className="p-4 bg-gradient-to-r from-sawmill-orange to-sawmill-amber rounded-full animate-sawmill-glow">
              <Hammer className="h-10 w-10 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-wide">
            <span className="bg-gradient-to-r from-sawmill-light-brown via-sawmill-orange to-sawmill-amber bg-clip-text text-transparent sawmill-text-shadow">
              READY TO START YOUR PROJECT?
            </span>
          </h2>
          
          <div className="h-2 w-48 bg-gradient-to-r from-sawmill-bark to-sawmill-orange mx-auto mb-8 rounded-full animate-sawmill-glow"></div>
          
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-gray-300">
            <span className="text-sawmill-orange font-bold">Experience premium quality</span> lumber direct from our sawmill. 
            Visit us to discover wood that 
            <span className="text-sawmill-amber font-bold"> exceeds expectations</span> or discuss how we can 
            <span className="text-sawmill-sage font-bold">transform</span> your custom milling needs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            <div className="sawmill-card p-6 sawmill-hover">
              <h3 className="text-xl font-bold text-white mb-2">PREMIUM LUMBER</h3>
              <p className="text-gray-300">Live edge slabs that inspire creativity</p>
            </div>
            <div className="sawmill-card p-6 sawmill-hover">
              <h3 className="text-xl font-bold text-white mb-2">CUSTOM MILLING</h3>
              <p className="text-gray-300">Precision services tailored to your vision</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Button 
              size="lg" 
              className="sawmill-button text-lg px-10 py-4 hover-grow animate-sawmill-glow"
            >
              <Link to="/contact" className="flex items-center gap-3">
                <TreePine className="h-5 w-5" />
                START YOUR PROJECT
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-2 border-sawmill-orange text-sawmill-orange hover:bg-sawmill-orange hover:text-white font-bold px-10 py-4 text-lg transition-all duration-300 transform hover:scale-105 sawmill-hover"
            >
              <Link to="/products" className="flex items-center gap-3">
                <Hammer className="h-5 w-5" />
                EXPLORE LUMBER
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomCTASection;
