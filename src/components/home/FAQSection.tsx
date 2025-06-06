
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What types of lumber do you offer?",
    answer: "We offer a variety of lumber types including hardwoods like walnut, maple, cherry, oak, ash, hickory, and elm. We specialize in live edge slabs but also provide dimensional lumber, hardwoods, softwoods, and special cuts."
  },
  {
    question: "Do you offer custom milling services?",
    answer: "Yes, we provide custom milling services for your specific project needs. We can mill your logs to your exact specifications, whether you need special dimensions, cuts, or finishes. Contact us with your requirements for a custom quote."
  },
  {
    question: "How do I determine what size slab I need for my project?",
    answer: "The size of slab you need depends on your specific project. For dining tables, we typically recommend slabs that are 30-36 inches wide and 60-96 inches long. For coffee tables, consider slabs 18-24 inches wide and 36-48 inches long. We're happy to provide guidance based on your specific needs."
  },
  {
    question: "How much does a typical live edge slab cost?",
    answer: "Live edge slab pricing varies based on wood species, dimensions, and unique characteristics. Our slabs typically range from $70 to $110 per board foot. Rare or highly figured wood may be priced higher. Contact us for specific pricing on our current inventory."
  },
  {
    question: "Do you deliver or ship your lumber?",
    answer: "Yes, we offer both local delivery and nationwide shipping. Local delivery fees vary based on distance, while shipping costs depend on weight, dimensions, and destination. Contact us for a shipping quote to your location."
  },
  {
    question: "How should I maintain my live edge table or furniture?",
    answer: "To maintain your live edge pieces, dust regularly with a soft cloth, clean with a mild soap solution when needed, and avoid placing hot items directly on the surface. We recommend applying a furniture wax or refresher oil once or twice a year to maintain the finish."
  }
];

const FAQSection = () => {
  return (
    <section className="py-16 bg-sawmill-light-brown/10">
      <div className="container-wide">
        <h2 className="section-title text-center mx-auto">Frequently Asked Questions</h2>
        
        <div className="mt-10 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-sawmill-dark-brown">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
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
