
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter } from 'lucide-react';

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
    <div className="md:hidden fixed bottom-6 right-6 z-40">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown rounded-full p-4 shadow-2xl hover:shadow-xl transition-all duration-300 border-2 border-white">
            <Filter className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
          <SheetHeader className="pb-6 border-b border-gray-100">
            <SheetTitle className="text-xl text-sawmill-dark-brown">Filter Products</SheetTitle>
          </SheetHeader>
          
          <div className="space-y-6 py-6 overflow-y-auto">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-sawmill-dark-brown">Search</h3>
              <Input
                type="text"
                placeholder="Search lumber..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-base py-3 border-gray-200 focus:border-sawmill-orange"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 text-sawmill-dark-brown">Categories</h3>
              <div className="space-y-3">
                <Button
                  variant={selectedCategory === '' ? "default" : "outline"}
                  className={`w-full justify-start text-base py-3 ${
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
                    className={`w-full justify-start text-base py-3 ${
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
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileProductFilters;
