
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import OptimizedImage from '@/components/OptimizedImage';
import { getOptimizedImageUrl, getThumbnailUrl } from '@/services/imageOptimizationService';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: string;
    category?: string;
    image_url?: string;
    optimized_image_url?: string;
    optimized_image_webp_url?: string;
    thumbnail_url?: string;
    thumbnail_webp_url?: string;
    description?: string;
  };
  variant?: 'default' | 'featured';
}

const ProductCard = ({ product, variant = 'default' }: ProductCardProps) => {
  const optimizedSrc = getOptimizedImageUrl(product.optimized_image_url, product.image_url);
  const thumbnailSrc = getThumbnailUrl(
    product.thumbnail_url,
    product.optimized_image_url,
    product.image_url
  );

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow ${
      variant === 'featured' ? 'ring-2 ring-sawmill-orange' : ''
    }`}>
      <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
        <OptimizedImage
          src={optimizedSrc}
          webpSrc={product.optimized_image_webp_url}
          thumbnailSrc={thumbnailSrc}
          thumbnailWebpSrc={product.thumbnail_webp_url}
          alt={product.name}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          loading="lazy"
          useThumbnail={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {variant === 'featured' && (
          <Badge className="absolute top-2 left-2 bg-sawmill-orange text-white">
            Featured
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
        {product.category && (
          <Badge variant="outline" className="w-fit">
            {product.category}
          </Badge>
        )}
      </CardHeader>
      
      <CardContent>
        <p className="text-2xl font-bold text-sawmill-dark-brown mb-2">
          {product.price}
        </p>
        {product.description && (
          <p className="text-sm text-gray-600 line-clamp-3">
            {product.description}
          </p>
        )}
      </CardContent>
      
      <CardFooter className="pt-2">
        <Link to={`/products/${product.id}`} className="w-full">
          <Button className="w-full bg-sawmill-dark-brown hover:bg-sawmill-medium-brown">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
