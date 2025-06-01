
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import ProductsHeader from '@/components/products/ProductsHeader';
import ProductFilters from '@/components/products/ProductFilters';
import MobileProductFilters from '@/components/products/MobileProductFilters';
import ProductsList from '@/components/products/ProductsList';
import ProductsCallToAction from '@/components/products/ProductsCallToAction';
import { fetchProducts, fetchProductCategories } from '@/api/productApi';
import { toast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedWoodType, setSelectedWoodType] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedDimensions, setSelectedDimensions] = useState('All Sizes');
  
  const isMobile = useIsMobile();
  
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
  
  // Extract unique wood types from product names and descriptions
  const woodTypes = useMemo(() => {
    const types = new Set<string>();
    products.forEach(product => {
      // Extract wood types from product names (e.g., "Walnut Live Edge Slab" -> "Walnut")
      const name = product.name.toLowerCase();
      const commonWoodTypes = ['walnut', 'maple', 'oak', 'cherry', 'ash', 'hickory', 'elm', 'pine', 'cedar', 'birch'];
      
      commonWoodTypes.forEach(wood => {
        if (name.includes(wood)) {
          types.add(wood.charAt(0).toUpperCase() + wood.slice(1));
        }
      });
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
      
      // Wood type filter - check if product name contains the selected wood type
      const matchesWoodType = selectedWoodType === 'All' || 
                             product.name.toLowerCase().includes(selectedWoodType.toLowerCase());
      
      // Price filter - extract price from price string
      const priceMatch = product.price.match(/\$?(\d+(?:\.\d{2})?)/);
      const productPrice = priceMatch ? parseFloat(priceMatch[1]) : 0;
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

      <div className="container-wide py-6 md:py-12">
        {/* Mobile Filters */}
        {isMobile && (
          <div className="mb-6">
            <MobileProductFilters
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
              filteredCount={filteredProducts.length}
            />
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Desktop sidebar filters */}
          {!isMobile && (
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
          )}

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
