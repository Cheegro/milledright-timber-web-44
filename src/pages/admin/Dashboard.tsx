
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  // Fetch actual counts from database tables
  const { data: counts, isLoading: countsLoading } = useQuery({
    queryKey: ['dashboard-counts'],
    queryFn: async () => {
      // Fetch counts for all relevant tables
      const [productsResponse, blogPostsResponse, galleryImagesResponse, reviewsResponse] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
        supabase.from('gallery_images').select('id', { count: 'exact', head: true }),
        supabase.from('reviews').select('id', { count: 'exact', head: true }),
      ]);
      
      return {
        products: productsResponse.count || 0,
        blogPosts: blogPostsResponse.count || 0,
        galleryImages: galleryImagesResponse.count || 0,
        reviews: reviewsResponse.count || 0
      };
    }
  });

  // Fetch recent products for the dashboard
  const { data: recentProducts, isLoading: productsLoading } = useQuery({
    queryKey: ['recent-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, category_id, created_at, product_categories(name)')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      
      return data.map(product => ({
        id: product.id,
        name: product.name,
        category: product.product_categories?.name || 'Uncategorized',
        date: new Date(product.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      }));
    }
  });

  // Fetch recent blog posts for the dashboard
  const { data: recentPosts, isLoading: postsLoading } = useQuery({
    queryKey: ['recent-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, created_at')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      
      return data.map(post => ({
        id: post.id,
        title: post.title,
        date: new Date(post.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      }));
    }
  });

  // Create stats array with actual data
  const stats = [
    { title: "Products", value: countsLoading ? "..." : counts?.products.toString(), link: "/admin/products" },
    { title: "Blog Posts", value: countsLoading ? "..." : counts?.blogPosts.toString(), link: "/admin/blog" },
    { title: "Gallery Images", value: countsLoading ? "..." : counts?.galleryImages.toString(), link: "/admin/gallery" },
    { title: "Reviews", value: countsLoading ? "..." : counts?.reviews.toString(), link: "/admin/reviews" },
  ];

  const isLoading = countsLoading || productsLoading || postsLoading;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-sawmill-dark-brown">Dashboard</h1>
        <Button className="bg-sawmill-orange hover:bg-sawmill-auburn">
          <Link to="/admin/settings" className="w-full h-full inline-block">Settings</Link>
        </Button>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-sawmill-dark-brown">
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin text-sawmill-medium-brown" />
                  ) : (
                    stat.value
                  )}
                </div>
                <Link 
                  to={stat.link}
                  className="text-sawmill-orange hover:text-sawmill-auburn text-sm font-medium"
                >
                  View All
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Recent Products</CardTitle>
              <Link to="/admin/products/new">
                <Button variant="outline" size="sm">
                  Add New
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {productsLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-8 w-8 animate-spin text-sawmill-medium-brown" />
              </div>
            ) : recentProducts && recentProducts.length > 0 ? (
              <div className="space-y-4">
                {recentProducts.map(product => (
                  <div key={product.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium text-sawmill-dark-brown">{product.name}</p>
                      <p className="text-sm text-muted-foreground">Category: {product.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{product.date}</span>
                      <Link 
                        to={`/admin/products/${product.id}/edit`}
                        className="text-sawmill-orange hover:text-sawmill-auburn text-sm"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">No products found</p>
              </div>
            )}
            
            <div className="mt-4 text-center">
              <Link 
                to="/admin/products"
                className="text-sawmill-orange hover:text-sawmill-auburn text-sm font-medium"
              >
                View All Products
              </Link>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Blog Posts */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Recent Blog Posts</CardTitle>
              <Link to="/admin/blog/new">
                <Button variant="outline" size="sm">
                  Add New
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {postsLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-8 w-8 animate-spin text-sawmill-medium-brown" />
              </div>
            ) : recentPosts && recentPosts.length > 0 ? (
              <div className="space-y-4">
                {recentPosts.map(post => (
                  <div key={post.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium text-sawmill-dark-brown">{post.title}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                      <Link 
                        to={`/admin/blog/${post.id}/edit`}
                        className="text-sawmill-orange hover:text-sawmill-auburn text-sm"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">No blog posts found</p>
              </div>
            )}
            
            <div className="mt-4 text-center">
              <Link 
                to="/admin/blog"
                className="text-sawmill-orange hover:text-sawmill-auburn text-sm font-medium"
              >
                View All Blog Posts
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/admin/products/new" className="w-full">
                <Button className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown h-auto py-6 w-full flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m7.5 4.27 9 5.15" />
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                    <path d="m3.3 7 8.7 5 8.7-5" />
                    <path d="M12 22V12" />
                  </svg>
                  Add New Product
                </Button>
              </Link>
              
              <Link to="/admin/blog/new" className="w-full">
                <Button className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown h-auto py-6 w-full flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                    <circle cx="12" cy="12" r="1" />
                    <path d="M12 7v10" />
                    <path d="M7 12h10" />
                  </svg>
                  Add New Blog Post
                </Button>
              </Link>
              
              <Link to="/admin/gallery/new" className="w-full">
                <Button className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown h-auto py-6 w-full flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 3h.01" />
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                  Add New Image
                </Button>
              </Link>
              
              <Link to="/admin/reviews/new" className="w-full">
                <Button className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown h-auto py-6 w-full flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l2.5 5.3 5.5.8-4 3.9.9 5.4-4.9-2.6L7 17.4l.9-5.4-4-3.9 5.5-.8z" />
                    <circle cx="12" cy="12" r="1" />
                    <path d="M12 7v10" />
                    <path d="M7 12h10" />
                  </svg>
                  Add New Review
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
