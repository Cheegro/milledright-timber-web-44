
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Upload } from 'lucide-react';
import { createProduct, updateProduct, uploadProductImage } from '@/api/adminProductApi';

// Form validation schema - removed price_unit as it doesn't exist in DB
const productFormSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  category_id: z.string().optional(),
  price: z.string().min(1, 'Price is required'),
  description: z.string().optional(),
  image_url: z.string().optional(),
});

export interface ProductFormProps {
  categories: { id: string; name: string }[];
  product?: any;
  isEditing?: boolean;
}

const ProductForm = ({ categories, product, isEditing = false }: ProductFormProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    product?.image_url || null
  );

  // Initialize form with existing product data or defaults
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name || '',
      category_id: product?.category_id || '',
      price: product?.price || '',
      description: product?.description || '',
      image_url: product?.image_url || '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create a preview URL for the selected image
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return null;
    
    try {
      setIsUploading(true);
      const imageUrl = await uploadProductImage(selectedFile);
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload image. Please try again.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof productFormSchema>) => {
    try {
      setIsLoading(true);
      
      // Upload image if a new one was selected
      let imageUrl = data.image_url;
      if (selectedFile) {
        imageUrl = await handleImageUpload();
        if (!imageUrl) return; // Stop if image upload failed
      }
      
      const productData = {
        name: data.name,
        category_id: data.category_id || null,
        price: data.price,
        description: data.description || null,
        image_url: imageUrl || null,
      };
      
      if (isEditing && product) {
        await updateProduct(product.id, productData);
        toast({
          title: 'Success',
          description: 'Product updated successfully',
        });
      } else {
        await createProduct(productData);
        toast({
          title: 'Success',
          description: 'Product created successfully',
        });
      }
      
      navigate('/admin/products');
    } catch (error: any) {
      console.error('Error saving product:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save product. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Product Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. $99.99/board ft" {...field} />
                  </FormControl>
                  <FormDescription>
                    Include the unit in the price (e.g. $99.99/board ft, $25.00 each)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Product description"
                      {...field}
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="product-image"
                        />
                        <label
                          htmlFor="product-image"
                          className="cursor-pointer block"
                        >
                          <Upload className="h-10 w-10 mx-auto text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">
                            {isEditing ? 'Click to change product image' : 'Click to upload product image'}
                          </p>
                          <p className="text-xs text-gray-400">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </label>
                      </div>

                      {(previewUrl || field.value) && (
                        <div className="mt-4">
                          <p className="text-sm font-medium mb-2">
                            {selectedFile ? 'New Image Preview' : 'Current Image'}
                          </p>
                          <div className="border rounded p-2 bg-white">
                            <img
                              src={previewUrl || field.value}
                              alt="Product preview"
                              className="max-h-64 mx-auto object-contain"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Submit buttons */}
        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/products')}
            disabled={isLoading || isUploading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading || isUploading}
            className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown"
          >
            {(isLoading || isUploading) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isEditing ? 'Update' : 'Create'} Product
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
