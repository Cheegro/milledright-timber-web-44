
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const ReviewHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <h1 className="text-2xl md:text-3xl font-bold text-sawmill-dark-brown">Reviews</h1>
      <Button className="bg-sawmill-orange hover:bg-sawmill-auburn">
        <Link to="/admin/reviews/new">Add New Review</Link>
      </Button>
    </div>
  );
};

export default ReviewHeader;
