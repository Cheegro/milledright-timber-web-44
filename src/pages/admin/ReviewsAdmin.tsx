
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { fetchReviews } from '@/api/adminReviewApi';
import ReviewHeader from '@/components/admin/reviews/ReviewHeader';
import ReviewFilters from '@/components/admin/reviews/ReviewFilters';
import ReviewList from '@/components/admin/reviews/ReviewList';

const ReviewsAdmin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Fetch reviews data
  const { data: reviews = [], isLoading, isError } = useQuery({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
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
      <ReviewHeader />
      <ReviewFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <ReviewList reviews={filteredReviews} />
    </div>
  );
};

export default ReviewsAdmin;
