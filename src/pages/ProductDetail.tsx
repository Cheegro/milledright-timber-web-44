
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2, Heart, Share2, ArrowLeft, ZoomIn, Sparkles, Award, ShieldCheck } from 'lucide-react';
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
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
        <Header />
        <div className="flex-1">
          {/* Enhanced breadcrumb with gradient background */}
          <div className="bg-gradient-to-r from-sawmill-dark-brown via-sawmill-medium-brown to-sawmill-dark-brown py-6">
            <div className="container-wide">
              <div className="text-white flex items-center gap-2">
                <Link to="/products" className="text-white/80 hover:text-white flex items-center gap-2 transition-colors duration-300">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Products</span>
                </Link>
                <span className="text-white/60">/</span>
                <span>Loading...</span>
              </div>
            </div>
          </div>
          
          <div className="container-wide py-20 text-center">
            <div className="max-w-sm mx-auto">
              <div className="relative">
                <Loader2 className="h-16 w-16 animate-spin text-sawmill-orange mx-auto" />
                <div className="absolute inset-0 bg-gradient-to-r from-sawmill-orange to-sawmill-medium-brown opacity-20 rounded-full animate-pulse"></div>
              </div>
              <h2 className="mt-6 text-2xl font-bold bg-gradient-to-r from-sawmill-dark-brown to-sawmill-medium-brown bg-clip-text text-transparent">
                Loading Premium Details
              </h2>
              <p className="mt-2 text-gray-600">Preparing your product showcase...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
        <Header />
        <div className="flex-1">
          <div className="container-wide py-20 text-center">
            <div className="max-w-md mx-auto">
              <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full w-fit mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Product Not Found
              </h1>
              <p className="mb-8 text-gray-600 leading-relaxed">
                Sorry, we couldn't find the premium product you're looking for. Let's get you back to browsing our collection.
              </p>
              <Button className="bg-gradient-to-r from-sawmill-dark-brown to-sawmill-medium-brown hover:from-sawmill-medium-brown hover:to-sawmill-dark-brown shadow-lg hover:shadow-xl transition-all duration-300">
                <Link to="/products" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Products
                </Link>
              </Button>
            </div>
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
      <Header />
      
      <div className="flex-1">
        {/* Enhanced Breadcrumb Navigation with premium styling */}
        <div className="bg-gradient-to-r from-sawmill-dark-brown via-sawmill-medium-brown to-sawmill-dark-brown py-6 shadow-lg">
          <div className="container-wide">
            <div className="text-white flex items-center gap-3">
              <Link to="/products" className="text-white/80 hover:text-white flex items-center gap-2 transition-all duration-300 hover:scale-105">
                <ArrowLeft className="h-4 w-4" />
                <span className="font-medium">Products</span>
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-sawmill-orange font-medium">{product.category}</span>
              <span className="text-white/40">/</span>
              <span className="truncate font-medium">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="container-wide py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Enhanced Product Images Section */}
            <div className="space-y-6">
              <div className="relative bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 aspect-square group shadow-xl">
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="object-contain w-full h-full cursor-zoom-in transition-transform duration-500 group-hover:scale-105"
                  onClick={() => setImageModalOpen(true)}
                />
                <button
                  onClick={() => setImageModalOpen(true)}
                  className="absolute top-6 right-6 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70 backdrop-blur-sm"
                >
                  <ZoomIn className="h-5 w-5" />
                </button>
                
                {/* Premium quality badge */}
                <div className="absolute top-6 left-6 bg-gradient-to-r from-sawmill-orange to-sawmill-medium-brown text-white px-4 py-2 rounded-full font-medium shadow-lg flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Premium Quality
                </div>
              </div>
              
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {allImages.map((img, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveImage(img)}
                      className={`border-2 rounded-xl p-2 transition-all duration-300 hover:border-sawmill-orange hover:scale-105 ${
                        activeImage === img 
                          ? 'border-sawmill-orange ring-4 ring-sawmill-orange/20 shadow-lg' 
                          : 'border-gray-200 hover:shadow-md'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${index + 1}`}
                        className="object-contain w-full h-20 rounded-lg"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Enhanced Product Details Section */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-r from-sawmill-orange to-sawmill-medium-brown rounded-lg">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-sm text-sawmill-medium-brown font-bold uppercase tracking-wider">
                    {product.category}
                  </p>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-sawmill-dark-brown mb-4 leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 mb-6">
                  <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sawmill-orange to-sawmill-medium-brown bg-clip-text text-transparent">
                    {priceDisplay}
                  </p>
                  <div className="flex items-center gap-1 text-sawmill-orange">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="text-sm font-medium">Quality Guaranteed</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-sawmill-dark-brown to-sawmill-medium-brown hover:from-sawmill-medium-brown hover:to-sawmill-dark-brown flex-1 min-w-[200px] shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link to="/contact" className="w-full flex items-center justify-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Request Quote
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleAddToDreamBoard}
                  className="border-2 border-sawmill-orange text-sawmill-orange hover:bg-sawmill-orange hover:text-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Add to Dream Board
                </Button>
              </div>

              {/* Enhanced Product Description */}
              {product.description && (
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg">
                  <h3 className="text-xl font-bold text-sawmill-dark-brown mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-sawmill-orange" />
                    Product Details
                  </h3>
                  <div 
                    className="text-gray-700 leading-relaxed prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: product.description }} 
                  />
                </div>
              )}

              {/* Enhanced Social Media Share */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg">
                <h3 className="text-xl font-bold text-sawmill-dark-brown mb-4 flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-sawmill-orange" />
                  Share this Premium Product
                </h3>
                <SocialMediaShare
                  url={currentUrl}
                  title={product.name}
                  description={product.description || `Check out this premium ${product.category} from MilledRight Sawmill`}
                  variant="buttons"
                />
              </div>

              {/* Enhanced Additional Actions */}
              <div className="space-y-3">
                <Button variant="outline" className="w-full border-2 border-gray-300 hover:border-sawmill-orange hover:text-sawmill-orange transition-all duration-300">
                  <Link to="/contact" className="w-full flex items-center justify-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    Have Questions? Contact Our Experts
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced Specifications Section */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="mt-16 border-t border-gradient-to-r from-transparent via-gray-200 to-transparent pt-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-r from-sawmill-orange to-sawmill-medium-brown rounded-xl">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-sawmill-dark-brown to-sawmill-medium-brown bg-clip-text text-transparent">
                  Technical Specifications
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {product.specifications.map((spec: any, index: number) => (
                  <div key={index} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <p className="text-sm text-sawmill-medium-brown font-bold uppercase tracking-wider mb-2">{spec.name}</p>
                    <p className="text-xl font-bold text-sawmill-dark-brown">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Products with enhanced styling */}
          <RelatedProducts 
            currentProductId={product.id} 
            currentProductCategory={product.category}
          />
        </div>

        {/* Enhanced Image Modal */}
        {imageModalOpen && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setImageModalOpen(false)}
          >
            <div className="relative max-w-6xl w-full">
              <button
                onClick={() => setImageModalOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl z-10 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 hover:bg-black/70"
              >
                ×
              </button>
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-auto max-h-[90vh] object-contain rounded-2xl shadow-2xl"
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
