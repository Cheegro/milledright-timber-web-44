
import React, { useEffect, useState } from 'react';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogList from '@/components/blog/BlogList';
import BlogSidebar from '@/components/blog/BlogSidebar';
import { fetchBlogPosts, fetchBlogCategories, fetchCategoryPostCounts } from '@/api/blogApi';
import { Skeleton } from '@/components/ui/skeleton';

const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogData() {
      setLoading(true);
      
      // Fetch blog posts and categories in parallel
      const [postsData, categoriesData] = await Promise.all([
        fetchBlogPosts(),
        fetchBlogCategories()
      ]);
      
      setPosts(postsData);
      
      // Fetch category counts
      const categoryCounts = await fetchCategoryPostCounts();
      
      // Update categories with counts
      const categoriesWithCounts = categoriesData.map(category => ({
        ...category,
        count: categoryCounts[category.id] || 0
      }));
      
      setCategories(categoriesWithCounts);
      setLoading(false);
    }
    
    loadBlogData();
  }, []);

  return (
    <div className="min-h-screen">
      <BlogHeader />
      
      <div className="container-wide py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content - Blog posts */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="space-y-6">
                {Array(4).fill(0).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            ) : posts.length > 0 ? (
              <BlogList posts={posts} />
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl font-medium">No blog posts found</h3>
                <p className="text-muted-foreground mt-2">Check back later for new content!</p>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <BlogSidebar 
            recentPosts={posts.slice(0, 3)} 
            categories={categories} 
            isLoading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;
