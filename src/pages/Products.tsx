import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import ProductFilters from '@/components/products/ProductFilters';
import MobileProductFilters from '@/components/products/MobileProductFilters';
import ProductsList from '@/components/products/ProductsList';
import ProductsCallToAction from '@/components/products/ProductsCallToAction';
import { fetchProducts, fetchProductCategories } from '@/api/productApi';
import { toast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedWoodType, setSelectedWoodType] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedDimensions, setSelectedDimensions] = useState('All Sizes');
  
  const isMobile = useIsMobile();
  
  // Read category from URL parameters on component mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);
  
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
    // Clear URL parameters
    setSearchParams({});
  };

  // Update URL when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      // Remove category parameter if "All" is selected
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('category');
      setSearchParams(newParams);
    } else {
      // Set category parameter
      setSearchParams({ category });
    }
  };

  if (productsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SEOHead 
          title="Premium Lumber Products | MilledRight Sawmill"
          description="Browse our selection of premium live edge slabs, dimensional lumber, and custom wood products."
        />
        <Header />
        <div className="flex-1 flex justify-center items-center">
          <Loader2 className="h-10 w-10 animate-spin text-sawmill-dark-brown" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Premium Lumber Products | MilledRight Sawmill"
        description="Browse our selection of premium live edge slabs, dimensional lumber, and custom wood products."
      />
      
      <Header />
      
      <main className="flex-1">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-sawmill-dark-brown to-sawmill-medium-brown text-white">
          <div className="container-wide py-12 md:py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Premium Wood Products
              </h1>
              <p className="text-lg md:text-xl text-sawmill-light-brown max-w-3xl mx-auto">
                Discover our carefully selected collection of live edge slabs, dimensional lumber, and custom wood products.
              </p>
            </div>
          </div>
        </div>

        <div className="container-wide py-6 md:py-12">
          {/* Mobile Filters */}
          {isMobile && (
            <div className="mb-6">
              <MobileProductFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={handleCategoryChange}
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
                setSelectedCategory={handleCategoryChange}
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
              setSelectedCategory={handleCategoryChange}
            />
          </div>
        </div>

        {/* Call to action */}
        <ProductsCallToAction />
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
