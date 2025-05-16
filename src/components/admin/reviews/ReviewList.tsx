
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from 'lucide-react';
import { Review, deleteReview } from '@/api/adminReviewApi';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList = ({ reviews }: ReviewListProps) => {
  const queryClient = useQueryClient();

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

  // Handle review deletion
  const handleDeleteReview = (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      deleteMutation.mutate(id);
    }
  };

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
          {reviews.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                No reviews found.
              </TableCell>
            </TableRow>
          ) : (
            reviews.map(review => (
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
  );
};

export default ReviewList;
