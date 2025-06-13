
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Clock, TreePine, Users } from 'lucide-react';

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Premium Quality",
      description: "Every piece of lumber is carefully selected and processed to meet the highest standards of quality and grain excellence."
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Fast Processing",
      description: "Efficient sawmill operation means quick turnaround times without compromising on quality or attention to detail."
    },
    {
      icon: <TreePine className="h-8 w-8 text-primary" />,
      title: "Local Sourcing",
      description: "We source our logs locally from sustainable sources, supporting the local economy and reducing environmental impact."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Expert Service",
      description: "Our experienced team provides personalized service and expert advice for all your lumber and milling needs."
    }
  ];

  return (
    <section className="py-20 bg-secondary/50">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Choose MilledRight Sawmill?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              With years of experience and state-of-the-art equipment, we deliver exceptional lumber products and services that exceed expectations.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border border-border shadow-md hover:shadow-lg transition-shadow bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-foreground mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="/lovable-uploads/25ede0d7-5f16-4f08-b2d2-7155a2a10f2f.png" 
                alt="Quality lumber stacked and organized at MilledRight Sawmill"
                className="object-cover w-full h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
            
            {/* Decorative element */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/30 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
