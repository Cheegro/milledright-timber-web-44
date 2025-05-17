
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReview } from '@/api/adminReviewApi';
import { Loader2, Trash } from 'lucide-react';

interface ReviewHeaderProps {
  selectedReviews: string[];
  setSelectedReviews: (ids: string[]) => void;
}

const ReviewHeader = ({ selectedReviews, setSelectedReviews }: ReviewHeaderProps) => {
  const queryClient = useQueryClient();
  
  // Delete multiple reviews mutation
  const batchDeleteMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      await Promise.all(ids.map(id => deleteReview(id)));
      return ids;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast({
        title: "Success",
        description: `${selectedReviews.length} reviews deleted successfully.`,
      });
      setSelectedReviews([]);
    },
    onError: (error) => {
      console.error("Error deleting reviews:", error);
      toast({
        title: "Error",
        description: "Failed to delete reviews. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleBatchDelete = () => {
    if (selectedReviews.length === 0) return;
    
    if (confirm(`Are you sure you want to delete ${selectedReviews.length} reviews?`)) {
      batchDeleteMutation.mutate(selectedReviews);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-sawmill-dark-brown">Reviews</h1>
        {selectedReviews.length > 0 && (
          <span className="bg-sawmill-dark-brown text-white px-2 py-1 rounded-full text-sm">
            {selectedReviews.length} selected
          </span>
        )}
      </div>
      
      <div className="flex gap-2">
        {selectedReviews.length > 0 && (
          <Button 
            variant="destructive"
            onClick={handleBatchDelete}
            disabled={batchDeleteMutation.isPending}
            className="gap-1"
          >
            {batchDeleteMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            <Trash className="h-4 w-4" />
            Delete {selectedReviews.length}
          </Button>
        )}
        
        <Button className="bg-sawmill-orange hover:bg-sawmill-auburn">
          <Link to="/admin/reviews/new">Add New Review</Link>
        </Button>
      </div>
    </div>
  );
};

export default ReviewHeader;
