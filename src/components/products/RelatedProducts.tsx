
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '@/api/productApi';
import ProductCard from './ProductCard';
import { Loader2, ArrowRight, Sparkles, Grid3X3 } from 'lucide-react';
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
      <div className="mt-20 border-t border-gradient-to-r from-transparent via-gray-200 to-transparent pt-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-sawmill-orange to-sawmill-medium-brown rounded-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-sawmill-dark-brown to-sawmill-medium-brown bg-clip-text text-transparent">
              You Might Also Love
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gradient-to-br from-gray-200 to-gray-300 aspect-square rounded-xl mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-300/50 to-transparent"></div>
              </div>
              <div className="space-y-3">
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3"></div>
                <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 border-t border-gradient-to-r from-transparent via-gray-200 to-transparent pt-16">
        <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 shadow-lg">
          <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full w-fit mx-auto mb-4">
            <Grid3X3 className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Related Products</h3>
          <p className="text-gray-600 mb-6">We're having trouble loading recommendations right now.</p>
          <Button variant="outline" asChild className="bg-white hover:bg-gray-50 border-gray-300">
            <Link to="/products">
              <Grid3X3 className="mr-2 h-4 w-4" />
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
      <div className="mt-20 border-t border-gradient-to-r from-transparent via-gray-200 to-transparent pt-16">
        <div className="text-center py-12 bg-gradient-to-br from-sawmill-orange/5 to-sawmill-medium-brown/5 rounded-2xl border border-sawmill-orange/20 shadow-lg">
          <div className="p-3 bg-gradient-to-r from-sawmill-orange to-sawmill-medium-brown rounded-full w-fit mx-auto mb-4">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-sawmill-dark-brown to-sawmill-medium-brown bg-clip-text text-transparent mb-2">
            Explore Our Complete Collection
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Discover our full range of premium quality lumber and expertly crafted wood products.
          </p>
          <Button className="bg-gradient-to-r from-sawmill-dark-brown to-sawmill-medium-brown hover:from-sawmill-medium-brown hover:to-sawmill-dark-brown shadow-lg hover:shadow-xl transition-all duration-300" asChild>
            <Link to="/products">
              <Grid3X3 className="mr-2 h-4 w-4" />
              Browse All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 border-t border-gradient-to-r from-transparent via-gray-200 to-transparent pt-16">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-r from-sawmill-orange to-sawmill-medium-brown rounded-xl shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-sawmill-dark-brown to-sawmill-medium-brown bg-clip-text text-transparent mb-2">
              You Might Also Love
            </h2>
            {currentProductCategory && (
              <p className="text-gray-600 flex items-center gap-2">
                <span>More premium products from our</span>
                <span className="font-semibold text-sawmill-orange">{currentProductCategory}</span>
                <span>collection</span>
              </p>
            )}
          </div>
        </div>
        <Button variant="outline" asChild className="hidden md:flex bg-white hover:bg-gray-50 border-gray-300 shadow-md hover:shadow-lg transition-all duration-300">
          <Link to="/products">
            <Grid3X3 className="mr-2 h-4 w-4" />
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-10 text-center md:hidden">
        <Button variant="outline" asChild className="bg-white hover:bg-gray-50 border-gray-300 shadow-md hover:shadow-lg transition-all duration-300">
          <Link to="/products">
            <Grid3X3 className="mr-2 h-4 w-4" />
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default RelatedProducts;
