
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface ProductFiltersProps {
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
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
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
}) => {
  const dimensionOptions = [
    'All Sizes',
    'Under 2 inches thick',
    '2-3 inches thick',
    'Over 3 inches thick',
    'Under 6 feet long',
    '6-8 feet long',
    'Over 8 feet long',
  ];

  return (
    <div className="w-full md:w-64 space-y-6">
      {/* Search */}
      <div>
        <Label htmlFor="search" className="text-lg font-semibold mb-2 block">
          Search
        </Label>
        <Input
          id="search"
          type="text"
          placeholder="Search lumber..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
      
      {/* Categories */}
      <div>
        <Label className="text-lg font-semibold mb-2 block">Categories</Label>
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

      {/* Wood Type */}
      <div>
        <Label htmlFor="wood-type" className="text-lg font-semibold mb-2 block">
          Wood Type
        </Label>
        <Select value={selectedWoodType} onValueChange={setSelectedWoodType}>
          <SelectTrigger>
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
        <Label className="text-lg font-semibold mb-2 block">
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
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>$0</span>
          <span>$5000+</span>
        </div>
      </div>

      {/* Dimensions */}
      <div>
        <Label htmlFor="dimensions" className="text-lg font-semibold mb-2 block">
          Dimensions
        </Label>
        <Select value={selectedDimensions} onValueChange={setSelectedDimensions}>
          <SelectTrigger>
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

      {/* Reset Filters */}
      <Button 
        variant="outline" 
        onClick={onResetFilters}
        className="w-full"
      >
        Reset All Filters
      </Button>

      {/* Newsletter Subscription */}
      <div className="p-4 bg-sawmill-light-brown/20 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
        <p className="text-sm mb-4">Get notified when new lumber arrives.</p>
        <Button className="w-full bg-sawmill-dark-brown hover:bg-sawmill-medium-brown">
          Subscribe to Updates
        </Button>
      </div>
    </div>
  );
};

export default ProductFilters;
