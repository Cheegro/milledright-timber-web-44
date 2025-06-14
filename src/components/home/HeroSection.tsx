import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Truck, Hammer, TreePine, Zap } from 'lucide-react';
const HeroSection = () => {
  const services = [{
    icon: <Hammer className="h-6 w-6" />,
    title: "Custom Structures",
    color: "bg-primary"
  }, {
    icon: <TreePine className="h-6 w-6" />,
    title: "Live Edge Slabs",
    color: "bg-secondary"
  }, {
    icon: <Zap className="h-6 w-6" />,
    title: "Custom Milling",
    color: "bg-primary"
  }, {
    icon: <Truck className="h-6 w-6" />,
    title: "Firewood Sales",
    color: "bg-secondary"
  }];
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Main Content */}
      <div className="container-wide relative z-10 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Badge */}
          <motion.div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 border border-primary/20" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }}>
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            Professional Sawmill Services
          </motion.div>

          {/* Main Heading */}
          <motion.h1 className="heading-xl mb-6" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }}>
            <span className="text-primary">Complete</span> Lumber & Woodworking{' '}
            <span className="block mt-2">Solutions</span>
          </motion.h1>

          {/* Description */}
          <motion.p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            From custom wooden structures and live edge slabs to dimensional lumber 
            and firewood - we handle all your wood needs. Plus, we accept free lumber 
            and can mill your logs with no money transaction required.
          </motion.p>

          {/* Service Icons Grid */}
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }}>
            {services.map((service, index) => <div key={index} className="flex flex-col items-center gap-3 p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300 group">
                <div className={`${service.color} text-white p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <span className="text-sm font-medium text-foreground text-center">
                  {service.title}
                </span>
              </div>)}
          </motion.div>

          {/* Call-to-Action Banner */}
          <motion.div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 mb-12 text-left max-w-3xl mx-auto" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }}>
            <h3 className="text-primary mb-3 text-2xl font-medium text-center">Get Your Logs Milled for FREE!*</h3>
            <p className="text-muted-foreground mb-6 text-center font-light">No cash payment required! We mill your logs in exchange for a percentage of the finished lumber. It's the perfect solution for local landowners wanting to turn trees into a valuable asset.

This offer is for customers in our service area. Drop your logs off at our yard, or ask about our pickup service—available for accessible log piles that are ready to load.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-8 py-3 font-medium group" asChild>
                <Link to="/contact">
                  Explore Our Services
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" className="border-border hover:bg-secondary rounded-lg px-8 py-3 font-medium" asChild>
                <Link to="/contact">
                  Get Custom Quote
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>;
};
export default HeroSection;