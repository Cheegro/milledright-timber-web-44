
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Star } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';

// Type for reviews with optional product relationship
interface Review {
  id: string;
  author: string;
  location: string | null;
  text: string;
  rating: number;
  product_id: string | null;
  date: string;
  products?: { name: string } | null;
}

// Function to fetch published reviews
async function fetchPublishedReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      products (name)
    `)
    .eq('status', 'Published')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching published reviews:', error);
    throw new Error(error.message);
  }

  return data;
}

const Reviews = () => {
  const { data: reviews, isLoading, error } = useQuery({
    queryKey: ['publishedReviews'],
    queryFn: fetchPublishedReviews
  });

  if (isLoading) {
    return (
      <div className="py-16 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-sawmill-dark-brown" />
      </div>
    );
  }

  if (error || !reviews) {
    return (
      <div className="container-wide py-16">
        <h1 className="text-3xl font-bold mb-8 text-center">Customer Reviews</h1>
        <p className="text-center text-red-500">
          There was an error loading the reviews. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-sawmill-dark-brown py-8">
        <div className="container-wide">
          <h1 className="text-3xl font-bold text-white">Customer Reviews</h1>
        </div>
      </div>

      <div className="container-wide py-12">
        {reviews.length === 0 ? (
          <p className="text-center py-8">No reviews available yet. Be the first to leave a review!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}
                      size={18}
                    />
                  ))}
                </div>
                <p className="italic text-sawmill-dark-gray mb-4">"{review.text}"</p>
                <div>
                  <p className="font-bold text-sawmill-dark-brown">{review.author}</p>
                  {review.location && (
                    <p className="text-sawmill-medium-brown">{review.location}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-2">
                    {format(new Date(review.date), 'MMMM dd, yyyy')}
                  </p>
                  {review.products && (
                    <p className="text-sm text-sawmill-orange mt-1">
                      Product: {review.products.name}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
