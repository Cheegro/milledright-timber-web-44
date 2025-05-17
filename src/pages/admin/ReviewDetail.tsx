
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { fetchReview } from '@/api/adminReviewApi';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from 'date-fns';

const ReviewDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: review, isLoading, isError } = useQuery({
    queryKey: ['review', id],
    queryFn: () => fetchReview(id!),
    enabled: !!id,
  });
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-sawmill-dark-brown" />
      </div>
    );
  }
  
  if (isError || !review) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md">
        Error loading review. The review may have been deleted or does not exist.
        <div className="mt-4">
          <Button onClick={() => navigate('/admin/reviews')}>
            Back to Reviews
          </Button>
        </div>
      </div>
    );
  }
  
  // Render stars for ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i}
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-6 w-6 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-sawmill-dark-brown">Review Details</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/admin/reviews')}>
            Back to Reviews
          </Button>
          <Button 
            className="bg-sawmill-orange hover:bg-sawmill-auburn"
            onClick={() => navigate(`/admin/reviews/${id}/edit`)}
          >
            Edit Review
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>Review by {review.author}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                review.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {review.status}
              </span>
            </div>
            <div>
              {renderStars(review.rating)}
            </div>
          </CardTitle>
          <CardDescription>
            {review.location && <span>From: {review.location} • </span>}
            Posted: {format(new Date(review.date), 'MMMM dd, yyyy')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose max-w-none">
            <p className="text-lg whitespace-pre-wrap">{review.text}</p>
          </div>
          
          {review.product_id && review.products?.name && (
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Related Product</h4>
              <Link 
                to={`/admin/products/${review.product_id}`}
                className="text-sawmill-orange hover:underline"
              >
                {review.products.name}
              </Link>
            </div>
          )}
          
          <div className="pt-4 border-t text-sm text-gray-500">
            <p>Review ID: {review.id}</p>
            <p>Created: {format(new Date(review.created_at), 'MMM dd, yyyy HH:mm:ss')}</p>
            <p>Last updated: {format(new Date(review.updated_at), 'MMM dd, yyyy HH:mm:ss')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewDetail;
