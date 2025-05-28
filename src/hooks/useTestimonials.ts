
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "@/components/ui/use-toast";
import {
  fetchAllTestimonials,
  TestimonialFormValues,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  fetchProductsForTestimonial,
  Testimonial
} from '@/api/adminTestimonialApi';

export const useTestimonials = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<TestimonialFormValues>({
    author: '',
    location: '',
    rating: 5,
    text: '',
    status: 'Published',
  });

  const queryClient = useQueryClient();

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['admin-testimonials'],
    queryFn: fetchAllTestimonials,
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products-for-testimonial'],
    queryFn: fetchProductsForTestimonial,
  });

  const createMutation = useMutation({
    mutationFn: createTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['published-testimonials'] });
      setIsDialogOpen(false);
      resetForm();
      toast({
        title: "Success",
        description: "Testimonial created successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create testimonial.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TestimonialFormValues }) => 
      updateTestimonial(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['published-testimonials'] });
      setIsDialogOpen(false);
      resetForm();
      toast({
        title: "Success",
        description: "Testimonial updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update testimonial.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['published-testimonials'] });
      toast({
        title: "Success",
        description: "Testimonial deleted successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete testimonial.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      author: '',
      location: '',
      rating: 5,
      text: '',
      status: 'Published',
    });
    setEditingTestimonial(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTestimonial) {
      updateMutation.mutate({ id: editingTestimonial.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      author: testimonial.author,
      location: testimonial.location,
      rating: testimonial.rating,
      text: testimonial.text,
      status: testimonial.status,
      product_id: testimonial.product_id,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleOpenDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  return {
    testimonials,
    products,
    isLoading,
    isDialogOpen,
    setIsDialogOpen,
    editingTestimonial,
    formData,
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleOpenDialog,
    resetForm,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
  };
};
