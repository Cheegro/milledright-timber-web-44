import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPublishedTestimonials } from '@/api/adminTestimonialApi';
import { Loader2 } from 'lucide-react';
const TestimonialsSection = () => {
  const {
    data: testimonials = [],
    isLoading
  } = useQuery({
    queryKey: ['published-testimonials'],
    queryFn: fetchPublishedTestimonials
  });

  // Fallback testimonials if none are published yet
  const fallbackTestimonials = [{
    id: 'fallback-1',
    text: "The live edge maple slab I purchased from MilledRight was absolutely stunning. The quality was even better than I expected, and the team was so helpful in helping me select the perfect piece.",
    author: "John D., Furniture Maker",
    location: "Barrie"
  }, {
    id: 'fallback-2',
    text: "I brought my own logs to be milled and couldn't be happier with the results. Fair pricing and expert cutting - I'll definitely be returning with more logs next season.",
    author: "Michael T., Hobbyist",
    location: "Orillia"
  }, {
    id: 'fallback-3',
    text: "The quality of lumber from MilledRight is consistently excellent. As a professional woodworker, I depend on good materials, and they never disappoint.",
    author: "Sarah L., Cabinet Maker",
    location: "Beaverton"
  }];
  const displayTestimonials = testimonials.length > 0 ? testimonials.slice(0, 3) : fallbackTestimonials;
  if (isLoading) {
    return <section className="py-16 bg-gray-100">
        <div className="container-wide">
          <h2 className="section-title text-center mx-auto">What Our Customers Say</h2>
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>;
  }
  return <section className="py-16 bg-zinc-900">
      <div className="container-wide">
        <h2 className="section-title text-center mx-auto text-base font-extralight">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {displayTestimonials.map(testimonial => <div key={testimonial.id} className="p-6 rounded-lg shadow-md bg-zinc-800">
              <p className="italic text-foreground mb-4">"{testimonial.text}"</p>
              <div>
                <p className="font-bold text-primary">{testimonial.author}</p>
                <p className="text-foreground">{testimonial.location}</p>
              </div>
            </div>)}
        </div>
        
        <div className="text-center mt-12 rounded-none bg-zinc-900">
          <Link to="/reviews" className="text-primary hover:text-primary/80 font-medium underline">
            Read More Customer Reviews
          </Link>
        </div>
      </div>
    </section>;
};
export default TestimonialsSection;