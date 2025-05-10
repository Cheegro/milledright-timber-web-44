
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
    <div className="w-full md:w-64 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Search</h3>
        <Input
          type="text"
          placeholder="Search lumber..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Categories</h3>
        <div className="space-y-2">
          {productCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`w-full justify-start ${
                selectedCategory === category 
                  ? "bg-sawmill-medium-brown hover:bg-sawmill-dark-brown" 
                  : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="p-4 bg-sawmill-light-brown/20 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Custom Milling</h3>
        <p className="text-sm mb-4">Need custom milling or specific dimensions? We can mill your lumber to exact specifications.</p>
        <Button className="w-full bg-sawmill-dark-brown hover:bg-sawmill-medium-brown">
          <Link to="/contact" className="w-full">Request Quote</Link>
        </Button>
      </div>
    </div>
  );
};

export default ProductsSidebar;
