
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Hammer, Wrench, TreePine, Truck } from 'lucide-react';

const WhyChooseUsSection = () => {
  const services = [
    {
      icon: <TreePine className="h-8 w-8" />,
      title: "Custom Log Milling",
      description: "Bring your logs to us and we'll mill them to your exact specifications. From rough lumber to finished boards.",
      projectType: "mill-logs",
      ctaText: "Get Milling Quote"
    },
    {
      icon: <Hammer className="h-8 w-8" />,
      title: "Custom Built Structures",
      description: "Tables, countertops, furniture, and more. We create beautiful pieces from your vision.",
      projectType: "custom-table",
      ctaText: "Get Custom Quote"
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "Expert Craftsmanship",
      description: "With years of experience, we ensure every cut is precise and every piece meets our high standards.",
      projectType: "furniture",
      ctaText: "Get Furniture Quote"
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Delivery Available",
      description: "We can deliver your lumber and custom pieces directly to your location in the Greater Toronto Area.",
      projectType: "other",
      ctaText: "Get Delivery Quote"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="section-title">Why Choose MilledRight?</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            From raw logs to finished masterpieces, we provide quality milling services 
            and custom woodworking that brings your vision to life.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="bg-sawmill-orange rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-white">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-sawmill-dark-brown">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Button 
                  className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown text-white"
                  onClick={() => {
                    // Scroll to quote section with pre-selected project type
                    const quoteSection = document.getElementById('quote-section');
                    if (quoteSection) {
                      quoteSection.scrollIntoView({ behavior: 'smooth' });
                      // Update URL with project type parameter
                      const url = new URL(window.location.href);
                      url.searchParams.set('project', service.projectType);
                      window.history.replaceState({}, '', url.toString());
                      // Small delay to allow scroll to complete, then trigger form update
                      setTimeout(() => {
                        window.location.reload();
                      }, 500);
                    }
                  }}
                >
                  {service.ctaText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
