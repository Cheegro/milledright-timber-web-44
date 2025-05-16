
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Loader2 } from 'lucide-react';
import { fetchReviews, deleteReview } from '@/api/adminReviewApi';

const ReviewsAdmin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const queryClient = useQueryClient();
  
  // Fetch reviews data
  const { data: reviews = [], isLoading, isError } = useQuery({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
  });

  // Delete review mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast({
        title: "Success",
        description: "Review deleted successfully.",
      });
    },
    onError: (error) => {
      console.error("Error deleting review:", error);
      toast({
        title: "Error",
        description: "Failed to delete review. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  // Filter reviews based on search query and status
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (review.products?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
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

  // Handle review deletion
  const handleDeleteReview = (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-sawmill-dark-brown" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md">
        Error loading reviews. Please try again later.
      </div>
    );
  }

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
            {filteredReviews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No reviews found.
                </TableCell>
              </TableRow>
            ) : (
              filteredReviews.map(review => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.id.slice(-6)}</TableCell>
                  <TableCell>
                    {review.author}
                    {review.location && (
                      <div className="text-xs text-muted-foreground">{review.location}</div>
                    )}
                  </TableCell>
                  <TableCell>
                    {review.products?.name || "No product"}
                  </TableCell>
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
                  <TableCell>{new Date(review.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}</TableCell>
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
                        onClick={() => handleDeleteReview(review.id)}
                        disabled={deleteMutation.isPending}
                      >
                        {deleteMutation.isPending && deleteMutation.variables === review.id ? (
                          <Loader2 className="h-3 w-3 animate-spin inline mr-1" />
                        ) : null}
                        Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ReviewsAdmin;
