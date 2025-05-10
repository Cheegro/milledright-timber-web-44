
import React from 'react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
}

interface ProductsListProps {
  filteredProducts: Product[];
  selectedCategory: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
}

const ProductsList = ({ 
  filteredProducts, 
  selectedCategory,
  searchQuery,
  setSearchQuery,
  setSelectedCategory 
}: ProductsListProps) => {
  return (
    <div className="flex-1">
      <h2 className="text-2xl font-bold mb-6 border-b border-sawmill-medium-brown pb-2">
        {selectedCategory === 'All' ? 'All Lumber' : selectedCategory}
        <span className="text-sm font-normal ml-2 text-gray-500">({filteredProducts.length} items)</span>
      </h2>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg">No lumber products match your criteria.</p>
          <Button 
            variant="link" 
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
