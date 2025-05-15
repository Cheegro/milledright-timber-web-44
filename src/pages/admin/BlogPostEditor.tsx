
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogPostForm from '@/components/blog/BlogPostForm';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';

const BlogPostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(id ? true : false);
  const isEditing = Boolean(id);
  
  useEffect(() => {
    async function fetchPost() {
      if (!id) return;
      
      setLoading(true);
      try {
        // For now we'll use the same fetch method as in the blog post
        const { supabase } = await import('@/integrations/supabase/client');
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          throw error;
        }
        
        setPost(data);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        toast({
          title: 'Error',
          description: 'Could not load blog post',
          variant: 'destructive',
        });
        navigate('/admin/blog');
      } finally {
        setLoading(false);
      }
    }
    
    if (isEditing) {
      fetchPost();
    }
  }, [id, isEditing, navigate]);
  
  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-1/4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-sawmill-dark-brown">
        {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
      </h1>
      
      <BlogPostForm initialData={post} isEditing={isEditing} />
    </div>
  );
};

export default BlogPostEditor;
