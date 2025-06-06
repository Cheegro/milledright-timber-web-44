import React from 'react';
import { Shield, Zap, Target, Flame, Wrench, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const WhyChooseUsSection = () => {
  const rebelliousFeatures = [
    {
      icon: <Shield className="h-12 w-12 text-red-500" />,
      title: "DEFIANT QUALITY",
      description: "We reject mediocrity. Every slab is a rebellion against mass-produced lumber. Premium wood that refuses to conform.",
      delay: 0.1
    },
    {
      icon: <Zap className="h-12 w-12 text-orange-500" />,
      title: "LIGHTNING PRECISION",
      description: "Betraying the slow, sloppy standards of corporate mills. Our Wood-Mizer equipment delivers cuts that defy expectations.",
      delay: 0.2
    },
    {
      icon: <Target className="h-12 w-12 text-yellow-500" />,
      title: "CUSTOM REBELLION",
      description: "Desert the one-size-fits-all approach. Bring your logs, your vision, your specifications. We mill YOUR way.",
      delay: 0.3
    },
    {
      icon: <Flame className="h-12 w-12 text-red-500" />,
      title: "PASSION IGNITED",
      description: "Turncoats from corporate lumber yards find their home here. We're craftsmen who betrayed the ordinary for excellence.",
      delay: 0.4
    },
    {
      icon: <Wrench className="h-12 w-12 text-orange-500" />,
      title: "EQUIPMENT SUPERIORITY",
      description: "Renegade from rusty, outdated mills. Our professional-grade sawmill equipment ensures maximum yield from every log.",
      delay: 0.5
    },
    {
      icon: <Award className="h-12 w-12 text-yellow-500" />,
      title: "PROVEN DEFIANCE",
      description: "Deserters from big box stores become loyal revolutionaries. Our reputation is built on consistent rebellion against the norm.",
      delay: 0.6
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden">
      {/* Industrial background elements */}
      <div className="absolute inset-0 industrial-grid opacity-30"></div>
      <div className="absolute inset-0 renegade-texture"></div>
      
      {/* Animated accent lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 animate-industrial-pulse"></div>
      <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-red-600 via-orange-500 to-yellow-500 animate-industrial-pulse"></div>
      
      <div className="container-wide relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-sawmill-light-brown mb-6 tracking-wide renegade-text-shadow">
            WHY REBELS CHOOSE MILLEDRIGHT
          </h2>
          <div className="h-2 w-32 bg-gradient-to-r from-red-600 to-orange-600 mx-auto mb-6 rounded-full animate-renegade-glow"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <span className="text-red-400 font-bold">Betraying mediocrity</span> since day one. 
            We're the renegades who <span className="text-orange-400 font-bold">deserted conventional lumber</span> 
            to forge a path of uncompromising quality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rebelliousFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="renegade-card p-8 text-center renegade-hover"
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
