
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { fetchProduct } from '@/api/productApi';
import { toast } from '@/components/ui/use-toast';
import SocialMediaShare from '@/components/SocialMediaShare';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    async function getProduct() {
      if (!id) {
        navigate('/products');
        return;
      }

      try {
        setLoading(true);
        const productData = await fetchProduct(id);
        
        if (!productData) {
          toast({
            title: "Product Not Found",
            description: "The requested product could not be found.",
            variant: "destructive",
          });
          navigate('/products');
          return;
        }
        
        setProduct(productData);
        setActiveImage(productData.image_url || '/placeholder.svg');
      } catch (error) {
        console.error("Error fetching product:", error);
        toast({
          title: "Error",
          description: "Failed to load product details. Please try again.",
          variant: "destructive",
        });
        navigate('/products');
      } finally {
        setLoading(false);
      }
    }
    
    getProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="bg-sawmill-dark-brown py-8">
          <div className="container-wide">
            <div className="text-white">
              <Link to="/products" className="text-white/80 hover:text-white">Products</Link> / <span>Loading...</span>
            </div>
          </div>
        </div>
        
        <div className="container-wide py-16 text-center">
          <Loader2 className="h-10 w-10 animate-spin text-sawmill-dark-brown mx-auto" />
          <p className="mt-4 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
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

  // Format price with board foot unit if applicable
  const priceDisplay = product.price_unit ? `${product.price} per ${product.price_unit}` : product.price;

  // Get gallery images or use empty array if none
  const galleryImages = product.gallery_images || [];

  // Get current URL for sharing
  const currentUrl = window.location.href;

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
              {[product.image_url, ...galleryImages].filter(Boolean).map((img, index) => (
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
            <p className="text-3xl font-bold text-sawmill-dark-brown mb-4">{priceDisplay}</p>
            
            {/* Social Media Share */}
            <div className="mb-6">
              <SocialMediaShare
                url={currentUrl}
                title={product.name}
                description={product.description || `Check out this ${product.category} from MilledRight Sawmill`}
                variant="buttons"
              />
            </div>
            
            <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: product.description }} />
            
            <div className="flex gap-4 mb-8">
              <Button size="lg" className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown">
                <Link to="/contact" className="w-full">Request Quote</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link to="/contact" className="w-full">Ask a Question</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Specifications if available */}
        {product.specifications && product.specifications.length > 0 && (
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
        )}

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
