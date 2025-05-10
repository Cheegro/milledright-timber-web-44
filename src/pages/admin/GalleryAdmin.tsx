import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Updated mock data with real images
const mockImages = [
  { 
    id: 1, 
    title: 'Custom Milling in Action',
    description: 'Customer using our portable sawmill service',
    category: 'Operations',
    date: 'May 10, 2025',
    thumbnail: 'https://lh3.googleusercontent.com/pw/AP1GczN1IOYefycEDh-kyR3PW-NwuwJK2PVvhV_Is2mY9SiOBocgJjcv83p99G6SnGWOIXNqgFgRWVkyvgJ6ExtYJJ7lGIqebRO12YnP_5tcLic5iykE=w2400'
  },
  { 
    id: 2, 
    title: 'Live Edge Slabs',
    description: 'Beautiful live edge wood ready for finishing',
    category: 'Product Images',
    date: 'May 8, 2025',
    thumbnail: 'https://lh3.googleusercontent.com/pw/AP1GczOAcByE5Hm4MYIMettl4emX9aNlg4wLE-Y-TPISX24hZT_d6KeYda7iviQoVVw8xZqpvwwMUohBa6xDoxPRM22HGaag8KVSxhgF7AvievLP_kIi=w2400'
  },
  { 
    id: 3, 
    title: 'Portable Sawmill',
    description: 'Our portable sawmill setup at a customer location',
    category: 'Product Images',
    date: 'May 5, 2025',
    thumbnail: 'https://lh3.googleusercontent.com/pw/AP1GczMF-UwqDS0mzQhvKlZMMUqQjKwTeLsMs_9Y8SwdIC6a9h2vDZKec37odDn28R83IKXkMt7gvRsUIDIF0q6QJIrum2GSCsSeGQQjbUZVMcRypTv_=w2400'
  },
  { 
    id: 4, 
    title: 'Lumber Stack',
    description: 'Fresh cut dimensional lumber ready for drying',
    category: 'Product Images',
    date: 'April 28, 2025',
    thumbnail: 'https://lh3.googleusercontent.com/pw/AP1GczNwsxZoR0-yVe3k_Wii5gR_FvJK_h-vkiR3vX3fW0miFTsr7FkZT6eO51tiqWzzGxgNpFmsJ9fDIw1K228F74pLeywJu11ezWCxrKEFkcUw7OhX=w2400'
  },
  { 
    id: 5, 
    title: 'Sawmill Operation',
    description: 'Processing logs at our main facility',
    category: 'Operations',
    date: 'April 20, 2025',
    thumbnail: 'https://lh3.googleusercontent.com/pw/AP1GczMvU1jPjRuTD7NTL26kN32qe3xBVIe9TFH12AhmjREiYsWiWrKArbnxaIv-2OCojyczJbFsjBAJ9DDAKguoih5sYfzfZLUWiHcjm1CABI8YBg3y=w2400'
  },
  { 
    id: 6, 
    title: 'Specialized Cutting',
    description: 'Custom cutting for unique project requirements',
    category: 'Services',
    date: 'April 15, 2025',
    thumbnail: 'https://lh3.googleusercontent.com/pw/AP1GczOZ48lmtWVIpvHxJwGSMxDbasI8aR7GnAWPCafZTHrTsYBmPz79yKSHqwejiWNeCPKGp6hS3E3wYcuzQJ9jhADsHpoBccgrP7_PNvIMzEsexzLv=w2400'
  },
  { 
    id: 7, 
    title: 'Wood Samples',
    description: 'Various wood species available at our mill',
    category: 'Product Images',
    date: 'April 10, 2025',
    thumbnail: 'https://lh3.googleusercontent.com/pw/AP1GczP48Owk0UOdaqptbQ0LDibJMEigXrR_6wR7fJt-xZ1sWCMU6zmv90R9jQ7MHNgTMEWpAWv6jXQYjDlMaVF_mwJqVY_jwXbfJ9DZw4uSqfZ0QjbL=w2400'
  },
  { 
    id: 8, 
    title: 'Mill Setup',
    description: 'Setting up our portable mill for a custom job',
    category: 'Operations',
    date: 'April 5, 2025',
    thumbnail: 'https://lh3.googleusercontent.com/pw/AP1GczNLvUgvZSbzRZXdpVowZi-2wptldWSWZDBtrwDaMks0T3B9H4fTcrMJut7RJUo93xFIJU9djlLDXQOa7XoW3VzbwFNE33MTSmrPXa-9vB_enYD6=w2400'
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
