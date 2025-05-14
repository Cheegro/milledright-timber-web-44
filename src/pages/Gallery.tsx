
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import SharedBanner from '@/components/SharedBanner';
import { fetchGalleryImages, fetchCategories } from '@/services/galleryService';
import { toast } from '@/hooks/use-toast';

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
      <div className="bg-sawmill-dark-brown py-12">
        <div className="container-wide">
          <h1 className="text-4xl font-bold text-white mb-4">Gallery</h1>
          <p className="text-sawmill-light-brown text-lg">
            Browse our collection of custom milling projects, furniture, and slabs
          </p>
        </div>
      </div>
      
      {/* Add compact banner */}
      <SharedBanner variant="compact" />
      
      <div className="container-wide py-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sawmill-dark-brown"></div>
          </div>
        ) : (
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-10">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
              {categories.map(category => (
                <TabsTrigger key={category} value={category}>
                  {getCategoryLabel(category)}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map(category => (
              <TabsContent key={category} value={category} className="mt-8">
                {galleryData[category]?.length === 0 ? (
                  <div className="text-center py-12">
                    <p>No images found in this category.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {galleryData[category]?.map((image) => (
                      <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <Dialog>
                          <DialogTrigger asChild>
                            <CardContent className="p-0 cursor-pointer" onClick={() => handleImageClick(image)}>
                              <div className="relative">
                                <AspectRatio ratio={4/3}>
                                  <img 
                                    src={image.thumbnail_url} 
                                    alt={image.title} 
                                    className="object-cover w-full h-full"
                                  />
                                </AspectRatio>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                                  <h3 className="font-semibold">{image.title}</h3>
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

        <div className="mt-12 text-center">
          <p className="text-lg mb-4">Don't see what you're looking for?</p>
          <Button className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown">
            Request Custom Milling
          </Button>
        </div>
      </div>

      {/* Lightbox dialog */}
      <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && handleCloseDialog()}>
        <DialogContent className="max-w-4xl p-0 bg-black/90 border-none">
          <Button 
            onClick={handleCloseDialog}
            className="absolute right-4 top-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 z-10"
            size="icon"
          >
            <X className="h-4 w-4" />
          </Button>
          {selectedImage && (
            <div className="relative">
              <img 
                src={selectedImage.image_url} 
                alt={selectedImage.title}
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h2 className="text-xl font-bold text-white">{selectedImage.title}</h2>
                {selectedImage.description && (
                  <p className="text-white/80 mt-2">{selectedImage.description}</p>
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
