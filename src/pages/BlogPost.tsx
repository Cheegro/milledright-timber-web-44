
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchBlogPost, fetchRelatedBlogPosts } from '@/api/blogApi';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadPost() {
      if (!id) return;

      setLoading(true);
      const postData = await fetchBlogPost(id);
      
      if (!postData) {
        navigate('/blog');
        return;
      }
      
      setPost(postData);
      
      // Fetch related posts if we have a category
      if (postData.category_id) {
        const related = await fetchRelatedBlogPosts(id, postData.category_id);
        setRelatedPosts(related);
      }
      
      setLoading(false);
      
      // Scroll to top when post loads
      window.scrollTo(0, 0);
    }
    
    loadPost();
  }, [id, navigate]);
  
  // Format date for display
  const formatPostDate = (dateString?: string) => {
    if (!dateString) return '';
    return format(new Date(dateString), 'MMMM d, yyyy');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen">
        {/* Loading skeleton for hero section */}
        <div className="relative h-[40vh] md:h-[50vh] bg-gray-200">
          <Skeleton className="w-full h-full" />
        </div>
        
        <div className="container-wide py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-12 w-full" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
            
            {/* Sidebar Skeleton */}
            <div className="space-y-8">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="container-wide py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
        <Button asChild>
          <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Link>
        </Button>
      </div>
    );
  }
  
  // Define tags from the post content if needed
  const tags = post.tags || ['sawmill', 'lumber', 'woodworking'];
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] bg-gray-900">
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.image_url})` }}
        ></div>
        <div className="container-wide relative z-10 h-full flex items-end pb-8">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-sawmill-orange">{post.category}</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 text-shadow">
              {post.title}
            </h1>
            <div className="flex items-center text-white">
              <span>{formatPostDate(post.published_at)}</span>
              <span className="mx-2">•</span>
              <span>By {post.author}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container-wide py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Back to Blog Link */}
            <Button variant="ghost" className="mb-6" asChild>
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
            
            {/* Article Content */}
            <article className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
            
            {/* Tags */}
            <div className="mt-8">
              <h3 className="font-medium mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="bg-gray-100">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <aside>
            {/* Author */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="font-bold text-lg mb-2">About the Author</h3>
              <p className="text-muted-foreground">
                {post.author} is an experienced woodworker and lumber specialist with over 15 years in the industry.
              </p>
            </div>
            
            {/* Related Posts */}
            <div>
              <h3 className="font-bold text-lg mb-4">Related Articles</h3>
              {relatedPosts.length > 0 ? (
                <div className="space-y-6">
                  {relatedPosts.map(related => (
                    <Card key={related.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <Link to={`/blog/${related.id}`}>
                        <div className="h-36 overflow-hidden">
                          <img 
                            src={related.image_url} 
                            alt={related.title} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-medium hover:text-sawmill-dark-brown transition-colors">
                            {related.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {formatPostDate(related.published_at)}
                          </p>
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No related articles found.</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
