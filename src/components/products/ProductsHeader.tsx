
import React from 'react';
import { motion } from 'framer-motion';

const ProductsHeader = () => {
  return (
    <section className="relative bg-gradient-to-br from-sawmill-dark-brown via-sawmill-medium-brown to-sawmill-auburn text-white py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-sawmill-orange rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sawmill-light-brown rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-wide relative z-10">
        <motion.div
          className="text-center max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-sawmill-light-brown to-white bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Premium Lumber Products
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl text-sawmill-light-brown mb-12 leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From live edge slabs to dimensional lumber, discover our complete selection of quality wood products
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="w-16 h-16 bg-sawmill-orange rounded-full flex items-center justify-center mb-6 mx-auto">
                <div className="w-8 h-8 bg-white rounded opacity-80"></div>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-white">Live Edge Slabs</h3>
              <p className="text-lg text-sawmill-light-brown">Natural beauty preserved with expert craftsmanship</p>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="w-16 h-16 bg-sawmill-forest rounded-full flex items-center justify-center mb-6 mx-auto">
                <div className="w-8 h-8 bg-white rounded opacity-80"></div>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-white">Dimensional Lumber</h3>
              <p className="text-lg text-sawmill-light-brown">Precision cut to your exact specifications</p>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="w-16 h-16 bg-sawmill-auburn rounded-full flex items-center justify-center mb-6 mx-auto">
                <div className="w-8 h-8 bg-white rounded opacity-80"></div>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-white">Custom Milling</h3>
              <p className="text-lg text-sawmill-light-brown">Tailored solutions for your unique project</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsHeader;
