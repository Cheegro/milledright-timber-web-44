import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { blogPosts } from '@/data/blogData';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  
  useEffect(() => {
    // Find the current post
    const currentPost = blogPosts.find(post => post.id === Number(id));
    setPost(currentPost);
    
    // Find related posts (same category, excluding current post)
    if (currentPost) {
      const related = blogPosts
        .filter(p => p.category === currentPost.category && p.id !== currentPost.id)
        .slice(0, 2);
      setRelatedPosts(related);
    }
  }, [id]);
  
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
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] bg-gray-900">
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.imageUrl})` }}
        ></div>
        <div className="container-wide relative z-10 h-full flex items-end pb-8">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-sawmill-orange">{post.category}</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 text-shadow">
              {post.title}
            </h1>
            <div className="flex items-center text-white">
              <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
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
                {post.tags.map((tag: string) => (
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
              <div className="space-y-6">
                {relatedPosts.map(related => (
                  <Card key={related.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <Link to={`/blog/${related.id}`}>
                      <div className="h-36 overflow-hidden">
                        <img 
                          src={related.imageUrl} 
                          alt={related.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-medium hover:text-sawmill-dark-brown transition-colors">
                          {related.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {format(new Date(related.date), 'MMMM d, yyyy')}
                        </p>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
