
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
import { Loader2, Star } from 'lucide-react';
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
  fetchReview, 
  createReview, 
  updateReview, 
  fetchProductsForReview,
  ReviewFormValues
} from '@/api/adminReviewApi';

const formSchema = z.object({
  author: z.string().min(2, { message: "Author name must be at least 2 characters." }),
  location: z.string().optional().nullable(),
  rating: z.coerce.number().min(1).max(5),
  text: z.string().min(10, { message: "Review text must be at least 10 characters." }),
  status: z.enum(["Published", "Pending"]),
  product_id: z.string().optional().nullable(),
  date: z.string().optional(),
});

const ReviewForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: '',
      location: '',
      rating: 5,
      text: '',
      status: 'Pending',
      product_id: null,
      date: new Date().toISOString(),
    }
  });

  // Fetch review data if in edit mode
  const { data: reviewData, isLoading: isReviewLoading } = useQuery({
    queryKey: ['review', id],
    queryFn: () => fetchReview(id!),
    enabled: isEditMode,
  });

  // Fetch products for dropdown
  const { data: products = [] } = useQuery({
    queryKey: ['products-for-review'],
    queryFn: fetchProductsForReview,
  });

  // Set form values when review data is loaded
  useEffect(() => {
    if (reviewData) {
      form.reset({
        author: reviewData.author,
        location: reviewData.location,
        rating: reviewData.rating,
        text: reviewData.text,
        status: reviewData.status as 'Published' | 'Pending',
        product_id: reviewData.product_id,
        date: reviewData.date,
      });
    }
  }, [reviewData, form]);

  // Render stars for rating input
  const RatingStars = ({ value, onChange }: { value: number, onChange: (rating: number) => void }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="focus:outline-none"
          >
            <Star
              className={`h-6 w-6 ${
                star <= value ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  // Handle form submission
  const onSubmit = async (values: ReviewFormValues) => {
    try {
      setIsSubmitting(true);
      
      if (isEditMode && id) {
        await updateReview(id, values);
        toast({
          title: "Success",
          description: "Review updated successfully.",
        });
      } else {
        await createReview(values);
        toast({
          title: "Success",
          description: "Review created successfully.",
        });
      }
      
      navigate('/admin/reviews');
    } catch (error) {
      console.error("Error saving review:", error);
      toast({
        title: "Error",
        description: "Failed to save review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditMode && isReviewLoading) {
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
          {isEditMode ? 'Edit Review' : 'Add New Review'}
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter author name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, State" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <RatingStars value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="product_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Related Product</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review Text</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter review text" 
                    className="min-h-32" 
                    {...field} 
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
              {isEditMode ? 'Update Review' : 'Create Review'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/reviews')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ReviewForm;
