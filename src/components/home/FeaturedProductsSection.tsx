
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/data/productsData';

const FeaturedProductsSection = () => {
  // Get the first 4 products for the featured section
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-16">
      <div className="container-wide">
        <h2 className="section-title text-center mx-auto">Featured Live Edge Slabs</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown text-white">
            <Link to="/products">View All Live Edge Slabs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
