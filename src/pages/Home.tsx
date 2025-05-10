
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection';
import MiddleCTASection from '@/components/home/MiddleCTASection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import BlogPostsSection from '@/components/home/BlogPostsSection';
import BottomCTASection from '@/components/home/BottomCTASection';
import MapEmbed from '@/components/MapEmbed';
import SharedBanner from '@/components/SharedBanner';
import FAQSection from '@/components/home/FAQSection';
import ProjectShowcaseSection from '@/components/home/ProjectShowcaseSection';
import QuickQuoteForm from '@/components/home/QuickQuoteForm';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Why Choose Us */}
      <WhyChooseUsSection />
      
      {/* Quick Quote Form & Value Props */}
      <section className="py-16 bg-gray-50">
        <div className="container-wide">
          <h2 className="section-title text-center mx-auto mb-10">Get a Free Quote for Your Project</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <QuickQuoteForm />
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-sawmill-orange">
                <h3 className="font-bold text-lg mb-2 text-sawmill-dark-brown">Premium Quality</h3>
                <p className="text-gray-700">Our lumber is carefully selected, properly dried, and expertly milled to ensure the highest quality for your projects.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-sawmill-orange">
                <h3 className="font-bold text-lg mb-2 text-sawmill-dark-brown">Expert Advice</h3>
                <p className="text-gray-700">Not sure what wood is best for your project? Our team can help you choose the perfect species and cut.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-sawmill-orange">
                <h3 className="font-bold text-lg mb-2 text-sawmill-dark-brown">Satisfaction Guaranteed</h3>
                <p className="text-gray-700">We stand behind the quality of our lumber with a satisfaction guarantee on every purchase.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <FeaturedProductsSection />
      
      {/* Project Showcase */}
      <ProjectShowcaseSection />
      
      {/* Call to Action - Middle */}
      <MiddleCTASection />
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Map Location */}
      <MapEmbed />
      
      {/* Latest Blog Posts */}
      <BlogPostsSection />
      
      {/* Banners - Full Size for Home page */}
      <SharedBanner variant="full" />
      
      {/* Call to Action - Bottom */}
      <BottomCTASection />
    </div>
  );
};

export default Home;
