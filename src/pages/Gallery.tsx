import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Grid3X3, List, Eye, Camera } from 'lucide-react';
import { fetchGalleryImages } from '@/services/galleryService';
import { toast } from '@/hooks/use-toast';

interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category: string;
  tags?: string[];
  created_at: string;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode<'grid' | 'masonry'>('grid');

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        const galleryImages = await fetchGalleryImages();
        setImages(galleryImages);
        setFilteredImages(galleryImages);
      } catch (error) {
        console.error('Error loading gallery images:', error);
        toast({
          title: "Error loading gallery images",
          description: "There was a problem loading the images. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    const filterImages = () => {
      let results = images;

      if (searchQuery) {
        results = results.filter(image =>
          image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (image.description && image.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
          image.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (selectedCategory !== 'all') {
        results = results.filter(image => image.category === selectedCategory);
      }

      setFilteredImages(results);
    };

    filterImages();
  }, [searchQuery, selectedCategory, images]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Project Gallery"
        description="Explore our gallery of completed projects showcasing premium lumber and expert craftsmanship from MilledRight Sawmill."
        keywords="lumber gallery, woodworking projects, custom furniture, live edge slabs, sawmill projects"
      />
      
      <Header />
      
      <main className="flex-1">
        {/* Enhanced Hero Section */}
        <section className="relative bg-gradient-to-br from-sawmill-dark-brown via-sawmill-medium-brown to-sawmill-auburn text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-sawmill-orange rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-sawmill-light-brown rounded-full blur-3xl"></div>
          </div>
          
          <div className="container-wide py-20 md:py-28 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Camera className="w-5 h-5" />
                <span className="text-sm font-medium">Project Showcase</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Gallery of Excellence
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed max-w-3xl mx-auto">
                Witness the transformation of premium lumber into stunning works of art. Each project represents our commitment to quality craftsmanship and attention to detail.
              </p>
              
              {/* Gallery highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="w-8 h-8 bg-sawmill-orange rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Eye className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Live Edge Artistry</h3>
                  <p className="text-sm text-gray-200">Natural wood edges preserved and enhanced</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="w-8 h-8 bg-sawmill-forest rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Grid3X3 className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Custom Structures</h3>
                  <p className="text-sm text-gray-200">Unique architectural elements and furniture</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="w-8 h-8 bg-sawmill-auburn rounded-full mx-auto mb-3 flex items-center justify-center">
                    <List className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Quality Materials</h3>
                  <p className="text-sm text-gray-200">Premium lumber sourced and milled locally</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container-wide py-12">
          {/* Enhanced Search and Filter Section */}
          <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search gallery..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-gray-200 focus:border-sawmill-orange"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                  <TabsList className="bg-gray-100">
                    <TabsTrigger value="all" className="data-[state=active]:bg-sawmill-orange data-[state=active]:text-white">All</TabsTrigger>
                    <TabsTrigger value="furniture" className="data-[state=active]:bg-sawmill-orange data-[state=active]:text-white">Furniture</TabsTrigger>
                    <TabsTrigger value="structures" className="data-[state=active]:bg-sawmill-orange data-[state=active]:text-white">Structures</TabsTrigger>
                    <TabsTrigger value="live-edge" className="data-[state=active]:bg-sawmill-orange data-[state=active]:text-white">Live Edge</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'bg-sawmill-orange hover:bg-sawmill-auburn' : ''}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'masonry' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('masonry')}
                    className={viewMode === 'masonry' ? 'bg-sawmill-orange hover:bg-sawmill-auburn' : ''}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Content */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sawmill-dark-brown"></div>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">No images found</h2>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
            }`}>
              {filteredImages.map((image, index) => (
                <Card key={image.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-lg hover:transform hover:scale-105">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={image.image_url}
                      alt={image.title}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                      loading={index < 6 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
                        {image.description && (
                          <p className="text-white/90 text-sm line-clamp-2">{image.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sawmill-dark-brown">{image.title}</h3>
                      <Badge variant="outline" className="border-sawmill-orange text-sawmill-orange">
                        {image.category}
                      </Badge>
                    </div>
                    {image.description && (
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">{image.description}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Gallery;
