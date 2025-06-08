import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Header from '@/components/Header';
import SEOHead from '@/components/SEOHead';
import { fetchGalleryImages, fetchCategories } from '@/services/galleryService';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

type GalleryImage = {
  id: string;
  title: string;
  description: string | null;
  category_id: string | null;
  image_url: string;
  thumbnail_url: string;
  created_at: string;
  updated_at: string;
  gallery_categories?: {
    name: string;
  };
};

type GroupedImages = {
  [key: string]: GalleryImage[];
};

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [galleryData, setGalleryData] = useState<GroupedImages>({
    all: [],
  });
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch gallery data from Supabase
  useEffect(() => {
    const loadGalleryData = async () => {
      setLoading(true);
      try {
        const [images, categoriesData] = await Promise.all([
          fetchGalleryImages(),
          fetchCategories()
        ]);
        
        // Group images by category
        const grouped: GroupedImages = { all: [...images] };
        
        categoriesData.forEach(category => {
          const categoryName = category.name.toLowerCase().replace(/\s+/g, '-');
          grouped[categoryName] = images.filter(img => 
            img.category_id === category.id
          );
        });
        
        setGalleryData(grouped);
        setCategories(['all', ...categoriesData.map(c => 
          c.name.toLowerCase().replace(/\s+/g, '-')
        )]);
      } catch (error) {
        console.error("Error loading gallery data:", error);
        toast({
          title: "Error loading gallery",
          description: "There was a problem loading the gallery. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadGalleryData();
  }, []);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
  };

  const getCategoryLabel = (key: string) => {
    if (key === 'all') return 'All';
    return key.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Our Work & Equipment Gallery"
        description="View our sawmill equipment, lumber processing, and completed projects. See the quality and craftsmanship of MilledRight Sawmill."
        image="/lovable-uploads/4775c114-fbd6-4ab0-8468-8fa4293e8e04.png"
      />
      
      <Header />
      
      {/* Enhanced Hero Section without background image */}
      <section className="relative bg-gradient-to-br from-sawmill-dark-brown via-sawmill-medium-brown to-sawmill-auburn text-white py-32 mt-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-20 w-56 h-56 bg-sawmill-orange rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-sawmill-light-brown rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-wide relative z-10">
          <motion.div 
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-sawmill-light-brown to-white bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Our Work & Equipment Gallery
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl text-sawmill-light-brown mb-8 leading-relaxed font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Browse our collection of custom milling projects, professional equipment, and quality lumber products
            </motion.p>
          </motion.div>
        </div>
      </section>
      
      <div className="container-wide py-16">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sawmill-dark-brown"></div>
          </div>
        ) : (
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-10">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 mb-12 bg-gray-100 p-2 rounded-2xl">
              {categories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="data-[state=active]:bg-sawmill-orange data-[state=active]:text-white rounded-xl font-medium transition-all duration-300"
                >
                  {getCategoryLabel(category)}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map(category => (
              <TabsContent key={category} value={category} className="mt-8">
                {galleryData[category]?.length === 0 ? (
                  <div className="text-center py-16 bg-gray-50 rounded-2xl">
                    <p className="text-lg text-gray-600">No images found in this category.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {galleryData[category]?.map((image) => (
                      <Card key={image.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl group">
                        <Dialog>
                          <DialogTrigger asChild>
                            <CardContent className="p-0 cursor-pointer" onClick={() => handleImageClick(image)}>
                              <div className="relative overflow-hidden">
                                <AspectRatio ratio={4/3}>
                                  <img 
                                    src={image.thumbnail_url} 
                                    alt={image.title} 
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                  />
                                </AspectRatio>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                  <h3 className="font-bold text-lg">{image.title}</h3>
                                </div>
                              </div>
                            </CardContent>
                          </DialogTrigger>
                        </Dialog>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}

        <div className="mt-16 text-center bg-gradient-to-r from-sawmill-orange/10 to-sawmill-auburn/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-sawmill-dark-brown mb-4">Don't see what you're looking for?</h3>
          <p className="text-lg mb-6 text-sawmill-medium-brown">We specialize in custom solutions tailored to your unique project needs.</p>
          <Button className="bg-gradient-to-r from-sawmill-orange to-sawmill-auburn text-white hover:from-sawmill-auburn hover:to-sawmill-orange shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl font-medium px-8 py-3 text-lg">
            Request Custom Milling
          </Button>
        </div>
      </div>

      {/* Enhanced Lightbox dialog */}
      <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && handleCloseDialog()}>
        <DialogContent className="max-w-6xl p-0 bg-black/95 border-none rounded-2xl overflow-hidden">
          <Button 
            onClick={handleCloseDialog}
            className="absolute right-6 top-6 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 z-10 backdrop-blur-sm"
            size="icon"
          >
            <X className="h-5 w-5" />
          </Button>
          {selectedImage && (
            <div className="relative">
              <img 
                src={selectedImage.image_url} 
                alt={selectedImage.title}
                className="w-full max-h-[85vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8">
                <h2 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h2>
                {selectedImage.description && (
                  <p className="text-white/90 text-lg leading-relaxed">{selectedImage.description}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
