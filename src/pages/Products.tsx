
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

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const productsData = await fetchProducts();
        setProducts(productsData.map(p => ({
          ...p,
          category: p.category || 'General'
        })));
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
          totalProducts={filteredProducts.length}
        />
        
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 py-6 lg:py-8">
            {/* Desktop Sidebar - Hidden on Mobile */}
            <div className="hidden lg:block">
              <ProductsSidebar
                productCategories={categories.map(c => c.name)}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
            
            {/* Mobile Search and Filters */}
            <div className="lg:hidden space-y-4 px-4">
              <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
                <input
                  type="text"
                  placeholder="Search lumber..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sawmill-orange focus:border-transparent text-base"
                />
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === '' 
                        ? 'bg-sawmill-orange text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  {categories?.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category.name 
                          ? 'bg-sawmill-orange text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Products List */}
            <div className="flex-1 px-4 lg:px-0">
              <ProductsList 
                filteredProducts={filteredProducts}
                selectedCategory={selectedCategory || 'All'}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
          </div>
        </div>
        
        {/* Mobile-Optimized CTA */}
        <div className="px-4 lg:px-0">
          <ProductsCallToAction />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
