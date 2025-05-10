
import React from 'react';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogList from '@/components/blog/BlogList';
import BlogSidebar from '@/components/blog/BlogSidebar';
import { blogPosts, categories } from '@/data/blogData';

const Blog = () => {
  return (
    <div className="min-h-screen">
      <BlogHeader />
      
      <div className="container-wide py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content - Blog posts */}
          <div className="lg:col-span-2">
            <BlogList posts={blogPosts} />
          </div>
          
          {/* Sidebar */}
          <BlogSidebar recentPosts={blogPosts} categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default Blog;
