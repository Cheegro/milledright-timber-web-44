
import React, { useState } from 'react';
import BlogSearch from './BlogSearch';
import BlogCategories from './BlogCategories';
import BlogRecentPosts from './BlogRecentPosts';
import { Skeleton } from '@/components/ui/skeleton';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date?: string;
  published_at?: string;
  author?: string;
  category?: string;
  imageUrl?: string;
  image_url?: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

interface BlogSidebarProps {
  recentPosts: BlogPost[];
  categories: Category[];
  isLoading?: boolean;
  selectedCategoryId?: string | null;
  onCategoryClick?: (categoryId: string | null) => void;
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({ 
  recentPosts, 
  categories, 
  isLoading = false,
  selectedCategoryId = null,
  onCategoryClick = () => {} 
}) => {
  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[250px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <BlogSearch />
      <BlogCategories 
        categories={categories} 
        selectedCategoryId={selectedCategoryId}
        onCategoryClick={onCategoryClick}
      />
      <BlogRecentPosts posts={recentPosts} />
    </div>
  );
};

export default BlogSidebar;
