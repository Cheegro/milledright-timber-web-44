
import { createProduct } from '@/api/adminProductApi';
import { uploadAndOptimizeImage } from '@/services/imageOptimizationService';
import { toast } from '@/components/ui/use-toast';

export interface BulkProductData {
  name: string;
  price: string;
  description: string;
  woodType: string;
  category_id?: string;
}

export async function createProductWithOptimizedImage(
  productData: BulkProductData,
  imageFile: File,
  categoryId?: string
) {
  try {
    // Create the product first
    const product = await createProduct({
      name: productData.name,
      category_id: categoryId || null,
      price: productData.price,
      description: productData.description,
      image_url: null, // Will be updated after optimization
    });

    // Upload and optimize the image
    await uploadAndOptimizeImage(imageFile, 'products', product.id);
    
    return product;
  } catch (error) {
    console.error('Error creating product with optimized image:', error);
    throw error;
  }
}

export async function bulkUploadProducts(
  productsData: BulkProductData[],
  imageFiles: File[],
  categoryId?: string
) {
  const results = [];
  const errors = [];

  for (let i = 0; i < productsData.length && i < imageFiles.length; i++) {
    try {
      const product = await createProductWithOptimizedImage(
        productsData[i],
        imageFiles[i],
        categoryId
      );
      results.push(product);
      
      toast({
        title: 'Product Created',
        description: `${productsData[i].name} has been added with optimized images`,
      });
    } catch (error) {
      console.error(`Error creating product ${productsData[i].name}:`, error);
      errors.push({ product: productsData[i].name, error });
      
      toast({
        title: 'Error',
        description: `Failed to create ${productsData[i].name}`,
        variant: 'destructive',
      });
    }
  }

  return { results, errors };
}
