
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Truck, Hammer, TreePine, Zap, Star, Award } from 'lucide-react';

const HeroSection = () => {
  const services = [
    {
      icon: <Hammer className="h-6 w-6" />,
      title: "Custom Structures",
      color: "bg-gradient-to-br from-sawmill-orange to-sawmill-orange-dark"
    },
    {
      icon: <TreePine className="h-6 w-6" />,
      title: "Live Edge Slabs",
      color: "bg-gradient-to-br from-sawmill-forest to-sawmill-auburn"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Custom Milling",
      color: "bg-gradient-to-br from-sawmill-orange to-sawmill-orange-dark"
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Firewood Sales",
      color: "bg-gradient-to-br from-sawmill-medium-brown to-sawmill-auburn"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sawmill-warm-white via-background to-sawmill-cream">
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-sawmill-orange/20 to-sawmill-orange-light/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-sawmill-forest/20 to-sawmill-auburn/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-br from-sawmill-orange-light/15 to-sawmill-orange/5 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, ${getComputedStyle(document.documentElement).getPropertyValue('--sawmill-orange') || '#FF6B35'} 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Main Content */}
      <div className="container-wide relative z-10 pt-20 pb-16">
        <div className="text-center max-w-6xl mx-auto">
          {/* Enhanced Hero Badge with awards */}
          <motion.div 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-sawmill-orange/10 to-sawmill-orange-light/10 backdrop-blur-sm text-sawmill-dark-brown px-6 py-3 rounded-full text-sm font-semibold mb-8 border-2 border-sawmill-orange/20 shadow-modern-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Award className="w-5 h-5 text-sawmill-orange" />
            <span className="flex items-center gap-2">
              Professional Sawmill Services
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-sawmill-orange text-sawmill-orange" />
                ))}
              </div>
            </span>
          </motion.div>

          {/* Enhanced Main Heading */}
          <motion.h1 
            className="display-xl mb-8 bg-gradient-to-r from-sawmill-dark-brown via-sawmill-medium-brown to-sawmill-auburn bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="block">Premium Lumber &</span>
            <span className="block bg-gradient-to-r from-sawmill-orange to-sawmill-orange-dark bg-clip-text text-transparent">
              Woodworking Solutions
            </span>
          </motion.h1>

          {/* Enhanced Description */}
          <motion.p 
            className="text-premium-lg text-sawmill-dark-brown mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From custom wooden structures and live edge slabs to dimensional lumber 
            and firewood - we handle all your wood needs. Plus, we accept free lumber 
            and can mill your logs with no money transaction required.
          </motion.p>

          {/* Enhanced Service Icons Grid */}
          <motion.div 
            className="premium-grid max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-card interactive-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`service-icon ${service.color} mb-4 mx-auto`}>
                  {service.icon}
                </div>
                <h3 className="text-premium-base text-sawmill-dark-brown font-bold text-center">
                  {service.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Call-to-Action Banner */}
          <motion.div 
            className="premium-banner text-left max-w-5xl mx-auto mb-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 wood-texture"></div>
            
            <div className="relative z-10">
              <h3 className="text-sawmill-orange mb-4 heading-md text-center font-bold">
                Get Your Logs Milled for FREE!*
              </h3>
              <p className="text-body text-sawmill-dark-brown mb-8 text-center max-w-4xl mx-auto">
                No cash payment required! We mill your logs in exchange for a percentage of the finished lumber. 
                It's the perfect solution for local landowners wanting to turn trees into a valuable asset.
              </p>
              <p className="text-body-sm text-sawmill-medium-brown mb-8 text-center">
                This offer is for customers in our service area. Drop your logs off at our yard, 
                or ask about our pickup service—available for accessible log piles that are ready to load.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button className="modern-button-primary group" asChild>
                  <Link to="/contact">
                    Explore Our Services
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button className="modern-button-secondary" asChild>
                  <Link to="/contact">
                    Get Custom Quote
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
    </section>
  );
};

export default HeroSection;
