
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Loader2, TreePine } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { fetchProducts } from '@/api/productApi';

const FeaturedProductsSection = () => {
  // Fetch products using React Query
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  // Get the first 4 products for the featured section
  const featuredProducts = products.slice(0, 4);

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-sawmill-dark-brown via-black to-sawmill-dark-gray relative overflow-hidden">
        <div className="absolute inset-0 industrial-grid opacity-20"></div>
        <div className="absolute inset-0 sawmill-texture"></div>
        <div className="container-wide relative z-10">
          <h2 className="section-title text-center mx-auto">PREMIUM LUMBER SHOWCASE</h2>
          <div className="flex justify-center items-center py-12">
            <div className="sawmill-card p-8">
              <Loader2 className="h-12 w-12 animate-spin text-sawmill-orange mx-auto" />
              <p className="text-gray-300 mt-4 text-center font-bold">LOADING PREMIUM LUMBER...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-sawmill-dark-brown via-black to-sawmill-dark-gray relative overflow-hidden">
      {/* Industrial background elements */}
      <div className="absolute inset-0 industrial-grid opacity-20"></div>
      <div className="absolute inset-0 sawmill-texture"></div>
      
      {/* Animated accent lines */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sawmill-bark via-sawmill-orange to-sawmill-amber animate-industrial-pulse"></div>
      
      <div className="container-wide relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-100 mb-6 tracking-wide">
            <span className="bg-gradient-to-r from-sawmill-light-brown via-sawmill-orange to-sawmill-amber bg-clip-text text-transparent sawmill-text-shadow">
              PREMIUM LUMBER SHOWCASE
            </span>
          </h2>
          <div className="h-2 w-32 bg-gradient-to-r from-sawmill-bark to-sawmill-orange mx-auto mb-6 rounded-full animate-sawmill-glow"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <span className="text-sawmill-orange font-bold">Defy convention</span> with our premium live edge slabs. 
            Each piece is a <span className="text-sawmill-amber font-bold">rebellion</span> against ordinary lumber, 
            handpicked for those who <span className="text-sawmill-sage font-bold">refuse to settle</span>.
          </p>
        </div>
        
        {featuredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="sawmill-card p-12 max-w-md mx-auto">
              <TreePine className="h-16 w-16 text-sawmill-orange mx-auto mb-4" />
              <p className="text-gray-300 text-lg font-bold">PREMIUM LUMBER SELECTION</p>
              <p className="text-gray-400 mt-2">Our finest pieces are currently being crafted...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id}
                className="animate-fade-in sawmill-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-16">
          <Button 
            size="lg" 
            className="sawmill-button text-lg px-10 py-4 hover-grow animate-sawmill-glow"
          >
            <Link to="/products" className="flex items-center gap-3">
              <TreePine className="h-5 w-5" />
              VIEW ALL PREMIUM LUMBER
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
