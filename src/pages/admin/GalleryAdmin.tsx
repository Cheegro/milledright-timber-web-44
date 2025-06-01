import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Upload } from 'lucide-react';
import { fetchGalleryImages, fetchCategories, deleteGalleryImage, GalleryImage, GalleryCategory } from '@/services/galleryService';
import { toast } from '@/hooks/use-toast';

const GalleryAdmin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadGalleryData = async () => {
      setLoading(true);
      try {
        const [imagesData, categoriesData] = await Promise.all([
          fetchGalleryImages(),
          fetchCategories()
        ]);
        setImages(imagesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error loading gallery data:", error);
        toast({
          title: "Error loading gallery",
          description: "There was a problem loading the gallery data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadGalleryData();
  }, []);
  
  // Filter images based on search query and category
  const filteredImages = images.filter(image => {
    const matchesSearch = 
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (image.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    
    const matchesCategory = 
      currentCategory === 'All' || 
      (image.category_id && categories.find(cat => cat.id === image.category_id)?.name === currentCategory);
    
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories from the fetched categories
  const categoryOptions = ['All', ...categories.map(cat => cat.name)];

  // Handle delete image
  const handleDelete = async (image: GalleryImage) => {
    if (confirm(`Are you sure you want to delete "${image.title}"?`)) {
      const success = await deleteGalleryImage(image.id, image.image_url);
      if (success) {
        setImages(images.filter(img => img.id !== image.id));
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sawmill-dark-brown"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-sawmill-dark-brown">Gallery</h1>
        <div className="flex gap-2">
          <Link to="/admin/gallery/bulk-upload">
            <Button className="bg-sawmill-orange hover:bg-sawmill-auburn">
              <Upload className="h-4 w-4 mr-2" />
              Bulk Upload
            </Button>
          </Link>
          <Link to="/admin/gallery/new">
            <Button variant="outline">
              Add Single Image
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex-1">
          <Input
            placeholder="Search gallery..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map(category => (
            <Button
              key={category}
              variant={currentCategory === category ? "default" : "outline"}
              onClick={() => setCurrentCategory(category)}
              className={currentCategory === category ? "bg-sawmill-dark-brown hover:bg-sawmill-medium-brown" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {filteredImages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No images found matching your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map(image => (
            <Card key={image.id} className="overflow-hidden">
              <div className="aspect-square relative">
                <img 
                  src={image.thumbnail_url} 
                  alt={image.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 bg-white/80 hover:bg-white rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="12" cy="5" r="1" />
                          <circle cx="12" cy="19" r="1" />
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/admin/gallery/${image.id}/edit`} className="w-full">Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(image)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-sawmill-dark-brown">{image.title}</h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{image.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {categories.find(cat => cat.id === image.category_id)?.name || "Uncategorized"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(image.created_at).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryAdmin;
