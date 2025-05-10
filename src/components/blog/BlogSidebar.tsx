
import React from 'react';
import BlogSearch from './BlogSearch';
import BlogCategories from './BlogCategories';
import BlogRecentPosts from './BlogRecentPosts';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
}

interface Category {
  name: string;
  count: number;
}

interface BlogSidebarProps {
  recentPosts: BlogPost[];
  categories: Category[];
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({ recentPosts, categories }) => {
  return (
    <div className="space-y-8">
      <BlogSearch />
      <BlogCategories categories={categories} />
      <BlogRecentPosts posts={recentPosts} />
    </div>
  );
};

export default BlogSidebar;
