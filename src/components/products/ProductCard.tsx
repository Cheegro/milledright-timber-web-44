
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
  // Use a placeholder image if the product doesn't have an image
  const imageUrl = product.image_url || '/placeholder.svg';
  
  // Format price with board foot unit if applicable
  const priceDisplay = product.price_unit ? `${product.price} per ${product.price_unit}` : product.price;

  return (
    <Card className="overflow-hidden product-card group hover:shadow-xl transition-all duration-300">
      <div className="aspect-square bg-white relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        {/* Mobile-friendly overlay for quick view */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 md:hidden" />
      </div>
      <CardContent className="p-4 md:p-6">
        <h3 className="font-bold text-lg md:text-xl mb-2 line-clamp-2">
          <Link to={`/products/${product.id}`} className="text-sawmill-dark-brown hover:text-sawmill-medium-brown transition-colors">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
        <p className="text-lg md:text-xl font-bold text-sawmill-dark-brown mb-3">{priceDisplay}</p>
        <p className="text-sm text-gray-700 line-clamp-2 mb-4">{product.description}</p>
        <div className="space-y-2 md:space-y-0 md:flex md:gap-2">
          <Button className="w-full md:flex-1 bg-sawmill-dark-brown hover:bg-sawmill-medium-brown h-11 md:h-10 text-sm md:text-base">
            <Link to={`/products/${product.id}`} className="w-full">View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
