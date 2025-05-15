
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Loader2, Upload } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  fetchProduct, 
  fetchProductCategories, 
  createProduct, 
  updateProduct,
  uploadProductImage
} from '@/api/adminProductApi';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  category_id: z.string().nullable(),
  price: z.string().min(1, { message: "Price is required." }),
  description: z.string().optional().nullable(),
  image_url: z.string().optional().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch product categories
  const { data: categories = [] } = useQuery({
    queryKey: ['productCategories'],
    queryFn: fetchProductCategories,
  });

  // Fetch product data if in edit mode
  const { data: productData, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id!),
    enabled: isEditMode,
  });

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category_id: null,
      price: '',
      description: '',
      image_url: '',
    }
  });

  // Set form values when product data is loaded
  useEffect(() => {
    if (productData) {
      form.reset({
        name: productData.name,
        category_id: productData.category_id,
        price: productData.price,
        description: productData.description || '',
        image_url: productData.image_url,
      });
      
      if (productData.image_url) {
        setImagePreview(productData.image_url);
      }
    }
  }, [productData, form]);

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Upload image if a new one was selected
      if (imageFile) {
        const imageUrl = await uploadProductImage(imageFile);
        values.image_url = imageUrl;
      }
      
      if (isEditMode) {
        await updateProduct(id!, values);
        toast({
          title: "Success",
          description: "Product updated successfully.",
        });
      } else {
        await createProduct(values);
        toast({
          title: "Success",
          description: "Product created successfully.",
        });
      }
      
      navigate('/admin/products');
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-sawmill-dark-brown" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-sawmill-dark-brown">
          {isEditMode ? 'Edit Product' : 'Create New Product'}
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. $95/board ft" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
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

            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('image-upload')?.click()}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          {field.value ? 'Change Image' : 'Upload Image'}
                        </Button>
                        {field.value && !imageFile && (
                          <Button
                            type="button"
                            variant="ghost"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => {
                              field.onChange('');
                              setImagePreview(null);
                            }}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                      {imagePreview && (
                        <div className="relative w-40 h-40 border rounded">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="object-cover w-full h-full rounded"
                          />
                        </div>
                      )}
                      <input type="hidden" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter product description" 
                    className="min-h-32" 
                    {...field} 
                    value={field.value || ''} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button 
              type="submit" 
              className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditMode ? 'Update Product' : 'Create Product'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/products')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
