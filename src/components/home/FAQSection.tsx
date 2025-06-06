
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

const FAQSection = () => {
  const sawmillFAQs = [
    {
      question: "Why should I choose MilledRight over larger lumber suppliers?",
      answer: "Because you deserve better than mass-produced mediocrity. MilledRight offers premium quality, custom milling, and personal service that big box stores can't match. We're local craftsmen who put quality over profit margins."
    },
    {
      question: "Can you handle custom milling for my specific project requirements?",
      answer: "Absolutely. We specialize in precision custom milling. Bring your logs, your vision, your exact specifications - our professional Wood-Mizer equipment can precision-cut lumber to your requirements. No project is too unique for our sawmill."
    },
    {
      question: "What makes your live edge slabs different from ordinary lumber?",
      answer: "Our live edge slabs are handpicked premium pieces - each showcasing nature's authentic character. We preserve the natural edge, figure, and grain that mass producers strip away. Every slab tells a story of natural beauty and craftsmanship."
    },
    {
      question: "Do you work with customers who have unique furniture design ideas?",
      answer: "That's exactly the kind of creative thinking we support! Our lumber is perfect for craftsmen who want exceptional materials for their projects. Whether you're building custom furniture, live edge masterpieces, or original designs - we supply premium materials."
    },
    {
      question: "How do I know if your lumber quality will meet my high standards?",
      answer: "Our reputation is built on consistently exceeding expectations. We're local craftsmen who stake our name on quality - you can visit our sawmill, see our operation, and meet the people who refuse to compromise. Try getting that personal connection from a corporate lumber yard."
    },
    {
      question: "Can MilledRight be my reliable long-term lumber supplier?",
      answer: "Welcome to the family! We've helped countless craftsmen establish reliable lumber sources. With our custom milling, diverse inventory, and commitment to quality, you'll have a dependable partner for all your premium lumber needs."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-sawmill-dark-gray via-sawmill-dark-brown to-black relative overflow-hidden">
      {/* Industrial background elements */}
      <div className="absolute inset-0 industrial-grid opacity-20"></div>
      <div className="absolute inset-0 sawmill-texture"></div>
      
      {/* Animated accent lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sawmill-bark via-sawmill-orange to-sawmill-amber animate-industrial-pulse"></div>
      <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-sawmill-bark via-sawmill-orange to-sawmill-amber animate-industrial-pulse"></div>
      
      <div className="container-wide relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-sawmill-bark to-sawmill-orange rounded-full animate-sawmill-glow">
              <HelpCircle className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-gray-100 mb-6 tracking-wide">
            <span className="bg-gradient-to-r from-sawmill-light-brown via-sawmill-orange to-sawmill-amber bg-clip-text text-transparent sawmill-text-shadow">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </h2>
          <div className="h-2 w-24 bg-gradient-to-r from-sawmill-bark to-sawmill-orange mx-auto mb-6 rounded-full animate-sawmill-glow"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Questions from fellow <span className="text-sawmill-orange font-bold">craftsmen</span> who've 
            <span className="text-sawmill-amber font-bold"> chosen premium lumber</span> for their projects
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {sawmillFAQs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="sawmill-card border-0 sawmill-hover"
              >
                <AccordionTrigger className="text-left text-lg font-bold text-white hover:text-sawmill-orange px-8 py-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 px-8 pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
