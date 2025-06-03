
import React from 'react';
import { motion } from 'framer-motion';

const ProductsHeader = () => {
  return (
    <section className="relative bg-sawmill-dark-brown text-white py-20">
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/lovable-uploads/f156b106-3ca8-4db3-97f9-b0f94a8eaba1.png')` }}
      ></div>
      
      <div className="container-wide relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow">
            Premium Lumber Products
          </h1>
          <p className="text-xl md:text-2xl text-sawmill-light-brown mb-8 text-shadow">
            From live edge slabs to dimensional lumber, discover our complete selection of quality wood products
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-2">Live Edge Slabs</h3>
              <p className="text-sawmill-light-brown">Natural beauty preserved</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-2">Dimensional Lumber</h3>
              <p className="text-sawmill-light-brown">Precision cut to your specs</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-2">Custom Milling</h3>
              <p className="text-sawmill-light-brown">Tailored to your project</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsHeader;
