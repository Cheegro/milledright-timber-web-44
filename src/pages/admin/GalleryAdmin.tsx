
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock data for gallery images
const mockImages = [
  { 
    id: 1, 
    title: 'LT40 in Action',
    description: 'Customer using the LT40 Portable Sawmill',
    category: 'Product Images',
    date: 'May 10, 2025',
    thumbnail: '/placeholder.svg'
  },
  { 
    id: 2, 
    title: 'Custom Furniture Project',
    description: 'Finished furniture made with lumber from our mills',
    category: 'Customer Projects',
    date: 'May 8, 2025',
    thumbnail: '/placeholder.svg'
  },
  { 
    id: 3, 
    title: 'Mill Installation',
    description: 'Setting up a new industrial mill',
    category: 'Installations',
    date: 'May 5, 2025',
    thumbnail: '/placeholder.svg'
  },
  { 
    id: 4, 
    title: 'Timber Processing',
    description: 'Large logs being processed at a commercial operation',
    category: 'Operations',
    date: 'April 28, 2025',
    thumbnail: '/placeholder.svg'
  },
  { 
    id: 5, 
    title: 'Portable Mill Demo',
    description: 'Demonstrating the LT20 at a trade show',
    category: 'Events',
    date: 'April 20, 2025',
    thumbnail: '/placeholder.svg'
  },
  { 
    id: 6, 
    title: 'Custom Cabin Build',
    description: 'Customer building a cabin with lumber milled on site',
    category: 'Customer Projects',
    date: 'April 15, 2025',
    thumbnail: '/placeholder.svg'
  },
  { 
    id: 7, 
    title: 'Mill Maintenance',
    description: 'Proper maintenance techniques for your mill',
    category: 'Maintenance',
    date: 'April 10, 2025',
    thumbnail: '/placeholder.svg'
  },
  { 
    id: 8, 
    title: 'Factory Tour',
    description: 'Inside look at our manufacturing facility',
    category: 'Company',
    date: 'April 5, 2025',
    thumbnail: '/placeholder.svg'
  },
];

const GalleryAdmin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All');
  
  // Filter images based on search query and category
  const filteredImages = mockImages.filter(image => {
    const matchesSearch = image.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        image.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = currentCategory === 'All' || image.category === currentCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories from images
  const categories = ['All', ...Array.from(new Set(mockImages.map(img => img.category)))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-sawmill-dark-brown">Gallery</h1>
        <Button className="bg-sawmill-orange hover:bg-sawmill-auburn">
          <Link to="/admin/gallery/new">Add New Image</Link>
        </Button>
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
          {categories.map(category => (
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.map(image => (
          <Card key={image.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <img 
                src={image.thumbnail} 
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
                    <DropdownMenuItem>
                      <Link to={`/admin/gallery/${image.id}/edit`} className="w-full">Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500"
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${image.title}"?`)) {
                          console.log(`Delete image ${image.id}`);
                        }
                      }}
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
                <span className="text-xs text-muted-foreground">{image.category}</span>
                <span className="text-xs text-muted-foreground">{image.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GalleryAdmin;
