
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, ArrowRight, Sparkles, Star } from 'lucide-react';

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
  const [isHovered, setIsHovered] = useState(false);
  
  // Use a placeholder image if the product doesn't have an image
  const imageUrl = product.image_url || '/placeholder.svg';
  
  // Format price with board foot unit if applicable
  const priceDisplay = product.price_unit ? `${product.price} per ${product.price_unit}` : product.price;

  return (
    <Card 
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square bg-gradient-to-br from-sawmill-cream to-sawmill-warm-white relative overflow-hidden rounded-t-3xl">
        {/* Loading state */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-sawmill-cream to-sawmill-warm-white animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-sawmill-orange/30 border-t-sawmill-orange rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Product image */}
        <img 
          src={imageUrl} 
          alt={product.name}
          className={`object-cover w-full h-full transition-all duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'scale-110' : 'scale-100'}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Enhanced overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-sawmill-dark-brown/80 via-transparent to-transparent transition-all duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        } flex items-center justify-center`}>
          <div className={`transition-all duration-500 transform ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}>
            <Button
              size="lg"
              className="bg-white/90 backdrop-blur-sm text-sawmill-dark-brown hover:bg-white hover:text-sawmill-orange shadow-modern-xl border-2 border-white/20 font-semibold"
              asChild
            >
              <Link to={`/products/${product.id}`}>
                <Eye className="h-5 w-5 mr-2" />
                View Details
              </Link>
            </Button>
          </div>
        </div>

        {/* Enhanced category badge */}
        <div className="absolute top-4 left-4">
          <span className="product-badge flex items-center gap-2">
            <Sparkles className="h-3 w-3" />
            {product.category}
          </span>
        </div>

        {/* Quality indicator */}
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-modern">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-sawmill-orange text-sawmill-orange" />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <CardContent className="p-8 bg-white relative">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sawmill-orange via-sawmill-orange-light to-sawmill-orange-dark"></div>
        
        <div className="space-y-6">
          {/* Product title */}
          <h3 className="font-bold text-xl md:text-2xl line-clamp-2 leading-tight group-hover:text-sawmill-orange transition-colors duration-300 text-sawmill-dark-brown">
            <Link 
              to={`/products/${product.id}`} 
              className="hover:text-sawmill-orange transition-colors"
            >
              {product.name}
            </Link>
          </h3>
          
          {/* Price display */}
          <div className="flex items-center justify-between">
            <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-sawmill-orange to-sawmill-orange-dark bg-clip-text text-transparent">
              {priceDisplay}
            </p>
          </div>
          
          {/* Description */}
          {product.description && (
            <p className="text-sawmill-medium-brown line-clamp-3 leading-relaxed group-hover:text-sawmill-dark-brown transition-colors duration-300">
              {product.description.replace(/<[^>]*>/g, '')}
            </p>
          )}
          
          {/* Action button */}
          <div className="pt-4">
            <Button 
              className="w-full modern-button-primary group/btn" 
              asChild
            >
              <Link to={`/products/${product.id}`}>
                <span className="mr-2">View Details</span>
                <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
