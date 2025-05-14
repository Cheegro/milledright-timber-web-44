
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchRecentBlogPosts } from '@/api/blogApi';

const BlogPostsSection = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadRecentPosts() {
      const recentPosts = await fetchRecentBlogPosts(3);
      setPosts(recentPosts);
      setLoading(false);
    }
    
    loadRecentPosts();
  }, []);
  
  // Format the date in a nice readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <section className="py-16">
      <div className="container-wide">
        <h2 className="section-title text-center mx-auto">Latest From Our Blog</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {loading ? (
            // Loading skeletons
            Array(3).fill(0).map((_, i) => (
              <Card key={i}>
                <Skeleton className="aspect-video w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-20" />
                </CardContent>
              </Card>
            ))
          ) : posts.length > 0 ? (
            posts.map(post => (
              <Card key={post.id}>
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={post.image_url} 
                    alt={post.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="text-sawmill-orange text-sm mb-2">
                    {post.published_at ? formatDate(post.published_at) : "No date"}
                  </div>
                  <h3 className="text-xl font-bold text-sawmill-dark-brown">{post.title}</h3>
                  <p className="text-sawmill-dark-gray mt-2 mb-4">{post.excerpt}</p>
                  <Link 
                    to={`/blog/${post.id}`}
                    className="text-sawmill-orange hover:underline font-medium"
                  >
                    Read More
                  </Link>
                </CardContent>
              </Card>
            ))
          ) : (
            // Fallback to static content if no posts are available
            <>
              <Card>
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src="https://lh3.googleusercontent.com/pw/AP1GczMvU1jPjRuTD7NTL26kN32qe3xBVIe9TFH12AhmjREiYsWiWrKArbnxaIv-2OCojyczJbFsjBAJ9DDAKguoih5sYfzfZLUWiHcjm1CABI8YBg3y=w2400" 
                    alt="Bandsaw maintenance blog post"
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="text-sawmill-orange text-sm mb-2">May 5, 2025</div>
                  <h3 className="text-xl font-bold text-sawmill-dark-brown">10 Tips for Maintaining Your Bandsaw Blades</h3>
                  <p className="text-sawmill-dark-gray mt-2 mb-4">Learn how to extend the life of your bandsaw blades and improve cutting performance...</p>
                  <Link to="/blog" className="text-sawmill-orange hover:underline font-medium">Read More</Link>
                </CardContent>
              </Card>
              
              <Card>
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src="https://lh3.googleusercontent.com/pw/AP1GczMF-UwqDS0mzQhvKlZMMUqQjKwTeLsMs_9Y8SwdIC6a9h2vDZKec37odDn28R83IKXkMt7gvRsUIDIF0q6QJIrum2GSCsSeGQQjbUZVMcRypTv_=w2400" 
                    alt="Portable sawmill blog post"
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="text-sawmill-orange text-sm mb-2">April 28, 2025</div>
                  <h3 className="text-xl font-bold text-sawmill-dark-brown">Portable vs. Stationary Sawmills: Which Is Right For You?</h3>
                  <p className="text-sawmill-dark-gray mt-2 mb-4">We compare the benefits and limitations of portable and stationary sawmill options...</p>
                  <Link to="/blog" className="text-sawmill-orange hover:underline font-medium">Read More</Link>
                </CardContent>
              </Card>
              
              <Card>
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src="https://lh3.googleusercontent.com/pw/AP1GczNLvUgvZSbzRZXdpVowZi-2wptldWSWZDBtrwDaMks0T3B9H4fTcrMJut7RJUo93xFIJU9djlLDXQOa7XoW3VzbwFNE33MTSmrPXa-9vB_enYD6=w2400" 
                    alt="Customer spotlight blog post"
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="text-sawmill-orange text-sm mb-2">April 15, 2025</div>
                  <h3 className="text-xl font-bold text-sawmill-dark-brown">Customer Spotlight: Building a Successful Business with MilledRight</h3>
                  <p className="text-sawmill-dark-gray mt-2 mb-4">Meet John Davis, who turned his passion for woodworking into a thriving business...</p>
                  <Link to="/blog" className="text-sawmill-orange hover:underline font-medium">Read More</Link>
                </CardContent>
              </Card>
            </>
          )}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown text-white">
            <Link to="/blog">Visit Our Blog</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPostsSection;
