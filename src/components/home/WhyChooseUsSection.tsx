
import React from 'react';

const WhyChooseUsSection = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container-wide">
        <h2 className="section-title text-center mx-auto">Why Choose MilledRight</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          <div className="text-center p-6">
            <div className="w-20 h-20 rounded-full bg-sawmill-dark-brown text-white flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-sawmill-dark-brown">Premium Quality</h3>
            <p className="text-sawmill-dark-gray">Hand-selected local lumber with attention to detail, ensuring the highest quality for your projects.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-20 h-20 rounded-full bg-sawmill-dark-brown text-white flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-sawmill-dark-brown">Local Sourcing</h3>
            <p className="text-sawmill-dark-gray">All our lumber comes from sustainably harvested local trees, supporting the regional economy.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-20 h-20 rounded-full bg-sawmill-dark-brown text-white flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-sawmill-dark-brown">Custom Services</h3>
            <p className="text-sawmill-dark-gray">Bring your logs to us, and we'll mill them to your exact specifications on-site.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-20 h-20 rounded-full bg-sawmill-dark-brown text-white flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold">4</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-sawmill-dark-brown">Expert Knowledge</h3>
            <p className="text-sawmill-dark-gray">Our team has years of experience and can help you select the perfect wood for your project.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
