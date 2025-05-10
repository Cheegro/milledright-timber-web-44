
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// This would be replaced with an API call in a real implementation
const getProductById = (id: number) => {
  return {
    id,
    name: id === 1 ? "LT40 Portable Sawmill" : "Product not found",
    category: "Portable Sawmills",
    price: "$8,995",
    description: "Our flagship portable sawmill, designed for both professionals and hobbyists. The LT40 delivers precision cuts and reliability.",
    longDescription: `
      <p>The LT40 Portable Sawmill is our most popular model, offering the perfect balance of performance and value. With its robust construction and precision engineering, it's designed to handle logs of various sizes with ease.</p>
      
      <h3>Key Features:</h3>
      <ul>
        <li>Heavy-duty steel frame for stability and durability</li>
        <li>Precision blade guide system for accurate cuts</li>
        <li>Hydraulic log handling system for easy operation</li>
        <li>25HP motor with excellent fuel efficiency</li>
        <li>Cuts logs up to 36" in diameter and 21' long</li>
        <li>Production capacity of up to 1,000 board feet per day</li>
      </ul>
      
      <h3>Optional Accessories:</h3>
      <ul>
        <li>Log loading arm attachment</li>
        <li>Debarker attachment</li>
        <li>Blade sharpening kit</li>
        <li>Extended log length package</li>
      </ul>
    `,
    specifications: [
      { name: "Maximum Log Diameter", value: "36 inches" },
      { name: "Maximum Log Length", value: "21 feet" },
      { name: "Motor", value: "25HP Kohler" },
      { name: "Blade Size", value: "1.5\" x 0.042\" x 158\"" },
      { name: "Cutting Capacity", value: "Up to 1,000 board feet/day" },
      { name: "Weight", value: "1,800 lbs" },
      { name: "Dimensions", value: "23'L x 5.5'W x 7.5'H" },
      { name: "Warranty", value: "2 years" }
    ],
    image: "/placeholder.svg",
    galleryImages: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ]
  };
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    if (id) {
      // Simulate API fetch
      setTimeout(() => {
        const fetchedProduct = getProductById(parseInt(id, 10));
        setProduct(fetchedProduct);
        setActiveImage(fetchedProduct.image);
        setLoading(false);
      }, 300);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container-wide py-16 text-center">
        <p className="text-lg">Loading product details...</p>
      </div>
    );
  }

  if (!product || product.name === "Product not found") {
    return (
      <div className="container-wide py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
        <Button className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown">
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-sawmill-dark-brown py-8">
        <div className="container-wide">
          <div className="text-white">
            <Link to="/products" className="text-white/80 hover:text-white">Products</Link> / <span>{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container-wide py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product images */}
          <div>
            <div className="bg-white border rounded-lg p-4 mb-4 aspect-square">
              <img 
                src={activeImage} 
                alt={product.name} 
                className="object-contain w-full h-full"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[product.image, ...product.galleryImages].map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`border rounded p-2 ${activeImage === img ? 'border-sawmill-dark-brown' : 'border-gray-200'}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    className="object-contain w-full h-16"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-sm text-gray-600 mb-4">{product.category}</p>
            <p className="text-3xl font-bold text-sawmill-dark-brown mb-4">{product.price}</p>
            <p className="mb-6">{product.description}</p>
            
            <div className="flex gap-4 mb-8">
              <Button size="lg" className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown">
                <Link to="/contact" className="w-full">Request Quote</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link to="/contact" className="w-full">Ask a Question</Link>
              </Button>
            </div>

            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.longDescription }} />
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 border-b border-sawmill-medium-brown pb-2">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {product.specifications.map((spec: any, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <p className="text-sm text-gray-600">{spec.name}</p>
                <p className="font-semibold">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related products placeholder */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 border-b border-sawmill-medium-brown pb-2">Related Products</h2>
          <p className="text-center py-8 bg-gray-100 rounded">Related products would be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
