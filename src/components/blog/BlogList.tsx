
import React from 'react';
import BlogCard from './BlogCard';
import { Skeleton } from "@/components/ui/skeleton";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date?: string;
  published_at?: string; 
  author: string;
  author_name?: string; // Added for compatibility
  category?: string;
  imageUrl?: string;
  image_url?: string;
  featured_image_url?: string; // Added for compatibility
}

export interface BlogListProps {
  posts: BlogPost[];
  isLoading?: boolean;
  isAdmin?: boolean;
}

const BlogList: React.FC<BlogListProps> = ({ posts, isLoading = false, isAdmin = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="border rounded-lg overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No blog posts found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <BlogCard 
          key={post.id} 
          post={post} 
          isAdmin={isAdmin} 
        />
      ))}
    </div>
  );
};

export default BlogList;
