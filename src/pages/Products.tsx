import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import ProductsHeader from '@/components/products/ProductsHeader';
import ProductsList from '@/components/products/ProductsList';
import ProductsSidebar from '@/components/products/ProductsSidebar';
import MobileProductFilters from '@/components/products/MobileProductFilters';
import ProductsCallToAction from '@/components/products/ProductsCallToAction';
import { fetchProducts, fetchProductCategories } from '@/api/productApi';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  price: string;
  image_url: string;
  description: string;
  category: string;
  wood_type: string;
  board_feet?: number;
}

interface Category {
  id: string;
  name: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error loading products:", error);
        toast({
          title: "Error loading products",
          description: "Failed to load products. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    const loadCategories = async () => {
      try {
        const categoriesData = await fetchProductCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error loading categories:", error);
        toast({
          title: "Error loading categories",
          description: "Failed to load product categories.",
          variant: "destructive",
        });
      }
    };

    loadProducts();
    loadCategories();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery]);

  const handlePriceRangeChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Premium Lumber Products"
        description="Browse our selection of premium lumber products including live edge slabs, dimensional lumber, and custom milling services from MilledRight Sawmill."
        keywords="lumber products, live edge slabs, dimensional lumber, custom milling, premium wood"
      />
      
      <Header />
      
      <main className="flex-1">
        <ProductsHeader 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onMobileFiltersClick={() => setMobileFiltersOpen(true)}
          totalProducts={filteredProducts.length}
        />
        
        <div className="container-wide">
          <div className="flex gap-8 py-8">
            <ProductsSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
            />
            
            <div className="flex-1">
              <ProductsList 
                products={filteredProducts}
                loading={loading}
              />
            </div>
          </div>
        </div>
        
        <ProductsCallToAction />
        
        <MobileProductFilters 
          isOpen={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
