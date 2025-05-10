
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

// Mock product data - this would be replaced with API calls in a real implementation
const productCategories = [
  "All",
  "Portable Sawmills",
  "Blades",
  "Parts & Maintenance",
  "Accessories",
  "Industrial Mills",
];

const products = [
  {
    id: 1,
    name: "LT40 Portable Sawmill",
    category: "Portable Sawmills",
    price: "$8,995",
    description: "Our flagship portable sawmill, designed for both professionals and hobbyists. The LT40 delivers precision cuts and reliability.",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "LT20 Portable Sawmill",
    category: "Portable Sawmills",
    price: "$4,995",
    description: "A more compact option perfect for small-scale operations and hobbyists who need quality cutting at an affordable price.",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Industrial Bandsaw Blades",
    category: "Blades",
    price: "$29.99",
    description: "High-quality replacement blades that fit most standard portable sawmills. Durable and precision-engineered.",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Log Loading Attachment",
    category: "Accessories",
    price: "$1,295",
    description: "Make loading logs onto your mill easier with this hydraulic attachment. Compatible with LT40 and LT20 models.",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Sawmill Maintenance Kit",
    category: "Parts & Maintenance",
    price: "$149.99",
    description: "Everything you need to keep your sawmill in top condition. Includes lubricants, cleaners, and basic replacement parts.",
    image: "/placeholder.svg"
  },
  {
    id: 6,
    name: "HD50 Industrial Mill",
    category: "Industrial Mills",
    price: "$24,995",
    description: "Our heavy-duty industrial sawmill for high-volume commercial operations. Built for durability and consistent performance.",
    image: "/placeholder.svg"
  },
  {
    id: 7,
    name: "Blade Sharpening Tool",
    category: "Accessories",
    price: "$89.99",
    description: "Keep your blades in perfect cutting condition with this easy-to-use sharpening tool.",
    image: "/placeholder.svg"
  },
  {
    id: 8,
    name: "Safety Gear Bundle",
    category: "Accessories",
    price: "$129.99",
    description: "Complete safety package including ear protection, eye protection, gloves, and a hard hat. Safety first!",
    image: "/placeholder.svg"
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
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Our Products</h1>
          <p className="text-lg text-white/80 max-w-2xl">
            Browse our selection of high-quality sawmills, blades, and accessories for all your lumber processing needs.
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
                placeholder="Search products..."
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
              <p className="text-sm mb-4">Need custom milling services? We can help with your specific requirements.</p>
              <Button className="w-full bg-sawmill-dark-brown hover:bg-sawmill-medium-brown">
                <Link to="/contact" className="w-full">Request Quote</Link>
              </Button>
            </div>
          </div>

          {/* Products grid */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6 border-b border-sawmill-medium-brown pb-2">
              {selectedCategory === 'All' ? 'All Products' : selectedCategory}
              <span className="text-sm font-normal ml-2 text-gray-500">({filteredProducts.length} products)</span>
            </h2>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg">No products match your criteria.</p>
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
                        className="object-contain w-full h-full"
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            We carry a wide range of products and can special order many items not listed on our website.
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
