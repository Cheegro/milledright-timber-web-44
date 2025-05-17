
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { fetchReviews } from '@/api/adminReviewApi';
import ReviewHeader from '@/components/admin/reviews/ReviewHeader';
import ReviewFilters from '@/components/admin/reviews/ReviewFilters';
import ReviewList from '@/components/admin/reviews/ReviewList';
import { DateRange } from 'react-day-picker';

const ReviewsAdmin = () => {
  // State for filters and pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);
  
  // Fetch reviews data
  const { data: reviews = [], isLoading, isError } = useQuery({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
  });

  // Filter reviews based on search query, status, date range and rating
  const filteredReviews = reviews.filter(review => {
    // Search filter
    const matchesSearch = 
      review.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (review.products?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
      
    // Status filter
    const matchesStatus = statusFilter === 'All' || review.status === statusFilter;
    
    // Date range filter
    const reviewDate = new Date(review.date);
    const matchesDateFrom = dateRange?.from ? reviewDate >= dateRange.from : true;
    const matchesDateTo = dateRange?.to ? reviewDate <= dateRange.to : true;
    
    // Rating filter
    const matchesRating = ratingFilter ? review.rating >= ratingFilter : true;
    
    return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo && matchesRating;
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
      <ReviewHeader 
        selectedReviews={selectedReviews}
        setSelectedReviews={setSelectedReviews}
      />
      
      <ReviewFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
      />
      
      <ReviewList 
        reviews={filteredReviews}
        selectedReviews={selectedReviews}
        setSelectedReviews={setSelectedReviews}
      />
    </div>
  );
};

export default ReviewsAdmin;
