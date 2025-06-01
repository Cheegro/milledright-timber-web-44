
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Filter, X } from 'lucide-react';

interface MobileProductFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedWoodType: string;
  setSelectedWoodType: (woodType: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedDimensions: string;
  setSelectedDimensions: (dimensions: string) => void;
  productCategories: string[];
  woodTypes: string[];
  onResetFilters: () => void;
  filteredCount: number;
}

const MobileProductFilters: React.FC<MobileProductFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedWoodType,
  setSelectedWoodType,
  priceRange,
  setPriceRange,
  selectedDimensions,
  setSelectedDimensions,
  productCategories,
  woodTypes,
  onResetFilters,
  filteredCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dimensionOptions = [
    'All Sizes',
    'Under 2 inches thick',
    '2-3 inches thick',
    'Over 3 inches thick',
    'Under 6 feet long',
    '6-8 feet long',
    'Over 8 feet long',
  ];

  const hasActiveFilters = 
    searchQuery !== '' ||
    selectedCategory !== 'All' ||
    selectedWoodType !== 'All' ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 5000 ||
    selectedDimensions !== 'All Sizes';

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center gap-3 mb-4">
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 flex-1 justify-center h-12"
          >
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="bg-sawmill-orange text-white text-xs rounded-full px-2 py-1 ml-1">
                {filteredCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={onResetFilters}
            className="h-12 px-4"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <SheetContent side="bottom" className="h-[90vh]">
        <SheetHeader>
          <SheetTitle>Filter Products</SheetTitle>
          <SheetDescription>
            Refine your search to find the perfect lumber
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Search */}
          <div>
            <Label htmlFor="mobile-search" className="text-base font-semibold mb-3 block">
              Search
            </Label>
            <Input
              id="mobile-search"
              type="text"
              placeholder="Search lumber..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 text-base"
            />
          </div>
          
          {/* Categories */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Categories</Label>
            <div className="grid grid-cols-2 gap-2">
              {productCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`h-12 text-sm ${
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

          {/* Wood Type */}
          <div>
            <Label htmlFor="mobile-wood-type" className="text-base font-semibold mb-3 block">
              Wood Type
            </Label>
            <Select value={selectedWoodType} onValueChange={setSelectedWoodType}>
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="All Wood Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Wood Types</SelectItem>
                {woodTypes.map((woodType) => (
                  <SelectItem key={woodType} value={woodType}>
                    {woodType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </Label>
            <Slider
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              max={5000}
              min={0}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>$0</span>
              <span>$5000+</span>
            </div>
          </div>

          {/* Dimensions */}
          <div>
            <Label htmlFor="mobile-dimensions" className="text-base font-semibold mb-3 block">
              Dimensions
            </Label>
            <Select value={selectedDimensions} onValueChange={setSelectedDimensions}>
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="All Sizes" />
              </SelectTrigger>
              <SelectContent>
                {dimensionOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={onResetFilters}
              className="flex-1 h-12"
            >
              Reset Filters
            </Button>
            <Button 
              onClick={() => setIsOpen(false)}
              className="flex-1 h-12 bg-sawmill-dark-brown hover:bg-sawmill-medium-brown"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileProductFilters;
