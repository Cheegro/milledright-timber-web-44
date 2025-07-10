import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Edit, Trash2 } from 'lucide-react';
import { Testimonial } from '@/api/adminTestimonialApi';

interface TestimonialCardProps {
  testimonial: Testimonial;
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (id: string) => void;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  onEdit,
  onDelete
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{testimonial.author}</CardTitle>
            {testimonial.location && (
              <p className="text-sm text-muted-foreground">{testimonial.location}</p>
            )}
          </div>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit(testimonial)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(testimonial.id)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex">
            {renderStars(testimonial.rating || 5)}
          </div>
          <Badge variant={testimonial.status === 'active' ? 'default' : 'secondary'}>
            {testimonial.status === 'active' ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 italic">"{testimonial.text || testimonial.content}"</p>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;