
import React, { useState } from 'react';
import { products, productCategories } from '@/data/productsData';
import ProductsHeader from '@/components/products/ProductsHeader';
import ProductsSidebar from '@/components/products/ProductsSidebar';
import ProductsList from '@/components/products/ProductsList';
import ProductsCallToAction from '@/components/products/ProductsCallToAction';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Filter products based on search query and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <ProductsHeader />

      <div className="container-wide py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filters */}
          <ProductsSidebar 
            productCategories={productCategories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {/* Products grid */}
          <ProductsList 
            filteredProducts={filteredProducts}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>

      {/* Call to action */}
      <ProductsCallToAction />
    </div>
  );
};

export default Products;
