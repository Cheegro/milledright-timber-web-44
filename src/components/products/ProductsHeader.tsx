
import React from 'react';
import { motion } from 'framer-motion';

const ProductsHeader = () => {
  return (
    <div className="relative bg-sawmill-dark-brown py-16">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <pattern id="woodPattern" patternUnits="userSpaceOnUse" width="100" height="100">
            <rect x="0" y="0" width="100" height="100" fill="none" />
            <path d="M0 50 Q25 0 50 50 T100 50" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M0 70 Q25 20 50 70 T100 70" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M0 30 Q25 -20 50 30 T100 30" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#woodPattern)" />
        </svg>
      </div>
      
      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Live Edge Lumber</h1>
          <p className="text-lg text-white/80 max-w-2xl">
            Browse our selection of premium live edge slabs and custom-milled lumber for your woodworking projects.
            Each piece tells a unique story through its natural grain, knots, and character.
          </p>
        </motion.div>
        
        <div className="mt-8 flex flex-wrap gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3">
            <div className="h-12 w-12 bg-sawmill-orange rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-white">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div>
              <h3 className="text-white font-medium">Kiln-Dried</h3>
              <p className="text-white/70 text-sm">Stable moisture content</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3">
            <div className="h-12 w-12 bg-sawmill-orange rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-white">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div>
              <h3 className="text-white font-medium">Locally Sourced</h3>
              <p className="text-white/70 text-sm">Sustainable forestry</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3">
            <div className="h-12 w-12 bg-sawmill-orange rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-white">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div>
              <h3 className="text-white font-medium">Custom Dimensions</h3>
              <p className="text-white/70 text-sm">Cut to your specifications</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsHeader;
