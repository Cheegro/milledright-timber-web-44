
import React from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import NewsletterSubscription from '@/components/NewsletterSubscription';

interface BlogSidebarProps {
  recentPosts: any[];
  categories: any[];
  isLoading: boolean;
  onNewsletterClick?: () => void;
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({ 
  recentPosts, 
  categories, 
  isLoading,
  onNewsletterClick 
}) => {
  if (isLoading) {
    return (
      <aside className="space-y-6">
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-2">
            {Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-24" />
          <div className="space-y-2">
            {Array(4).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="space-y-6">
      {/* Blog Newsletter Subscription */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5 text-sawmill-orange" />
            Stay Updated
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Subscribe to get notified about new blog posts, workshop tips, and product updates.
          </p>
          <NewsletterSubscription variant="inline" />
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <div>
        <h3 className="font-bold text-lg mb-4">Recent Posts</h3>
        {recentPosts.length > 0 ? (
          <div className="space-y-4">
            {recentPosts.map(post => (
              <Link key={post.id} to={`/blog/${post.id}`} className="block group">
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={post.image_url} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2 group-hover:text-sawmill-dark-brown transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(post.published_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No recent posts found.</p>
        )}
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-bold text-lg mb-4">Categories</h3>
        {categories.length > 0 ? (
          <div className="space-y-2">
            {categories.map(category => (
              <Link 
                key={category.id} 
                to={`/blog?category=${category.id}`} 
                className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors group"
              >
                <span className="group-hover:text-sawmill-dark-brown transition-colors">
                  {category.name}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {category.count || 0}
                </Badge>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No categories found.</p>
        )}
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="font-bold text-lg mb-4">Quick Links</h3>
        <div className="space-y-2">
          <Link to="/products" className="block text-sm hover:text-sawmill-dark-brown transition-colors">
            Browse Products
          </Link>
          <Link to="/gallery" className="block text-sm hover:text-sawmill-dark-brown transition-colors">
            Project Gallery
          </Link>
          <Link to="/about" className="block text-sm hover:text-sawmill-dark-brown transition-colors">
            About MilledRight
          </Link>
          <Link to="/contact" className="block text-sm hover:text-sawmill-dark-brown transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
