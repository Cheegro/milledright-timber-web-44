
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

const FAQSection = () => {
  const renegadeFAQs = [
    {
      question: "Why should I betray my current lumber supplier for MilledRight?",
      answer: "Because you deserve better than mass-produced mediocrity. MilledRight rebels against corporate lumber standards, offering premium quality, custom milling, and personal service that big box stores can't match. We're the renegades who put craft over profit."
    },
    {
      question: "Can you handle custom milling for my renegade project specifications?",
      answer: "Absolutely. We specialize in defying one-size-fits-all approaches. Bring your logs, your vision, your exact specifications - our professional Wood-Mizer equipment can precision-cut lumber to your rebellious requirements. No project too unique."
    },
    {
      question: "What makes your live edge slabs different from ordinary lumber?",
      answer: "Our live edge slabs are handpicked rebels - each piece has deserted the conformity of straight edges to showcase nature's raw character. We preserve the authentic edge, figure, and grain that mass producers strip away. Every slab tells a story of rebellion against the ordinary."
    },
    {
      question: "Do you work with customers who want to break away from traditional furniture designs?",
      answer: "That's exactly the kind of revolutionary thinking we support! Our lumber is perfect for craftsmen who refuse to follow conventional patterns. Whether you're building industrial-style furniture, live edge masterpieces, or completely original designs - we supply the rebellious materials."
    },
    {
      question: "How do I know if your lumber quality will defy my expectations?",
      answer: "Our reputation is built on consistently betraying low expectations. We're local renegades who stake our name on quality - you can visit our sawmill, see our operation, and meet the craftsmen who refuse to compromise. Try getting that personal connection from a corporate lumber yard."
    },
    {
      question: "Can MilledRight help if I want to desert big box lumber stores permanently?",
      answer: "Welcome to the resistance! We've helped countless craftsmen break free from corporate lumber dependency. With our custom milling, diverse inventory, and commitment to quality, you'll never need to settle for big box mediocrity again. Join the rebellion."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden">
      {/* Industrial background elements */}
      <div className="absolute inset-0 industrial-grid opacity-20"></div>
      <div className="absolute inset-0 renegade-texture"></div>
      
      {/* Animated accent lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 animate-industrial-pulse"></div>
      <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-red-600 via-orange-500 to-yellow-500 animate-industrial-pulse"></div>
      
      <div className="container-wide relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-full animate-renegade-glow">
              <HelpCircle className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-gray-100 mb-6 tracking-wide">
            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent renegade-text-shadow">
              RENEGADE ANSWERS
            </span>
          </h2>
          <div className="h-2 w-24 bg-gradient-to-r from-red-600 to-orange-600 mx-auto mb-6 rounded-full animate-renegade-glow"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Questions from fellow <span className="text-red-400 font-bold">rebels</span> who've 
            <span className="text-orange-400 font-bold"> betrayed ordinary lumber</span> for our premium quality
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {renegadeFAQs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="renegade-card border-0 renegade-hover"
              >
                <AccordionTrigger className="text-left text-lg font-bold text-white hover:text-red-400 px-8 py-6 hover:no-underline">
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
