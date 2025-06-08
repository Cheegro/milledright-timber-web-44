
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, X } from 'lucide-react';

interface MobileProductFiltersProps {
  productCategories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const MobileProductFilters = ({
  productCategories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
}: MobileProductFiltersProps) => {
  return (
    <div className="md:hidden fixed bottom-4 right-4 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown rounded-full p-3">
            <Filter className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh]">
          <SheetHeader>
            <SheetTitle>Filter Products</SheetTitle>
          </SheetHeader>
          
          <div className="space-y-6 py-6">
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
                <Button
                  variant={selectedCategory === '' ? "default" : "outline"}
                  className={`w-full justify-start ${
                    selectedCategory === '' 
                      ? "bg-sawmill-medium-brown hover:bg-sawmill-dark-brown" 
                      : ""
                  }`}
                  onClick={() => setSelectedCategory('')}
                >
                  All Categories
                </Button>
                {productCategories?.map((category) => (
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
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileProductFilters;
