
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import HeroSection from '@/components/home/HeroSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import EquipmentShowcaseSection from '@/components/home/EquipmentShowcaseSection';
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection';
import ProjectShowcaseSection from '@/components/home/ProjectShowcaseSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import BlogPostsSection from '@/components/home/BlogPostsSection';
import FAQSection from '@/components/home/FAQSection';
import MiddleCTASection from '@/components/home/MiddleCTASection';
import BottomCTASection from '@/components/home/BottomCTASection';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead 
        title="Premium Lumber & Custom Milling Services"
        description="Professional sawmill services in Whitchurch-Stouffville, ON. Custom lumber milling, live edge slabs, dimensional lumber, and quality wood products direct from our sawmill."
        image="/lovable-uploads/a86a2200-0386-4fb1-adbf-bdf3d636bba2.png"
      />
      
      <Header />
      
      <main className="flex-1 pt-0">
        <HeroSection />
        <WhyChooseUsSection />
        <EquipmentShowcaseSection />
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
