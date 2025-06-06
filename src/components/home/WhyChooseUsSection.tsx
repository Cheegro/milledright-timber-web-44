
import React from 'react';
import { Shield, TreePine, Target, Hammer, Wrench, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const WhyChooseUsSection = () => {
  const sawmillFeatures = [
    {
      icon: <Shield className="h-12 w-12 text-sawmill-orange" />,
      title: "PREMIUM QUALITY",
      description: "We reject mediocrity. Every slab is handpicked from the finest local timber. Premium wood that meets the highest sawmill standards.",
      delay: 0.1
    },
    {
      icon: <TreePine className="h-12 w-12 text-sawmill-amber" />,
      title: "PRECISION MILLING",
      description: "State-of-the-art Wood-Mizer equipment delivers cuts that exceed expectations. Professional-grade sawmill precision for every project.",
      delay: 0.2
    },
    {
      icon: <Target className="h-12 w-12 text-sawmill-sage" />,
      title: "CUSTOM SOLUTIONS",
      description: "Your vision, our expertise. Bring your logs, your specifications, your dreams. We mill YOUR way, not the corporate way.",
      delay: 0.3
    },
    {
      icon: <Hammer className="h-12 w-12 text-sawmill-orange" />,
      title: "CRAFTSMAN PASSION",
      description: "True artisans who understand wood. We're craftsmen who chose quality over quantity, precision over profit margins.",
      delay: 0.4
    },
    {
      icon: <Wrench className="h-12 w-12 text-sawmill-amber" />,
      title: "MODERN EQUIPMENT",
      description: "Professional-grade sawmill equipment ensures maximum yield from every log. Advanced technology meets traditional craftsmanship.",
      delay: 0.5
    },
    {
      icon: <Award className="h-12 w-12 text-sawmill-sage" />,
      title: "PROVEN EXCELLENCE",
      description: "Local reputation built on consistent quality. Our commitment to excellence has earned the trust of craftsmen across the region.",
      delay: 0.6
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-sawmill-dark-gray via-sawmill-dark-brown to-black relative overflow-hidden">
      {/* Industrial background elements */}
      <div className="absolute inset-0 industrial-grid opacity-30"></div>
      <div className="absolute inset-0 sawmill-texture"></div>
      
      {/* Animated accent lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sawmill-bark via-sawmill-orange to-sawmill-amber animate-industrial-pulse"></div>
      <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-sawmill-bark via-sawmill-orange to-sawmill-amber animate-industrial-pulse"></div>
      
      <div className="container-wide relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-100 mb-6 tracking-wide">
            <span className="bg-gradient-to-r from-sawmill-light-brown via-sawmill-orange to-sawmill-amber bg-clip-text text-transparent sawmill-text-shadow">
              WHY CHOOSE MILLEDRIGHT
            </span>
          </h2>
          <div className="h-2 w-32 bg-gradient-to-r from-sawmill-bark to-sawmill-orange mx-auto mb-6 rounded-full animate-sawmill-glow"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <span className="text-sawmill-orange font-bold">Elevating craftsmanship</span> since day one. 
            We're the sawmill that <span className="text-sawmill-amber font-bold">chose quality over quantity</span> 
            to forge a path of uncompromising excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sawmillFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="sawmill-card p-8 text-center sawmill-hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-sawmill-dark-gray to-sawmill-steel rounded-full border-2 border-sawmill-mid-gray">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-black text-white mb-4 tracking-wide">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
