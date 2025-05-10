
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

// Mock data for blog posts
const mockPosts = [
  { 
    id: 1, 
    title: '10 Tips for Maintaining Your Bandsaw Blades', 
    author: 'John Smith',
    status: 'Published',
    date: 'May 5, 2025',
    comments: 12
  },
  { 
    id: 2, 
    title: 'Portable vs. Stationary Sawmills: Which Is Right For You?', 
    author: 'Emily Johnson',
    status: 'Published',
    date: 'April 28, 2025',
    comments: 8
  },
  { 
    id: 3, 
    title: 'Customer Spotlight: Building a Successful Business with MilledRight', 
    author: 'Michael Brown',
    status: 'Published',
    date: 'April 15, 2025',
    comments: 5
  },
  { 
    id: 4, 
    title: 'Understanding Wood Species for Your Milling Projects', 
    author: 'Sarah Thompson',
    status: 'Published',
    date: 'April 10, 2025',
    comments: 3
  },
  { 
    id: 5, 
    title: 'Maximizing Efficiency: Sawmill Setup Tips', 
    author: 'John Smith',
    status: 'Draft',
    date: 'April 5, 2025',
    comments: 0
  },
  { 
    id: 6, 
    title: 'How to Choose the Right Sawmill for Your Small Business', 
    author: 'David Wilson',
    status: 'Draft',
    date: 'March 29, 2025',
    comments: 0
  },
  { 
    id: 7, 
    title: '5 Creative Projects Using Your Milled Lumber', 
    author: 'Emily Johnson',
    status: 'Published',
    date: 'March 22, 2025',
    comments: 15
  },
  { 
    id: 8, 
    title: 'The Environmental Benefits of Portable Sawmills', 
    author: 'Michael Brown',
    status: 'Published',
    date: 'March 15, 2025',
    comments: 9
  },
];

const BlogAdmin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Filter blog posts based on search query and status
  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-sawmill-dark-brown">Blog Posts</h1>
        <Button className="bg-sawmill-orange hover:bg-sawmill-auburn">
          <Link to="/admin/blog/new">Add New Post</Link>
        </Button>
      </div>
      
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
              <TableHead>Comments</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.map(post => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.id}</TableCell>
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
                <TableCell>{post.date}</TableCell>
                <TableCell>{post.comments}</TableCell>
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
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
                          // Handle delete operation here
                          console.log(`Delete post ${post.id}`);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BlogAdmin;
