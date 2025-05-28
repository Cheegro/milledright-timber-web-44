
import TestimonialManager from '@/components/admin/TestimonialManager';

const TestimonialsAdmin = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-sawmill-dark-brown">Testimonials Management</h1>
        <p className="text-muted-foreground">
          Manage customer testimonials that appear on your homepage and throughout the site.
        </p>
      </div>
      
      <TestimonialManager />
    </div>
  );
};

export default TestimonialsAdmin;
