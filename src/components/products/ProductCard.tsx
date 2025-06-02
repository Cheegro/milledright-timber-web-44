
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, ArrowRight, Sparkles } from 'lucide-react';

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

  return (
    <Card 
      className="overflow-hidden product-card group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-gradient-to-b from-white to-gray-50/50"
    >
      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-sawmill-orange rounded-full animate-spin"></div>
          </div>
        )}
        <img 
          src={imageUrl} 
          alt={product.name}
          className={`object-cover w-full h-full group-hover:scale-110 transition-all duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Enhanced overlay with view details button */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-6 group-hover:translate-y-0">
            <Button
              size="sm"
              className="bg-white/95 text-sawmill-dark-brown hover:bg-sawmill-orange hover:text-white shadow-xl backdrop-blur-sm border border-white/20"
              asChild
            >
              <Link to={`/products/${product.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Link>
            </Button>
          </div>
        </div>

        {/* Enhanced category badge with premium styling */}
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-sawmill-dark-brown to-sawmill-medium-brown text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg backdrop-blur-sm border border-white/10">
            <Sparkles className="h-3 w-3 inline mr-1" />
            {product.category}
          </span>
        </div>
      </div>
      
      <CardContent className="p-6 bg-white relative">
        {/* Subtle gradient border effect */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sawmill-orange/20 to-transparent"></div>
        
        <div className="space-y-4">
          <h3 className="font-bold text-lg md:text-xl line-clamp-2 leading-tight group-hover:text-sawmill-orange transition-colors duration-300">
            <Link 
              to={`/products/${product.id}`} 
              className="text-sawmill-dark-brown hover:text-sawmill-orange transition-colors"
            >
              {product.name}
            </Link>
          </h3>
          
          <p className="text-xl md:text-2xl font-bold text-sawmill-orange flex items-center gap-2">
            {priceDisplay}
          </p>
          
          {product.description && (
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
              {product.description.replace(/<[^>]*>/g, '')}
            </p>
          )}
          
          <div className="pt-2">
            <Button 
              className="w-full bg-gradient-to-r from-sawmill-dark-brown to-sawmill-medium-brown hover:from-sawmill-medium-brown hover:to-sawmill-dark-brown group/btn shadow-lg hover:shadow-xl transition-all duration-300" 
              asChild
            >
              <Link to={`/products/${product.id}`}>
                <span className="mr-2">View Details</span>
                <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
