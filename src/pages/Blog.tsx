
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { fetchBlogPosts } from '@/api/blogApi';
import { toast } from '@/hooks/use-toast';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image_url: string | null;
  author: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  blog_categories?: {
    name: string;
  };
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const blogPosts = await fetchBlogPosts();
        // Only show published posts
        const publishedPosts = blogPosts.filter(post => post.status === 'published');
        setPosts(publishedPosts);
        setFilteredPosts(publishedPosts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
        toast({
          title: "Error loading blog posts",
          description: "There was a problem loading the blog posts. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getExcerpt = (content: string, excerpt: string | null) => {
    if (excerpt) return excerpt;
    // Strip HTML tags and truncate
    const plainText = content.replace(/<[^>]*>/g, '');
    return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="bg-sawmill-dark-brown py-12">
        <div className="container-wide">
          <h1 className="text-4xl font-bold text-white mb-4">Blog</h1>
          <p className="text-sawmill-light-brown text-lg">
            Insights, tips, and stories from our sawmill and woodworking projects
          </p>
        </div>
      </div>

      <div className="container-wide py-12">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sawmill-dark-brown"></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {searchQuery ? 'No posts found' : 'No blog posts yet'}
            </h2>
            <p className="text-gray-600 mb-8">
              {searchQuery 
                ? 'Try adjusting your search terms.' 
                : 'Check back soon for insights and stories from our sawmill.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {post.featured_image_url && (
                  <div className="aspect-video">
                    <img 
                      src={post.featured_image_url} 
                      alt={post.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.published_at || post.created_at)}</span>
                    </div>
                    {post.author && (
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                    )}
                  </div>
                  
                  {post.blog_categories && (
                    <Badge variant="secondary" className="mb-3">
                      {post.blog_categories.name}
                    </Badge>
                  )}
                  
                  <h3 className="text-xl font-bold text-sawmill-dark-brown mb-3 line-clamp-2">
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="hover:text-sawmill-orange transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {getExcerpt(post.content, post.excerpt)}
                  </p>
                  
                  <Button variant="outline" asChild className="w-full group">
                    <Link to={`/blog/${post.slug}`}>
                      <span>Read More</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
