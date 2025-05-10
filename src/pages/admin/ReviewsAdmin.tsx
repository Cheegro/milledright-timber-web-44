
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

// Mock data for testimonials
const mockReviews = [
  { 
    id: 1, 
    author: "John D.",
    location: "Oregon",
    rating: 5,
    text: "MilledRight's LT40 completely transformed my small lumber business. The precision cuts and ease of use have saved me countless hours of work.",
    status: "Published",
    date: "May 8, 2025",
    product: "LT40 Portable Sawmill"
  },
  { 
    id: 2, 
    author: "Michael T.",
    location: "Michigan",
    rating: 5,
    text: "As a hobbyist, I was hesitant about the investment, but the LT20 has paid for itself within months through projects and custom cutting jobs for neighbors.",
    status: "Published",
    date: "May 5, 2025",
    product: "LT20 Portable Sawmill"
  },
  { 
    id: 3, 
    author: "Sarah L.",
    location: "North Carolina",
    rating: 4,
    text: "The customer service at MilledRight is unmatched. When I had questions about my new mill, they walked me through everything step by step.",
    status: "Published",
    date: "April 28, 2025",
    product: "LT40 Portable Sawmill"
  },
  { 
    id: 4, 
    author: "Robert K.",
    location: "Washington",
    rating: 5,
    text: "I've been using MilledRight blades for over three years, and they consistently outperform the competition. Worth every penny.",
    status: "Published",
    date: "April 25, 2025",
    product: "Industrial Bandsaw Blades"
  },
  { 
    id: 5, 
    author: "Amanda P.",
    location: "Colorado",
    rating: 3,
    text: "The mill works great, but I had some challenges with the initial setup. Once I got it figured out, it's been a solid performer.",
    status: "Pending",
    date: "April 22, 2025",
    product: "LT20 Portable Sawmill"
  },
  { 
    id: 6, 
    author: "David W.",
    location: "Texas",
    rating: 5,
    text: "I compared several models before choosing MilledRight, and I couldn't be happier. The build quality is exceptional.",
    status: "Published",
    date: "April 20, 2025",
    product: "HD50 Industrial Mill"
  },
  { 
    id: 7, 
    author: "Elizabeth M.",
    location: "Georgia",
    rating: 4,
    text: "The log loading attachment has been a game changer for my operation. My only suggestion would be to make the controls a bit more intuitive.",
    status: "Published",
    date: "April 15, 2025",
    product: "Log Loading Attachment"
  },
  { 
    id: 8, 
    author: "James H.",
    location: "Montana",
    rating: 2,
    text: "Had some issues with the motor after a few months of use. Customer service was helpful but it took longer than expected to resolve.",
    status: "Pending",
    date: "April 10, 2025",
    product: "LT20 Portable Sawmill"
  },
];

const ReviewsAdmin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Filter reviews based on search query and status
  const filteredReviews = mockReviews.filter(review => {
    const matchesSearch = 
      review.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.product.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || review.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Render stars for ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i}
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
            viewBox="0 0 24 24" 
            fill="currentColor"
            stroke="none"
          >
            <path d="M12 2l2.5 5.3 5.5.8-4 3.9.9 5.4-4.9-2.6L7 17.4l.9-5.4-4-3.9 5.5-.8z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-sawmill-dark-brown">Reviews</h1>
        <Button className="bg-sawmill-orange hover:bg-sawmill-auburn">
          <Link to="/admin/reviews/new">Add New Review</Link>
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex-1">
          <Input
            placeholder="Search reviews..."
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
            variant={statusFilter === 'Pending' ? "default" : "outline"}
            onClick={() => setStatusFilter('Pending')}
            className={statusFilter === 'Pending' ? "bg-sawmill-dark-brown hover:bg-sawmill-medium-brown" : ""}
          >
            Pending
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableCaption>A list of customer reviews.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Review</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReviews.map(review => (
              <TableRow key={review.id}>
                <TableCell className="font-medium">{review.id}</TableCell>
                <TableCell>
                  {review.author}
                  <div className="text-xs text-muted-foreground">{review.location}</div>
                </TableCell>
                <TableCell>{review.product}</TableCell>
                <TableCell>{renderStars(review.rating)}</TableCell>
                <TableCell className="max-w-xs">
                  <p className="truncate">{review.text}</p>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    review.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {review.status}
                  </span>
                </TableCell>
                <TableCell>{review.date}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link 
                      to={`/admin/reviews/${review.id}/edit`}
                      className="text-sawmill-orange hover:underline text-sm"
                    >
                      Edit
                    </Link>
                    <button 
                      className="text-red-500 hover:underline text-sm"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this review?")) {
                          // Handle delete operation here
                          console.log(`Delete review ${review.id}`);
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

export default ReviewsAdmin;
