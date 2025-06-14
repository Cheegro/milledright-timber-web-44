
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductForm from '@/components/admin/ProductForm';
import { fetchProductCategories, fetchProduct } from '@/api/adminProductApi';
import { toast } from '@/components/ui/use-toast';

const ProductFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  // Fetch categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['productCategories'],
    queryFn: fetchProductCategories,
  });

  // Fetch product if editing
  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id!),
    enabled: isEditing,
  });

  if (categoriesLoading || (isEditing && productLoading)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          {/* Using theme-aware colors for spinner */}
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

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
        <h1 className="text-2xl md:text-3xl font-bold text-foreground"> {/* Changed text-sawmill-dark-brown to text-foreground */}
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h1>
      </div>

      <div className="bg-card rounded-lg shadow-sm border p-6"> {/* Changed bg-white to bg-card */}
        <ProductForm
          categories={categories}
          product={product}
          isEditing={isEditing}
        />
      </div>
    </div>
  );
};

export default ProductFormPage;
