
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const FeaturedProductsSection = () => {
  // Featured lumber products with real images
  const featuredProducts = [
    {
      id: 1,
      name: 'Walnut Live Edge Slabs',
      description: 'Beautiful walnut live edge slabs with rich color variation, perfect for custom tables and countertops.',
      image: 'https://lh3.googleusercontent.com/pw/AP1GczOAcByE5Hm4MYIMettl4emX9aNlg4wLE-Y-TPISX24hZT_d6KeYda7iviQoVVw8xZqpvwwMUohBa6xDoxPRM22HGaag8KVSxhgF7AvievLP_kIi=w2400',
      price: 'From $95/board ft',
    },
    {
      id: 2,
      name: 'Maple Live Edge Slabs',
      description: 'Stunning maple live edge slabs with beautiful grain patterns, excellent for dining tables and desks.',
      image: 'https://lh3.googleusercontent.com/pw/AP1GczP48Owk0UOdaqptbQ0LDibJMEigXrR_6wR7fJt-xZ1sWCMU6zmv90R9jQ7MHNgTMEWpAWv6jXQYjDlMaVF_mwJqVY_jwXbfJ9DZw4uSqfZ0QjbL=w2400',
      price: 'From $85/board ft',
    },
    {
      id: 3,
      name: 'Oak Live Edge Slabs',
      description: 'Durable oak live edge slabs with distinctive grain, ideal for rustic furniture designs and statement pieces.',
      image: 'https://lh3.googleusercontent.com/pw/AP1GczNwsxZoR0-yVe3k_Wii5gR_FvJK_h-vkiR3vX3fW0miFTsr7FkZT6eO51tiqWzzGxgNpFmsJ9fDIw1K228F74pLeywJu11ezWCxrKEFkcUw7OhX=w2400',
      price: 'From $75/board ft',
    },
    {
      id: 4,
      name: 'Cherry Live Edge Slabs',
      description: 'Rich cherry live edge slabs that darken beautifully with age, perfect for heirloom furniture pieces.',
      image: 'https://lh3.googleusercontent.com/pw/AP1GczMv8UGTC1-2V2OD2SGliOP4hQnxhDjf_B87-ZgCljeA2jQYIPT_iLA45QEKg0XqsvSMvfUJotixK1KBODI4-MZk3AQDZekoBsUbZQHp39pnLOwp=w2400',
      price: 'From $90/board ft',
    },
  ];

  return (
    <section className="py-16">
      <div className="container-wide">
        <h2 className="section-title text-center mx-auto">Featured Live Edge Slabs</h2>
        
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
            <Link to="/products">View All Live Edge Slabs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
