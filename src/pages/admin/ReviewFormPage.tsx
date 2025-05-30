
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReviewForm from '@/components/admin/ReviewForm';

const ReviewFormPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate('/admin/reviews')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Reviews
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold text-sawmill-dark-brown">
          Add New Review
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <ReviewForm />
      </div>
    </div>
  );
};

export default ReviewFormPage;
