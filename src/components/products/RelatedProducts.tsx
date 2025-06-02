
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '@/api/productApi';
import ProductCard from './ProductCard';
import { Loader2 } from 'lucide-react';

interface RelatedProductsProps {
  currentProductId: string;
  currentProductCategory?: string;
}

const RelatedProducts = ({ currentProductId, currentProductCategory }: RelatedProductsProps) => {
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRelatedProducts() {
      try {
        setLoading(true);
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
        
        // Limit to 4 products
        setRelatedProducts(related.slice(0, 4));
      } catch (error) {
        console.error("Error fetching related products:", error);
        setRelatedProducts([]);
      } finally {
        setLoading(false);
      }
    }
    
    getRelatedProducts();
  }, [currentProductId, currentProductCategory]);

  if (loading) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 border-b border-sawmill-medium-brown pb-2">Related Products</h2>
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-sawmill-dark-brown" />
        </div>
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return null; // Don't show the section if no related products
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 border-b border-sawmill-medium-brown pb-2">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
