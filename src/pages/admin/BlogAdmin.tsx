
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogList from '@/components/blog/BlogList';
import BlogCategories from '@/components/blog/BlogCategories';
import BlogCategoryManager from '@/components/blog/BlogCategoryManager';
import { useQuery } from '@tanstack/react-query';
import { 
  fetchBlogCategories, 
  fetchBlogPosts,
  BlogPost as AdminBlogPost,
  BlogCategory
} from '@/api/adminBlogApi';

// Define compatible interfaces to bridge the type differences
interface Category {
  id: string;
  name: string;
  count?: number;
}

interface BlogPost {
  id: string;
  title: string;
  slug?: string;
  content: string;
  excerpt: string;
  author: string;
  category_id: string | null;
  is_published: boolean;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  category_name?: string;
}

const BlogAdmin = () => {
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Fetch blog posts
  const { data: adminPosts = [], isLoading: postsLoading, error: postsError } = useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: fetchBlogPosts
  });
  
  // Fetch categories
  const { data: adminCategories = [], isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: fetchBlogCategories
  });
  
  // Convert to compatible types
  const categories: Category[] = adminCategories.map(cat => ({
    ...cat,
    count: 0 // Add required count property
  }));
  
  const posts: BlogPost[] = adminPosts.map(post => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.content,
    excerpt: post.excerpt,
    author: post.author_name,
    category_id: post.category_id,
    is_published: post.is_published,
    image_url: post.featured_image_url,
    created_at: post.created_at,
    updated_at: post.updated_at,
    category_name: post.category_name
  }));
  
  // Handle category click
  const handleCategoryClick = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
  };
  
  // Filter posts by category and search
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategoryId ? post.category_id === selectedCategoryId : true;
    const matchesSearch = searchQuery.trim() === '' ? true : 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog Management</h1>
        <Button onClick={() => navigate('/admin/blog/new')}>
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-6">
          <BlogHeader
            title=""
            description="Manage your blog posts"
            onSearch={setSearchQuery}
            showSearch={true}
            searchQuery={searchQuery}
            headingLevel="h2" // Add required prop
          />
          
          <BlogCategories
            categories={categories}
            isLoading={categoriesLoading}
            selectedCategoryId={selectedCategoryId}
            onCategoryClick={handleCategoryClick}
            showAllLink={true}
          />
          
          <BlogCategoryManager />
        </div>
        
        <div className="md:col-span-3">
          <BlogList
            posts={filteredPosts}
            isLoading={postsLoading}
            isAdmin={true}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;
