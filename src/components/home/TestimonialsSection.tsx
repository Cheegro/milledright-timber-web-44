
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPublishedTestimonials } from '@/api/adminTestimonialApi';
import { Loader2, Quote, Star } from 'lucide-react';

const TestimonialsSection = () => {
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['published-testimonials'],
    queryFn: fetchPublishedTestimonials,
  });

  // Fallback testimonials with sawmill theme
  const fallbackTestimonials = [
    {
      id: 'fallback-1',
      text: "MilledRight's live edge maple slab completely transformed my vision. The quality of their milling exceeded every expectation. True craftsmanship that stands apart from mass production.",
      author: "Jake R., Furniture Craftsman",
      location: "Barrie"
    },
    {
      id: 'fallback-2',
      text: "I brought my own logs for custom milling. MilledRight's expertise turned my raw timber into beautiful lumber. No corporate mill could match this level of personal service.",
      author: "Marcus T., Workshop Owner",
      location: "Orillia"
    },
    {
      id: 'fallback-3',
      text: "As a craftsman who demands quality materials, MilledRight's lumber is unmatched. They understand that some projects require exceptional wood.",
      author: "Sarah L., Cabinet Maker",
      location: "Beaverton"
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials.slice(0, 3) : fallbackTestimonials;

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-r from-sawmill-dark-gray via-sawmill-dark-brown to-sawmill-dark-gray relative overflow-hidden">
        <div className="absolute inset-0 industrial-grid opacity-20"></div>
        <div className="container-wide relative z-10">
          <h2 className="section-title text-center mx-auto">CLIENT TESTIMONIALS</h2>
          <div className="flex justify-center py-8">
            <div className="sawmill-card p-8">
              <Loader2 className="h-10 w-10 animate-spin text-sawmill-orange mx-auto" />
              <p className="text-gray-300 mt-4 font-bold">LOADING CLIENT STORIES...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-r from-sawmill-dark-gray via-sawmill-dark-brown to-sawmill-dark-gray relative overflow-hidden">
      {/* Industrial background elements */}
      <div className="absolute inset-0 industrial-grid opacity-20"></div>
      <div className="absolute inset-0 sawmill-texture"></div>
      
      {/* Animated accent elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sawmill-bark via-sawmill-orange to-sawmill-amber animate-industrial-pulse"></div>
      <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-sawmill-bark via-sawmill-orange to-sawmill-amber animate-industrial-pulse"></div>
      
      <div className="container-wide relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-100 mb-6 tracking-wide">
            <span className="bg-gradient-to-r from-sawmill-light-brown via-sawmill-orange to-sawmill-amber bg-clip-text text-transparent sawmill-text-shadow">
              CRAFTSMEN TESTIMONIALS
            </span>
          </h2>
          <div className="h-2 w-24 bg-gradient-to-r from-sawmill-bark to-sawmill-orange mx-auto mb-6 rounded-full animate-sawmill-glow"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Hear from fellow <span className="text-sawmill-orange font-bold">craftsmen</span> who chose 
            <span className="text-sawmill-amber font-bold"> MilledRight</span> for premium lumber
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {displayTestimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="sawmill-card p-8 sawmill-hover animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-start gap-4 mb-6">
                <Quote className="h-8 w-8 text-sawmill-orange flex-shrink-0 mt-1" />
                <p className="italic text-gray-300 text-lg leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
              
              <div className="border-t border-sawmill-steel pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-lg">{testimonial.author}</p>
                    <p className="text-sawmill-amber font-medium">{testimonial.location}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-sawmill-amber fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Link 
            to="/reviews"
            className="inline-flex items-center gap-2 text-sawmill-orange hover:text-sawmill-amber font-bold text-lg transition-all duration-300 sawmill-hover"
          >
            <Quote className="h-5 w-5" />
            READ MORE CLIENT STORIES
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
