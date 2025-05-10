
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

// Mock blog data - in a real app this would come from an API
const blogPosts = [
  {
    id: 1,
    title: "Selecting the Right Wood for Your Project",
    excerpt: "Learn how to choose the perfect type of wood for any woodworking project based on durability, appearance, and budget.",
    date: "2025-04-22",
    author: "Mike Johnson",
    category: "Tips & Tricks",
    imageUrl: "public/lovable-uploads/15c1d1dd-4743-4437-9885-f0a252905680.png"
  },
  {
    id: 2,
    title: "Understanding Wood Moisture Content",
    excerpt: "Why moisture content matters in lumber and how it affects your woodworking projects in both the short and long term.",
    date: "2025-04-15",
    author: "Sarah Miller",
    category: "Education",
    imageUrl: "public/lovable-uploads/bc15c355-6ee0-46a0-abe2-a10542535a4e.png"
  },
  {
    id: 3,
    title: "The Advantages of Portable Sawmills",
    excerpt: "Discover why portable sawmills are revolutionizing small-scale lumber production and custom woodworking.",
    date: "2025-04-08",
    author: "Tom Wilson",
    category: "Equipment",
    imageUrl: "public/lovable-uploads/fbfcdde3-8d46-4da8-8058-04b6ba96bfc4.png"
  },
  {
    id: 4,
    title: "Sustainable Forestry Practices",
    excerpt: "How we ensure our lumber comes from responsibly managed forests and why it matters for the environment.",
    date: "2025-03-30",
    author: "Lisa Green",
    category: "Sustainability",
    imageUrl: "public/lovable-uploads/20824b3a-95ce-47ff-895d-b19f775386b0.png"
  },
  {
    id: 5,
    title: "Working with Live Edge Slabs",
    excerpt: "Tips and techniques for incorporating the natural beauty of live edge wood into your furniture projects.",
    date: "2025-03-21",
    author: "Chris Taylor",
    category: "Projects",
    imageUrl: "public/lovable-uploads/3c7d6dd1-8b41-4a54-abd5-a29423098810.png"
  },
  {
    id: 6,
    title: "Proper Wood Storage Techniques",
    excerpt: "How to store your lumber to prevent warping, cracking, and other issues that can ruin your wood supply.",
    date: "2025-03-15",
    author: "Mike Johnson",
    category: "Tips & Tricks",
    imageUrl: "public/lovable-uploads/3690e90b-4ecc-4ea1-ae72-8c2c65ccba68.png"
  }
];

// Mock categories with counts
const categories = [
  { name: "Tips & Tricks", count: 12 },
  { name: "Projects", count: 8 },
  { name: "Equipment", count: 6 },
  { name: "Sustainability", count: 5 },
  { name: "Education", count: 7 }
];

// Format the date in a nice readable format
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const Blog = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-sawmill-dark-brown py-12">
        <div className="container-wide">
          <h1 className="text-4xl font-bold text-white mb-4">Blog</h1>
          <p className="text-sawmill-light-brown text-lg">
            Insights, tips, and stories from the world of sawmills and woodworking
          </p>
        </div>
      </div>
      
      <div className="container-wide py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content - Blog posts */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link to={`/blog/${post.id}`}>
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <Badge className="w-fit mb-2 bg-sawmill-medium-brown hover:bg-sawmill-dark-brown">{post.category}</Badge>
                      <CardTitle className="hover:text-sawmill-dark-brown transition-colors">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter className="text-sm text-muted-foreground flex justify-between">
                      <span>{formatDate(post.date)}</span>
                      <span>By {post.author}</span>
                    </CardFooter>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle>Search</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <button className="absolute right-3 top-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  </button>
                </div>
              </CardContent>
            </Card>
            
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <React.Fragment key={category.name}>
                      <li>
                        <Link 
                          to={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="flex justify-between hover:text-sawmill-dark-brown transition-colors"
                        >
                          <span>{category.name}</span>
                          <span className="text-muted-foreground">{category.count}</span>
                        </Link>
                      </li>
                      {index < categories.length - 1 && (
                        <Separator className="my-2" />
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {/* Recent posts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {blogPosts.slice(0, 3).map((post, index) => (
                    <React.Fragment key={post.id}>
                      <li>
                        <Link 
                          to={`/blog/${post.id}`}
                          className="flex gap-3 hover:text-sawmill-dark-brown transition-colors"
                        >
                          <div className="w-16 h-16 flex-shrink-0">
                            <img 
                              src={post.imageUrl} 
                              alt={post.title}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{post.title}</h4>
                            <p className="text-xs text-muted-foreground">{formatDate(post.date)}</p>
                          </div>
                        </Link>
                      </li>
                      {index < 2 && (
                        <Separator className="my-4" />
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
