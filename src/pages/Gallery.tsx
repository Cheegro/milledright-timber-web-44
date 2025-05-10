
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

// Mock gallery data - in a real app this would come from an API
const galleryData = {
  all: [
    { id: 1, title: "Custom Milled Oak", category: "custom", imageUrl: "/placeholder.svg" },
    { id: 2, title: "Live Edge Table", category: "furniture", imageUrl: "/placeholder.svg" },
    { id: 3, title: "Cedar Deck Installation", category: "projects", imageUrl: "/placeholder.svg" },
    { id: 4, title: "Walnut Slabs", category: "slabs", imageUrl: "/placeholder.svg" },
    { id: 5, title: "Pine Beams", category: "custom", imageUrl: "/placeholder.svg" },
    { id: 6, title: "Maple Shelving", category: "furniture", imageUrl: "/placeholder.svg" },
    { id: 7, title: "Cherry Wood Flooring", category: "projects", imageUrl: "/placeholder.svg" },
    { id: 8, title: "Reclaimed Barn Wood", category: "custom", imageUrl: "/placeholder.svg" },
    { id: 9, title: "Hickory Conference Table", category: "furniture", imageUrl: "/placeholder.svg" },
    { id: 10, title: "Douglas Fir Timber Frame", category: "projects", imageUrl: "/placeholder.svg" },
    { id: 11, title: "Elm Slabs", category: "slabs", imageUrl: "/placeholder.svg" },
    { id: 12, title: "Custom Cut Redwood", category: "custom", imageUrl: "/placeholder.svg" }
  ],
  custom: [
    { id: 1, title: "Custom Milled Oak", category: "custom", imageUrl: "/placeholder.svg" },
    { id: 5, title: "Pine Beams", category: "custom", imageUrl: "/placeholder.svg" },
    { id: 8, title: "Reclaimed Barn Wood", category: "custom", imageUrl: "/placeholder.svg" },
    { id: 12, title: "Custom Cut Redwood", category: "custom", imageUrl: "/placeholder.svg" }
  ],
  furniture: [
    { id: 2, title: "Live Edge Table", category: "furniture", imageUrl: "/placeholder.svg" },
    { id: 6, title: "Maple Shelving", category: "furniture", imageUrl: "/placeholder.svg" },
    { id: 9, title: "Hickory Conference Table", category: "furniture", imageUrl: "/placeholder.svg" }
  ],
  projects: [
    { id: 3, title: "Cedar Deck Installation", category: "projects", imageUrl: "/placeholder.svg" },
    { id: 7, title: "Cherry Wood Flooring", category: "projects", imageUrl: "/placeholder.svg" },
    { id: 10, title: "Douglas Fir Timber Frame", category: "projects", imageUrl: "/placeholder.svg" }
  ],
  slabs: [
    { id: 4, title: "Walnut Slabs", category: "slabs", imageUrl: "/placeholder.svg" },
    { id: 11, title: "Elm Slabs", category: "slabs", imageUrl: "/placeholder.svg" }
  ]
};

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedImage, setSelectedImage] = useState<null | { id: number, title: string, imageUrl: string }>(null);

  const handleImageClick = (image: { id: number, title: string, imageUrl: string }) => {
    setSelectedImage(image);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
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
      
      <div className="container-wide py-10">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-10">
          <TabsList className="grid w-full grid-cols-5 sm:grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="custom">Custom Milling</TabsTrigger>
            <TabsTrigger value="furniture">Furniture</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="slabs">Slabs</TabsTrigger>
          </TabsList>
          
          {Object.keys(galleryData).map(category => (
            <TabsContent key={category} value={category} className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {galleryData[category as keyof typeof galleryData].map((image) => (
                  <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <DialogTrigger asChild onClick={() => handleImageClick(image)}>
                      <CardContent className="p-0 cursor-pointer">
                        <div className="relative">
                          <AspectRatio ratio={4/3}>
                            <img 
                              src={image.imageUrl} 
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
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

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
                src={selectedImage.imageUrl} 
                alt={selectedImage.title}
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h2 className="text-xl font-bold text-white">{selectedImage.title}</h2>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
