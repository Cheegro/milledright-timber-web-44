
import React, { useState, useEffect } from 'react';
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
  category?: string;
  tags?: string[];
  created_at: string;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        const galleryImages = await fetchGalleryImages();
        setImages(galleryImages as GalleryImage[]);
        setFilteredImages(galleryImages as GalleryImage[]);
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
          (image.category && image.category.toLowerCase().includes(searchQuery.toLowerCase()))
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
    <>
      <SEOHead 
        title="Project Gallery"
        description="Explore our gallery of completed projects showcasing premium lumber and expert craftsmanship from MilledRight Sawmill."
        keywords="lumber gallery, woodworking projects, custom furniture, live edge slabs, sawmill projects"
      />
      
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-secondary to-card text-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-primary rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-wide py-20 md:py-28 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-primary/20">
              <Camera className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Project Showcase</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-foreground">
              Gallery of Excellence
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Witness the transformation of premium lumber into stunning works of art. Each project represents our commitment to quality craftsmanship and attention to detail.
            </p>
            
            {/* Gallery highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                <div className="w-8 h-8 bg-primary rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Eye className="w-4 h-4 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">Live Edge Artistry</h3>
                <p className="text-sm text-muted-foreground">Natural wood edges preserved and enhanced</p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                <div className="w-8 h-8 bg-primary rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Grid3X3 className="w-4 h-4 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">Custom Structures</h3>
                <p className="text-sm text-muted-foreground">Unique architectural elements and furniture</p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                <div className="w-8 h-8 bg-primary rounded-full mx-auto mb-3 flex items-center justify-center">
                  <List className="w-4 h-4 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">Quality Materials</h3>
                <p className="text-sm text-muted-foreground">Premium lumber sourced and milled locally</p>
              </div>
            </div>
          </div>
        </div>
      </section>

        <div className="container-wide py-12">
        {/* Admin Link */}
        <div className="mb-6 text-center">
          <a 
            href="/admin/gallery" 
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Camera className="w-4 h-4" />
            Upload Images (Admin)
          </a>
        </div>
        
        {/* Enhanced Search and Filter Section */}
        <div className="mb-8 bg-card rounded-2xl shadow-lg p-6 border border-border">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search gallery..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-border bg-background text-foreground focus:border-primary"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="bg-secondary border border-border">
                  <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground">All</TabsTrigger>
                  <TabsTrigger value="furniture" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground">Furniture</TabsTrigger>
                  <TabsTrigger value="structures" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground">Structures</TabsTrigger>
                  <TabsTrigger value="live-edge" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground">Live Edge</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'border-border text-foreground hover:bg-secondary'}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'masonry' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('masonry')}
                  className={viewMode === 'masonry' ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'border-border text-foreground hover:bg-secondary'}
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
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-foreground mb-4">No images found</h2>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
          }`}>
            {filteredImages.map((image, index) => (
              <Card key={image.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border border-border bg-card shadow-lg hover:transform hover:scale-105">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                    loading={index < 6 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-foreground font-bold text-lg mb-1">{image.title}</h3>
                      {image.description && (
                        <p className="text-muted-foreground text-sm line-clamp-2">{image.description}</p>
                      )}
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">{image.title}</h3>
                    {image.category && (
                      <Badge variant="outline" className="border-primary text-primary bg-primary/10">
                        {image.category}
                      </Badge>
                    )}
                  </div>
                  {image.description && (
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{image.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;
