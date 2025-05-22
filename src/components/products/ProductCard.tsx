
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Interface updated to match Supabase product structure
interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string | null;
  image_url: string | null;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // Use a placeholder image if the product doesn't have an image
  const imageUrl = product.image_url || '/placeholder.svg';

  return (
    <Card key={product.id} className="overflow-hidden product-card">
      <div className="aspect-square bg-white p-4">
        <img 
          src={imageUrl} 
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-1">
          <Link to={`/products/${product.id}`} className="text-sawmill-dark-brown hover:text-sawmill-medium-brown">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
        <p className="text-xl font-bold text-sawmill-dark-brown mb-3">{product.price}</p>
        <p className="text-sm line-clamp-2 mb-4">{product.description}</p>
        <div className="flex gap-2">
          <Button className="flex-1 bg-sawmill-dark-brown hover:bg-sawmill-medium-brown">
            <Link to={`/products/${product.id}`} className="w-full">View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
