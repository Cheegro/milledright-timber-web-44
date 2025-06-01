
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import BulkProductUpload from '@/components/admin/BulkProductUpload';

const BulkProductUploadPage = () => {
  const navigate = useNavigate();

  const handleUploadComplete = () => {
    navigate('/admin/products');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate('/admin/products')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold text-sawmill-dark-brown">
          Bulk Upload Products
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <BulkProductUpload onComplete={handleUploadComplete} />
      </div>
    </div>
  );
};

export default BulkProductUploadPage;
