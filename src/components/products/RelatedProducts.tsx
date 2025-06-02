
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '@/api/productApi';
import ProductCard from './ProductCard';
import { Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface RelatedProductsProps {
  currentProductId: string;
  currentProductCategory?: string;
}

const RelatedProducts = ({ currentProductId, currentProductCategory }: RelatedProductsProps) => {
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getRelatedProducts() {
      try {
        setLoading(true);
        setError(false);
        const allProducts = await fetchProducts();
        
        // Filter out the current product
        const filteredProducts = allProducts.filter(product => product.id !== currentProductId);
        
        // First try to get products from the same category
        let related = [];
        if (currentProductCategory) {
          related = filteredProducts.filter(product => product.category === currentProductCategory);
        }
        
        // If we don't have enough from the same category, add other products
        if (related.length < 4) {
          const otherProducts = filteredProducts.filter(product => 
            currentProductCategory ? product.category !== currentProductCategory : true
          );
          related = [...related, ...otherProducts];
        }
        
        // Shuffle and limit to 4 products for variety
        const shuffled = related.sort(() => 0.5 - Math.random());
        setRelatedProducts(shuffled.slice(0, 4));
      } catch (error) {
        console.error("Error fetching related products:", error);
        setError(true);
        setRelatedProducts([]);
      } finally {
        setLoading(false);
      }
    }
    
    getRelatedProducts();
  }, [currentProductId, currentProductCategory]);

  if (loading) {
    return (
      <div className="mt-16 border-t pt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-sawmill-dark-brown">You Might Also Like</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-16 border-t pt-12">
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Unable to load related products at this time.</p>
          <Button variant="outline" asChild>
            <Link to="/products">
              Browse All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return (
      <div className="mt-16 border-t pt-12">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-sawmill-dark-brown mb-4">Explore More Products</h2>
          <p className="text-gray-600 mb-6">Discover our full range of quality lumber and wood products.</p>
          <Button className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown" asChild>
            <Link to="/products">
              Browse All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 border-t pt-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-sawmill-dark-brown mb-2">You Might Also Like</h2>
          {currentProductCategory && (
            <p className="text-gray-600">More products from our {currentProductCategory} collection</p>
          )}
        </div>
        <Button variant="outline" asChild className="hidden md:flex">
          <Link to="/products">
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-8 text-center md:hidden">
        <Button variant="outline" asChild>
          <Link to="/products">
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default RelatedProducts;
