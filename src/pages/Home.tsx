
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import HeroSection from '@/components/home/HeroSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection';
import ProjectShowcaseSection from '@/components/home/ProjectShowcaseSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import BlogPostsSection from '@/components/home/BlogPostsSection';
import FAQSection from '@/components/home/FAQSection';
import MiddleCTASection from '@/components/home/MiddleCTASection';
import BottomCTASection from '@/components/home/BottomCTASection';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Premium Lumber & Custom Milling Services"
        description="MilledRight Sawmill provides premium quality lumber, live edge slabs, and custom milling services in Whitchurch-Stouffville, Ontario."
      />
      
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <WhyChooseUsSection />
        <FeaturedProductsSection />
        <ProjectShowcaseSection />
        <TestimonialsSection />
        <MiddleCTASection />
        <BlogPostsSection />
        <FAQSection />
        <BottomCTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
