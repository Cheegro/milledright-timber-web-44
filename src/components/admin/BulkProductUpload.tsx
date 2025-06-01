
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Upload } from 'lucide-react';
import { bulkUploadProducts, BulkProductData } from '@/utils/bulkProductUpload';

interface BulkProductUploadProps {
  onComplete?: () => void;
}

const BulkProductUpload = ({ onComplete }: BulkProductUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Pre-defined product data for the uploaded images
  const predefinedProducts: BulkProductData[] = [
    {
      name: "Raw Walnut Live Edge Slab - Natural Character",
      price: "Price on Request",
      description: "Beautiful raw walnut slab with natural cracks and stunning grain patterns. Perfect for custom table projects or artistic woodworking.",
      woodType: "Black Walnut"
    },
    {
      name: "Premium Walnut Slab - Rich Heartwood",
      price: "Price on Request", 
      description: "Gorgeous walnut slab featuring rich reddish heartwood coloring with natural character marks and beautiful grain flow.",
      woodType: "Black Walnut"
    },
    {
      name: "Custom Fractal Burn Table - Artistic Masterpiece",
      price: "Price on Request",
      description: "Stunning finished table featuring intricate fractal burn patterns (Lichtenberg wood burning). A true work of functional art.",
      woodType: "Mixed Hardwood"
    },
    {
      name: "Long Walnut Live Edge Slabs - Bookmatched Set",
      price: "Price on Request",
      description: "Set of long walnut slabs with natural live edges. Perfect for dining tables, conference tables, or large custom projects.",
      woodType: "Black Walnut"
    },
    {
      name: "Premium Live Edge Walnut Slab - Large Format",
      price: "Price on Request",
      description: "Exceptional large format walnut slab with beautiful natural edge and outstanding grain character. Ideal for statement pieces.",
      woodType: "Black Walnut"
    },
    {
      name: "Figured Walnut Slab - Premium Grade",
      price: "Price on Request",
      description: "Premium figured walnut with exceptional reddish grain patterns and natural character. Perfect for high-end furniture projects.",
      woodType: "Black Walnut"
    },
    {
      name: "Wide Walnut Slab - Natural Beauty",
      price: "Price on Request",
      description: "Wide walnut slab showcasing natural wood beauty with distinctive grain patterns and rich coloring throughout.",
      woodType: "Black Walnut"
    },
    {
      name: "Character Walnut Slab - Unique Grain",
      price: "Price on Request",
      description: "Walnut slab with unique character markings and natural grain flow. Each piece tells its own story through the wood.",
      woodType: "Black Walnut"
    },
    {
      name: "Long Walnut Live Edge - Premium Quality",
      price: "Price on Request",
      description: "Long premium walnut slab with stunning grain patterns and natural live edge. Perfect for custom dining or conference tables.",
      woodType: "Black Walnut"
    },
    {
      name: "Exceptional Walnut Slab - Master Grade",
      price: "Price on Request",
      description: "Master grade walnut slab with exceptional grain figure and natural beauty. A centerpiece for any custom woodworking project.",
      woodType: "Black Walnut"
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: 'No Files Selected',
        description: 'Please select images to upload',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      const { results, errors } = await bulkUploadProducts(
        predefinedProducts.slice(0, selectedFiles.length),
        selectedFiles
      );

      toast({
        title: 'Upload Complete',
        description: `Successfully created ${results.length} products with optimized images`,
      });

      if (errors.length > 0) {
        console.error('Some uploads failed:', errors);
      }

      setSelectedFiles([]);
      onComplete?.();
    } catch (error) {
      console.error('Bulk upload error:', error);
      toast({
        title: 'Upload Failed',
        description: 'An error occurred during bulk upload',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Upload Products with Optimization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="images">Select Product Images</Label>
          <Input
            id="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          {selectedFiles.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              {selectedFiles.length} files selected (will create {Math.min(selectedFiles.length, predefinedProducts.length)} products)
            </p>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">What will be created:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {predefinedProducts.slice(0, selectedFiles.length).map((product, index) => (
              <li key={index}>• {product.name}</li>
            ))}
          </ul>
        </div>

        <Button 
          onClick={handleUpload} 
          disabled={isUploading || selectedFiles.length === 0}
          className="w-full"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading and Optimizing...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Create Products with Optimized Images
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BulkProductUpload;
