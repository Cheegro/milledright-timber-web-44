
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAllBlogPosts, deleteBlogPost } from '@/api/adminBlogApi';
import BlogCategoryManager from '@/components/blog/BlogCategoryManager';

const BlogAdmin = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");
  
  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      const postsData = await fetchAllBlogPosts();
      setPosts(postsData);
      setLoading(false);
    }
    
    loadPosts();
  }, []);
  
  // Filter blog posts based on search query and status
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Handle post deletion
  const handleDeletePost = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const success = await deleteBlogPost(id);
      if (success) {
        // Update the local state to remove the deleted post
        setPosts(posts.filter(post => post.id !== id));
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-sawmill-dark-brown">Blog Management</h1>
        <Button className="bg-sawmill-orange hover:bg-sawmill-auburn">
          <Link to="/admin/blog/new">Add New Post</Link>
        </Button>
      </div>
      
      <Tabs defaultValue="posts" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="posts">Blog Posts</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="flex-1">
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'All' ? "default" : "outline"}
                onClick={() => setStatusFilter('All')}
                className={statusFilter === 'All' ? "bg-sawmill-dark-brown hover:bg-sawmill-medium-brown" : ""}
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'Published' ? "default" : "outline"}
                onClick={() => setStatusFilter('Published')}
                className={statusFilter === 'Published' ? "bg-sawmill-dark-brown hover:bg-sawmill-medium-brown" : ""}
              >
                Published
              </Button>
              <Button
                variant={statusFilter === 'Draft' ? "default" : "outline"}
                onClick={() => setStatusFilter('Draft')}
                className={statusFilter === 'Draft' ? "bg-sawmill-dark-brown hover:bg-sawmill-medium-brown" : ""}
              >
                Draft
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableCaption>A list of your blog posts.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  // Loading skeletons
                  Array(5).fill(0).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredPosts.length > 0 ? (
                  filteredPosts.map(post => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.id.substring(0, 8)}...</TableCell>
                      <TableCell>
                        <Link 
                          to={`/admin/blog/${post.id}/edit`}
                          className="text-sawmill-dark-brown hover:underline font-medium"
                        >
                          {post.title}
                        </Link>
                      </TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          post.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(post.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>{post.category}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link 
                            to={`/admin/blog/${post.id}/edit`}
                            className="text-sawmill-orange hover:underline text-sm"
                          >
                            Edit
                          </Link>
                          <button 
                            className="text-red-500 hover:underline text-sm"
                            onClick={() => handleDeletePost(post.id, post.title)}
                          >
                            Delete
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No blog posts found. {searchQuery || statusFilter !== 'All' ? 'Try adjusting your filters.' : ''}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="categories">
          <BlogCategoryManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlogAdmin;
