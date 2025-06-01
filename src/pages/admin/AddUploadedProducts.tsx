
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Plus } from 'lucide-react';
import { addProductsFromUploadedImages } from '@/utils/addProductsFromImages';

const AddUploadedProducts = () => {
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddProducts = async () => {
    setIsAdding(true);
    
    try {
      const { results, errors } = await addProductsFromUploadedImages();
      
      toast({
        title: 'Products Added',
        description: `Successfully added ${results.length} products from uploaded images`,
      });

      if (errors.length > 0) {
        console.error('Some products failed to add:', errors);
      }

      navigate('/admin/products');
    } catch (error) {
      console.error('Error adding products:', error);
      toast({
        title: 'Error',
        description: 'Failed to add products from uploaded images',
        variant: 'destructive',
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-sawmill-dark-brown">
        Add Products from Uploaded Images
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Ready to Add 10 New Products</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Products to be created:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Raw Walnut Live Edge Slab - Natural Character</li>
              <li>• Premium Walnut Slab - Rich Heartwood</li>
              <li>• Custom Fractal Burn Table - Artistic Masterpiece</li>
              <li>• Long Walnut Live Edge Slabs - Bookmatched Set</li>
              <li>• Premium Live Edge Walnut Slab - Large Format</li>
              <li>• Figured Walnut Slab - Premium Grade</li>
              <li>• Wide Walnut Slab - Natural Beauty</li>
              <li>• Character Walnut Slab - Unique Grain</li>
              <li>• Long Walnut Live Edge - Premium Quality</li>
              <li>• Exceptional Walnut Slab - Master Grade</li>
            </ul>
          </div>

          <p className="text-sm text-gray-600">
            All products will be set to "Price on Request" with detailed descriptions based on the uploaded images.
          </p>

          <Button 
            onClick={handleAddProducts} 
            disabled={isAdding}
            className="w-full bg-sawmill-dark-brown hover:bg-sawmill-medium-brown"
          >
            {isAdding ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Products...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Add All 10 Products
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddUploadedProducts;
