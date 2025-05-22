
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import ProductsHeader from '@/components/products/ProductsHeader';
import ProductsSidebar from '@/components/products/ProductsSidebar';
import ProductsList from '@/components/products/ProductsList';
import ProductsCallToAction from '@/components/products/ProductsCallToAction';
import { fetchProducts, fetchProductCategories } from '@/api/productApi';
import { toast } from '@/components/ui/use-toast';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Fetch products using React Query
  const { data: products = [], isLoading: productsLoading, error: productsError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });
  
  // Fetch categories using React Query
  const { data: categoriesData = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['productCategories'],
    queryFn: fetchProductCategories
  });
  
  // Format categories to match the expected format
  const productCategories = ['All', ...categoriesData.map(cat => cat.name)];
  
  // Show error notification if products fetch fails
  React.useEffect(() => {
    if (productsError) {
      toast({
        title: "Error",
        description: "Failed to load products. Please try again.",
        variant: "destructive",
      });
    }
  }, [productsError]);
  
  // Filter products based on search query and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (productsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen">
        <ProductsHeader />
        <div className="container-wide py-12 flex justify-center items-center">
          <Loader2 className="h-10 w-10 animate-spin text-sawmill-dark-brown" />
        </div>
      </div>
    );
  }

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
