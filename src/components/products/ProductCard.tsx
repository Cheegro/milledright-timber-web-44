
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Eye, ArrowRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Interface updated to match Supabase product structure with price_unit
interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  price_unit?: string;
  description: string | null;
  image_url: string | null;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Use a placeholder image if the product doesn't have an image
  const imageUrl = product.image_url || '/placeholder.svg';
  
  // Format price with board foot unit if applicable
  const priceDisplay = product.price_unit ? `${product.price} per ${product.price_unit}` : product.price;

  const handleAddToDreamBoard = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Added to Dream Board",
      description: `${product.name} has been added to your dream board.`,
    });
  };

  return (
    <Card className="overflow-hidden product-card group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-sawmill-orange rounded-full animate-spin"></div>
          </div>
        )}
        <img 
          src={imageUrl} 
          alt={product.name}
          className={`object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay with action buttons */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 flex gap-2">
            <Button
              size="sm"
              className="bg-white text-sawmill-dark-brown hover:bg-sawmill-orange hover:text-white shadow-lg"
              asChild
            >
              <Link to={`/products/${product.id}`}>
                <Eye className="h-4 w-4 mr-1" />
                View
              </Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white border-white hover:bg-white hover:border-sawmill-orange shadow-lg"
              onClick={handleAddToDreamBoard}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-sawmill-dark-brown text-white text-xs px-2 py-1 rounded-full font-medium">
            {product.category}
          </span>
        </div>
      </div>
      
      <CardContent className="p-4 md:p-6 bg-white">
        <div className="space-y-3">
          <h3 className="font-bold text-lg md:text-xl line-clamp-2 leading-tight">
            <Link 
              to={`/products/${product.id}`} 
              className="text-sawmill-dark-brown hover:text-sawmill-orange transition-colors"
            >
              {product.name}
            </Link>
          </h3>
          
          <p className="text-xl md:text-2xl font-bold text-sawmill-orange">
            {priceDisplay}
          </p>
          
          {product.description && (
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {product.description.replace(/<[^>]*>/g, '')}
            </p>
          )}
          
          <div className="pt-2">
            <Button 
              className="w-full bg-sawmill-dark-brown hover:bg-sawmill-medium-brown group/btn" 
              asChild
            >
              <Link to={`/products/${product.id}`}>
                View Details
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
