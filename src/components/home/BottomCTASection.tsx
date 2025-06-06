
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Flame, Zap, Target, Wrench } from 'lucide-react';

const BottomCTASection = () => {
  return (
    <section className="py-20 text-white bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Industrial background elements */}
      <div className="absolute inset-0 industrial-grid opacity-40"></div>
      <div className="absolute inset-0 renegade-texture"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 animate-industrial-pulse"></div>
      <div className="absolute bottom-0 right-0 w-full h-2 bg-gradient-to-l from-red-600 via-orange-500 to-yellow-500 animate-industrial-pulse"></div>
      
      {/* Glowing corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-red-600/20 to-transparent rounded-full blur-3xl animate-industrial-pulse"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-orange-600/20 to-transparent rounded-full blur-3xl animate-industrial-pulse"></div>
      
      <div className="container-wide text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-4 mb-8">
            <div className="p-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-full animate-renegade-glow">
              <Flame className="h-10 w-10 text-white" />
            </div>
            <div className="p-4 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-full animate-renegade-glow">
              <Zap className="h-10 w-10 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-wide text-sawmill-light-brown renegade-text-shadow">
            READY TO START YOUR LUMBER REBELLION?
          </h2>
          
          <div className="h-2 w-48 bg-gradient-to-r from-red-600 to-orange-600 mx-auto mb-8 rounded-full animate-renegade-glow"></div>
          
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-gray-300">
            <span className="text-red-400 font-bold">Break free</span> from ordinary lumber suppliers. 
            Visit our renegade sawmill to discover premium wood that 
            <span className="text-orange-400 font-bold"> defies convention</span> or discuss how we can 
            <span className="text-yellow-400 font-bold">revolutionize</span> your custom milling needs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            <div className="renegade-card p-6 renegade-hover">
              <Target className="h-8 w-8 text-red-500 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">PREMIUM REBELLION</h3>
              <p className="text-gray-300">Live edge slabs that break all the rules</p>
            </div>
            <div className="renegade-card p-6 renegade-hover">
              <Wrench className="h-8 w-8 text-orange-500 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">CUSTOM DEFIANCE</h3>
              <p className="text-gray-300">Milling services that refuse to conform</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Button 
              size="lg" 
              className="renegade-button text-lg px-10 py-4 hover-grow animate-renegade-glow"
            >
              <Link to="/contact" className="flex items-center gap-3">
                <Flame className="h-5 w-5" />
                IGNITE YOUR PROJECT
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white font-bold px-10 py-4 text-lg transition-all duration-300 transform hover:scale-105 renegade-hover"
            >
              <Link to="/products" className="flex items-center gap-3">
                <Zap className="h-5 w-5" />
                DEFY THE ORDINARY
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomCTASection;
