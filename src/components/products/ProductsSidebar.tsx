
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ProductsSidebarProps {
  productCategories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ProductsSidebar = ({
  productCategories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
}: ProductsSidebarProps) => {
  return (
    <div className="w-full lg:w-64 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-sawmill-dark-brown">Search</h3>
        <Input
          type="text"
          placeholder="Search lumber..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border-gray-200 focus:border-sawmill-orange focus:ring-sawmill-orange"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3 text-sawmill-dark-brown">Categories</h3>
        <div className="space-y-2">
          <Button
            variant={selectedCategory === '' ? "default" : "outline"}
            className={`w-full justify-start text-left ${
              selectedCategory === '' 
                ? "bg-sawmill-orange hover:bg-sawmill-auburn text-white" 
                : "hover:bg-sawmill-orange/10 hover:text-sawmill-orange"
            }`}
            onClick={() => setSelectedCategory('')}
          >
            All Categories
          </Button>
          {productCategories?.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`w-full justify-start text-left ${
                selectedCategory === category 
                  ? "bg-sawmill-orange hover:bg-sawmill-auburn text-white" 
                  : "hover:bg-sawmill-orange/10 hover:text-sawmill-orange"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-sawmill-light-brown/20 to-sawmill-orange/10 rounded-xl p-6 border border-sawmill-orange/20 shadow-lg">
        <h3 className="text-lg font-semibold mb-3 text-sawmill-dark-brown">Custom Milling</h3>
        <p className="text-sm mb-4 text-gray-700 leading-relaxed">Need custom milling or specific dimensions? We can mill your lumber to exact specifications.</p>
        <Button className="w-full bg-gradient-to-r from-sawmill-dark-brown to-sawmill-medium-brown hover:from-sawmill-medium-brown hover:to-sawmill-dark-brown shadow-md hover:shadow-lg transition-all duration-300">
          <Link to="/contact" className="w-full text-center">Request Quote</Link>
        </Button>
      </div>
    </div>
  );
};

export default ProductsSidebar;
