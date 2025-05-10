
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const FeaturedProductsSection = () => {
  // Sample featured lumber products
  const featuredProducts = [
    {
      id: 1,
      name: 'Live Edge Slabs',
      description: 'Beautiful live edge wood slabs ideal for custom tables, countertops, and more.',
      image: '/lovable-uploads/3e9a035e-9de4-472c-97f1-0f026cf9486d.png',
      price: 'From $85/board ft',
    },
    {
      id: 2,
      name: '2" Dimensional Lumber',
      description: 'High-quality dimensional lumber perfect for construction and woodworking projects.',
      image: '/placeholder.svg',
      price: 'From $3.50/board ft',
    },
    {
      id: 3,
      name: '2S Surfaced Wood',
      description: 'Surfaced on two sides for smooth finish, ready for your carpentry projects.',
      image: '/placeholder.svg',
      price: 'From $4.25/board ft',
    },
    {
      id: 4,
      name: 'Custom Milling Services',
      description: 'Bring your logs and we\'ll mill them to your specifications on-site.',
      image: '/placeholder.svg',
      price: 'Starting at $75/hour',
    },
  ];

  return (
    <section className="py-16">
      <div className="container-wide">
        <h2 className="section-title text-center mx-auto">Featured Products</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {featuredProducts.map(product => (
            <Card key={product.id} className="product-card">
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-sawmill-dark-brown">{product.name}</h3>
                <p className="text-sawmill-dark-gray text-sm mt-2 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sawmill-dark-brown font-bold">{product.price}</span>
                  <Link 
                    to={`/products/${product.id}`}
                    className="text-sawmill-orange hover:underline font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown text-white">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
