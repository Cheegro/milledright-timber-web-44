
import BulkGalleryUpload from '@/components/admin/BulkGalleryUpload';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const BulkGalleryUploadPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/gallery">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-sawmill-dark-brown">
          Bulk Upload Images
        </h1>
      </div>
      
      <BulkGalleryUpload />
    </div>
  );
};

export default BulkGalleryUploadPage;
