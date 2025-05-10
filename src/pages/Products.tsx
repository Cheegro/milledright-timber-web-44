
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

// Updated product categories focused on lumber
const productCategories = [
  "All",
  "Live Edge Slabs",
  "Dimensional Lumber",
  "Hardwoods",
  "Softwoods",
  "Special Cuts",
];

// New product data focused on lumber and live edge slabs
const products = [
  {
    id: 1,
    name: "Walnut Live Edge Slab",
    category: "Live Edge Slabs",
    price: "$95/board ft",
    description: "Beautiful walnut live edge slab with rich color variation. Perfect for custom tables, countertops, or statement furniture pieces.",
    image: "https://lh3.googleusercontent.com/pw/AP1GczOAcByE5Hm4MYIMettl4emX9aNlg4wLE-Y-TPISX24hZT_d6KeYda7iviQoVVw8xZqpvwwMUohBa6xDoxPRM22HGaag8KVSxhgF7AvievLP_kIi=w2400"
  },
  {
    id: 2,
    name: "Maple Live Edge Slab",
    category: "Live Edge Slabs",
    price: "$85/board ft",
    description: "Stunning maple live edge slab with beautiful grain patterns. Excellent for dining tables, desks, or shelving.",
    image: "https://lh3.googleusercontent.com/pw/AP1GczP48Owk0UOdaqptbQ0LDibJMEigXrR_6wR7fJt-xZ1sWCMU6zmv90R9jQ7MHNgTMEWpAWv6jXQYjDlMaVF_mwJqVY_jwXbfJ9DZw4uSqfZ0QjbL=w2400"
  },
  {
    id: 3,
    name: "Oak Live Edge Slab",
    category: "Live Edge Slabs",
    price: "$75/board ft",
    description: "Durable oak live edge slab with distinctive grain. Ideal for rustic furniture designs and statement pieces.",
    image: "https://lh3.googleusercontent.com/pw/AP1GczNwsxZoR0-yVe3k_Wii5gR_FvJK_h-vkiR3vX3fW0miFTsr7FkZT6eO51tiqWzzGxgNpFmsJ9fDIw1K228F74pLeywJu11ezWCxrKEFkcUw7OhX=w2400"
  },
  {
    id: 4,
    name: "Cherry Live Edge Slab",
    category: "Live Edge Slabs",
    price: "$90/board ft",
    description: "Rich cherry live edge slab that darkens beautifully with age. Perfect for heirloom furniture pieces.",
    image: "https://lh3.googleusercontent.com/pw/AP1GczMv8UGTC1-2V2OD2SGliOP4hQnxhDjf_B87-ZgCljeA2jQYIPT_iLA45QEKg0XqsvSMvfUJotixK1KBODI4-MZk3AQDZekoBsUbZQHp39pnLOwp=w2400"
  },
  {
    id: 5,
    name: "Ash Live Edge Slab",
    category: "Live Edge Slabs",
    price: "$70/board ft",
    description: "Versatile ash live edge slab with bright appearance. Great for contemporary furniture designs.",
    image: "https://lh3.googleusercontent.com/pw/AP1GczNHACoOU9-DjTMMF8x10mOzukmB_yd7YdBJzbC-qs6r69fQEMjJ9wBnirrCmLSBP5ofgkXEQNgheN85wIKnJGqqapNQdhPKLSoh5N49cOVXefiF=w2400"
  },
  {
    id: 6,
    name: "Hickory Live Edge Slab",
    category: "Live Edge Slabs",
    price: "$85/board ft",
    description: "Strong, character-rich hickory live edge slab. Excellent for high-use furniture like dining tables.",
    image: "https://lh3.googleusercontent.com/pw/AP1GczN1IOYefycEDh-kyR3PW-NwuwJK2PVvhV_Is2mY9SiOBocgJjcv83p99G6SnGWOIXNqgFgRWVkyvgJ6ExtYJJ7lGIqebRO12YnP_5tcLic5iykE=w2400"
  },
  {
    id: 7,
    name: "Elm Live Edge Slab",
    category: "Live Edge Slabs",
    price: "$80/board ft",
    description: "Distinctive elm live edge slab with interlocking grain patterns. Makes striking tables and countertops.",
    image: "https://lh3.googleusercontent.com/pw/AP1GczOsp_D-lnWI1Nl2ZkR0W544c-Bix8Q3-_k2o7ES470DagZu5FCeXGPa0YkrAOMNHgrpelKtou18-eBkcqrvVjCj-v8cLvJwZnqjTUU9vI9dEuNy=w2400"
  },
  {
    id: 8,
    name: "Spalted Maple Live Edge",
    category: "Live Edge Slabs",
    price: "$110/board ft",
    description: "Unique spalted maple live edge slab with dramatic black line patterns. A showstopping piece for luxury furniture.",
    image: "https://lh3.googleusercontent.com/pw/AP1GczMF-UwqDS0mzQhvKlZMMUqQjKwTeLsMs_9Y8SwdIC6a9h2vDZKec37odDn28R83IKXkMt7gvRsUIDIF0q6QJIrum2GSCsSeGQQjbUZVMcRypTv_=w2400"
  },
];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Filter products based on search query and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <div className="bg-sawmill-dark-brown py-16">
        <div className="container-wide">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Live Edge Lumber</h1>
          <p className="text-lg text-white/80 max-w-2xl">
            Browse our selection of premium live edge slabs and custom-milled lumber for your woodworking projects.
          </p>
        </div>
      </div>

      <div className="container-wide py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filters */}
          <div className="w-full md:w-64 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Search</h3>
              <Input
                type="text"
                placeholder="Search lumber..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Categories</h3>
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

            <div className="p-4 bg-sawmill-light-brown/20 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Custom Milling</h3>
              <p className="text-sm mb-4">Need custom milling or specific dimensions? We can mill your lumber to exact specifications.</p>
              <Button className="w-full bg-sawmill-dark-brown hover:bg-sawmill-medium-brown">
                <Link to="/contact" className="w-full">Request Quote</Link>
              </Button>
            </div>
          </div>

          {/* Products grid */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6 border-b border-sawmill-medium-brown pb-2">
              {selectedCategory === 'All' ? 'All Lumber' : selectedCategory}
              <span className="text-sm font-normal ml-2 text-gray-500">({filteredProducts.length} items)</span>
            </h2>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg">No lumber products match your criteria.</p>
                <Button 
                  variant="link" 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden product-card">
                    <div className="aspect-square bg-white p-4">
                      <img 
                        src={product.image} 
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
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-sawmill-light-brown/20 py-12">
        <div className="container-wide text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Looking for Custom Lumber?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            We offer custom milling services for unique projects. Tell us your specifications and we'll create the perfect piece for your needs.
          </p>
          <Button size="lg" className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Products;
