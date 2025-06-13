
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Truck, Settings, TreePine, Award } from 'lucide-react';

const EquipmentShowcaseSection = () => {
  const equipmentFeatures = [
    {
      icon: <Settings className="h-8 w-8 text-primary" />,
      title: "Professional Wood-Mizer Equipment",
      description: "Our LT70 sawmill ensures precise cuts and maximum yield from every log",
      image: "/lovable-uploads/4775c114-fbd6-4ab0-8468-8fa4293e8e04.png"
    },
    {
      icon: <TreePine className="h-8 w-8 text-primary" />,
      title: "Quality Log Selection",
      description: "Carefully selected local hardwoods and softwoods for superior lumber quality",
      image: "/lovable-uploads/f6867bdf-cb8b-43da-aa3a-df1742b927b9.png"
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Expert Processing",
      description: "From raw logs to finished lumber with attention to grain and quality",
      image: "/lovable-uploads/6fc07e94-27d7-461d-876e-adbd33260c07.png"
    },
    {
      icon: <Truck className="h-8 w-8 text-primary" />,
      title: "Ready for Delivery",
      description: "Properly stacked, dried, and organized lumber ready for your projects",
      image: "/lovable-uploads/25ede0d7-5f16-4f08-b2d2-7155a2a10f2f.png"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container-wide">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Professional Sawmill Operation
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our state-of-the-art equipment and experienced operation ensures you get the highest quality lumber from locally sourced logs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {equipmentFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border border-border shadow-lg bg-card">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EquipmentShowcaseSection;
