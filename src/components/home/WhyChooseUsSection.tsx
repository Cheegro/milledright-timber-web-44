
import React from 'react';
import { Shield, Zap, Target, Flame, Wrench, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const WhyChooseUsSection = () => {
  const qualityFeatures = [
    {
      icon: <Shield className="h-12 w-12 text-sawmill-orange" />,
      title: "PREMIUM QUALITY",
      description: "We reject mediocrity. Every slab is crafted with uncompromising standards. Premium wood that exceeds expectations.",
      delay: 0.1
    },
    {
      icon: <Zap className="h-12 w-12 text-sawmill-auburn" />,
      title: "PRECISION MILLING",
      description: "Advanced Wood-Mizer equipment delivers cuts with exceptional accuracy. Professional-grade sawmill technology for superior results.",
      delay: 0.2
    },
    {
      icon: <Target className="h-12 w-12 text-sawmill-orange" />,
      title: "CUSTOM SOLUTIONS",
      description: "Personalized approach to every project. Bring your logs, your vision, your specifications. We mill exactly to your requirements.",
      delay: 0.3
    },
    {
      icon: <Flame className="h-12 w-12 text-sawmill-auburn" />,
      title: "PASSIONATE CRAFTSMANSHIP",
      description: "Dedicated artisans who take pride in their work. We're craftsmen committed to excellence and superior quality lumber.",
      delay: 0.4
    },
    {
      icon: <Wrench className="h-12 w-12 text-sawmill-orange" />,
      title: "PROFESSIONAL EQUIPMENT",
      description: "State-of-the-art sawmill equipment ensures maximum yield from every log. Efficient, precise, and reliable milling services.",
      delay: 0.5
    },
    {
      icon: <Award className="h-12 w-12 text-sawmill-auburn" />,
      title: "PROVEN EXCELLENCE",
      description: "Our reputation is built on consistent quality and customer satisfaction. Trusted by professionals and craftsmen throughout the region.",
      delay: 0.6
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden">
      {/* Industrial background elements */}
      <div className="absolute inset-0 industrial-grid opacity-30"></div>
      <div className="absolute inset-0 sawmill-texture"></div>
      
      {/* Animated accent lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sawmill-dark-brown via-sawmill-orange to-sawmill-auburn animate-industrial-pulse"></div>
      <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-sawmill-dark-brown via-sawmill-orange to-sawmill-auburn animate-industrial-pulse"></div>
      
      <div className="container-wide relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-sawmill-light-brown mb-6 tracking-wide text-shadow">
            WHY CHOOSE MILLEDRIGHT
          </h2>
          <div className="h-2 w-32 bg-gradient-to-r from-sawmill-orange to-sawmill-auburn mx-auto mb-6 rounded-full animate-sawmill-glow"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <span className="text-sawmill-orange font-bold">Committed to excellence</span> since day one. 
            We're the craftsmen who <span className="text-sawmill-auburn font-bold">deliver superior lumber</span> 
            and forge lasting relationships through uncompromising quality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {qualityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="sawmill-card p-8 text-center sawmill-hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full border-2 border-gray-600">
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
