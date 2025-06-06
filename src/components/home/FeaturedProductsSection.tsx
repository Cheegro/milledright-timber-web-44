
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
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
      <section className="py-16">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl font-bold text-sawmill-dark-brown text-center mb-6">Featured Live Edge Slabs</h2>
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-10 w-10 animate-spin text-sawmill-dark-brown" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container-wide">
        <h2 className="text-3xl md:text-4xl font-bold text-sawmill-dark-brown text-center mb-6">Featured Live Edge Slabs</h2>
        
        {featuredProducts.length === 0 ? (
          <div className="text-center py-8">
            <p>No featured products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
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
