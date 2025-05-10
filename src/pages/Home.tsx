
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

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Why Choose Us */}
      <WhyChooseUsSection />
      
      {/* Featured Products */}
      <FeaturedProductsSection />
      
      {/* Call to Action - Middle */}
      <MiddleCTASection />
      
      {/* Testimonials */}
      <TestimonialsSection />
      
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
