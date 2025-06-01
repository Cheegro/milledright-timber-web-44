
import { useState } from 'react';
import { uploadAndOptimizeImage, EntityType, OptimizedImageUrls } from '@/services/imageOptimizationService';
import { toast } from '@/components/ui/use-toast';

export function useImageOptimization() {
  const [isOptimizing, setIsOptimizing] = useState(false);

  const optimizeImage = async (
    file: File,
    entityType: EntityType,
    entityId: string
  ): Promise<OptimizedImageUrls | null> => {
    try {
      setIsOptimizing(true);
      const urls = await uploadAndOptimizeImage(file, entityType, entityId);
      
      toast({
        title: 'Image Optimized',
        description: 'Your image has been automatically optimized and saved',
      });
      
      return urls;
    } catch (error: any) {
      console.error('Image optimization error:', error);
      toast({
        title: 'Image Optimization Failed',
        description: error.message || 'Failed to optimize image. Please try again.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsOptimizing(false);
    }
  };

  return {
    optimizeImage,
    isOptimizing,
  };
}
