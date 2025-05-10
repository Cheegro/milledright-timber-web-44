
import React from 'react';
import { Link } from 'react-router-dom';

const TestimonialsSection = () => {
  // Sample testimonials
  const testimonials = [
    {
      id: 1,
      text: "The live edge maple slab I purchased from MilledRight was absolutely stunning. The quality was even better than I expected, and the team was so helpful in helping me select the perfect piece.",
      author: "John D., Furniture Maker",
      location: "Barrie"
    },
    {
      id: 2,
      text: "I brought my own logs to be milled and couldn't be happier with the results. Fair pricing and expert cutting - I'll definitely be returning with more logs next season.",
      author: "Michael T., Hobbyist",
      location: "Orillia"
    },
    {
      id: 3,
      text: "The quality of lumber from MilledRight is consistently excellent. As a professional woodworker, I depend on good materials, and they never disappoint.",
      author: "Sarah L., Cabinet Maker",
      location: "Beaverton"
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container-wide">
        <h2 className="section-title text-center mx-auto">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic text-sawmill-dark-gray mb-4">"{testimonial.text}"</p>
              <div>
                <p className="font-bold text-sawmill-dark-brown">{testimonial.author}</p>
                <p className="text-sawmill-medium-brown">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/reviews"
            className="text-sawmill-orange hover:text-sawmill-auburn font-medium underline"
          >
            Read More Customer Reviews
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
