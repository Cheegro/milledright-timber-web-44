
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2, Heart, Share2, ArrowLeft, ZoomIn } from 'lucide-react';
import { fetchProduct } from '@/api/productApi';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SocialMediaShare from '@/components/SocialMediaShare';
import RelatedProducts from '@/components/products/RelatedProducts';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [imageModalOpen, setImageModalOpen] = useState(false);

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

  const handleAddToDreamBoard = () => {
    toast({
      title: "Added to Dream Board",
      description: `${product.name} has been added to your dream board.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1">
          <div className="bg-sawmill-dark-brown py-4">
            <div className="container-wide">
              <div className="text-white flex items-center gap-2">
                <Link to="/products" className="text-white/80 hover:text-white flex items-center gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Products
                </Link>
                <span>/</span>
                <span>Loading...</span>
              </div>
            </div>
          </div>
          
          <div className="container-wide py-16 text-center">
            <Loader2 className="h-10 w-10 animate-spin text-sawmill-dark-brown mx-auto" />
            <p className="mt-4 text-lg">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1">
          <div className="container-wide py-16 text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
            <Button className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown">
              <Link to="/products" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Products
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Format price with board foot unit if applicable
  const priceDisplay = product.price_unit ? `${product.price} per ${product.price_unit}` : product.price;

  // Get gallery images or use empty array if none
  const galleryImages = product.gallery_images || [];
  const allImages = [product.image_url, ...galleryImages].filter(Boolean);

  // Get current URL for sharing
  const currentUrl = window.location.href;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="bg-sawmill-dark-brown py-4">
          <div className="container-wide">
            <div className="text-white flex items-center gap-2">
              <Link to="/products" className="text-white/80 hover:text-white flex items-center gap-1 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Products
              </Link>
              <span>/</span>
              <span className="text-sawmill-orange">{product.category}</span>
              <span>/</span>
              <span className="truncate">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="container-wide py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative bg-white border rounded-lg p-4 aspect-square group">
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="object-contain w-full h-full cursor-zoom-in"
                  onClick={() => setImageModalOpen(true)}
                />
                <button
                  onClick={() => setImageModalOpen(true)}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>
              
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {allImages.map((img, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveImage(img)}
                      className={`border rounded p-2 transition-all hover:border-sawmill-dark-brown ${
                        activeImage === img ? 'border-sawmill-dark-brown ring-2 ring-sawmill-orange/20' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${index + 1}`}
                        className="object-contain w-full h-16"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-sawmill-medium-brown font-medium uppercase tracking-wider mb-2">
                  {product.category}
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-sawmill-dark-brown mb-4">
                  {product.name}
                </h1>
                <p className="text-2xl md:text-3xl font-bold text-sawmill-orange mb-6">
                  {priceDisplay}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button 
                  size="lg" 
                  className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown flex-1 min-w-[200px]"
                >
                  <Link to="/contact" className="w-full">Request Quote</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleAddToDreamBoard}
                  className="border-sawmill-orange text-sawmill-orange hover:bg-sawmill-orange hover:text-white"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Add to Dream Board
                </Button>
              </div>

              {/* Product Description */}
              {product.description && (
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold text-sawmill-dark-brown mb-3">Description</h3>
                  <div 
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: product.description }} 
                  />
                </div>
              )}

              {/* Social Media Share */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-sawmill-dark-brown mb-3">Share this product</h3>
                <SocialMediaShare
                  url={currentUrl}
                  title={product.name}
                  description={product.description || `Check out this ${product.category} from MilledRight Sawmill`}
                  variant="buttons"
                />
              </div>

              {/* Additional Actions */}
              <div className="border-t pt-6">
                <Button variant="outline" className="w-full">
                  <Link to="/contact" className="w-full">Have Questions? Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Specifications */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="mt-12 border-t pt-8">
              <h2 className="text-2xl font-bold mb-6 text-sawmill-dark-brown">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {product.specifications.map((spec: any, index: number) => (
                  <div key={index} className="bg-gray-50 border rounded-lg p-4">
                    <p className="text-sm text-gray-600 font-medium">{spec.name}</p>
                    <p className="font-semibold text-sawmill-dark-brown">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Products */}
          <RelatedProducts 
            currentProductId={product.id} 
            currentProductCategory={product.category}
          />
        </div>

        {/* Image Modal */}
        {imageModalOpen && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setImageModalOpen(false)}
          >
            <div className="relative max-w-4xl w-full">
              <button
                onClick={() => setImageModalOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl z-10"
              >
                ×
              </button>
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-auto max-h-[90vh] object-contain"
              />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
