
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import ProductsHeader from '@/components/products/ProductsHeader';
import ProductFilters from '@/components/products/ProductFilters';
import ProductsList from '@/components/products/ProductsList';
import ProductsCallToAction from '@/components/products/ProductsCallToAction';
import { fetchProducts, fetchProductCategories } from '@/api/productApi';
import { toast } from '@/components/ui/use-toast';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedWoodType, setSelectedWoodType] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedDimensions, setSelectedDimensions] = useState('All Sizes');
  
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
  
  // Extract unique wood types from products
  const woodTypes = useMemo(() => {
    const types = new Set<string>();
    products.forEach(product => {
      if (product.wood_type) {
        types.add(product.wood_type);
      }
    });
    return Array.from(types).sort();
  }, [products]);
  
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
  
  // Enhanced filtering logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Category filter
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      
      // Wood type filter
      const matchesWoodType = selectedWoodType === 'All' || product.wood_type === selectedWoodType;
      
      // Price filter
      const productPrice = parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0;
      const matchesPrice = productPrice >= priceRange[0] && productPrice <= priceRange[1];
      
      // Dimensions filter (simplified logic for demonstration)
      const matchesDimensions = selectedDimensions === 'All Sizes' || true; // TODO: Implement actual dimension filtering based on product data
      
      return matchesSearch && matchesCategory && matchesWoodType && matchesPrice && matchesDimensions;
    });
  }, [products, searchQuery, selectedCategory, selectedWoodType, priceRange, selectedDimensions]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedWoodType('All');
    setPriceRange([0, 5000]);
    setSelectedDimensions('All Sizes');
  };

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
          {/* Enhanced sidebar filters */}
          <ProductFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedWoodType={selectedWoodType}
            setSelectedWoodType={setSelectedWoodType}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedDimensions={selectedDimensions}
            setSelectedDimensions={setSelectedDimensions}
            productCategories={productCategories}
            woodTypes={woodTypes}
            onResetFilters={handleResetFilters}
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
