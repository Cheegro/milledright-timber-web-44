
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTestimonials } from '@/hooks/useTestimonials';
import TestimonialForm from './testimonials/TestimonialForm';
import TestimonialCard from './testimonials/TestimonialCard';

const TestimonialManager = () => {
  const {
    testimonials,
    products,
    isDialogOpen,
    setIsDialogOpen,
    editingTestimonial,
    formData,
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleOpenDialog,
    isSubmitting,
  } = useTestimonials();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-sawmill-dark-brown">Customer Testimonials</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-sawmill-orange hover:bg-sawmill-auburn"
              onClick={handleOpenDialog}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </DialogTitle>
            </DialogHeader>
            <TestimonialForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onCancel={() => setIsDialogOpen(false)}
              isSubmitting={isSubmitting}
              isEditing={!!editingTestimonial}
              products={products}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialManager;
