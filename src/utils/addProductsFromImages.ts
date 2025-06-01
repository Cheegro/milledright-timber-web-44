
import { createProduct } from '@/api/adminProductApi';
import { uploadAndOptimizeImage } from '@/services/imageOptimizationService';
import { toast } from '@/components/ui/use-toast';

interface ProductFromImage {
  name: string;
  description: string;
  woodType: string;
  imageFile: File;
}

export async function addProductsFromUploadedImages() {
  const productsData: ProductFromImage[] = [
    {
      name: "Raw Walnut Live Edge Slab - Natural Character",
      description: "Beautiful raw walnut slab with natural cracks and stunning grain patterns. Perfect for custom table projects or artistic woodworking.",
      woodType: "Black Walnut",
      imageFile: new File([], "walnut-slab-1.jpg") // Will be replaced with actual files
    },
    {
      name: "Premium Walnut Slab - Rich Heartwood",
      description: "Gorgeous walnut slab featuring rich reddish heartwood coloring with natural character marks and beautiful grain flow.",
      woodType: "Black Walnut", 
      imageFile: new File([], "walnut-slab-2.jpg")
    },
    {
      name: "Custom Fractal Burn Table - Artistic Masterpiece",
      description: "Stunning finished table featuring intricate fractal burn patterns (Lichtenberg wood burning). A true work of functional art.",
      woodType: "Mixed Hardwood",
      imageFile: new File([], "fractal-table.jpg")
    },
    {
      name: "Long Walnut Live Edge Slabs - Bookmatched Set",
      description: "Set of long walnut slabs with natural live edges. Perfect for dining tables, conference tables, or large custom projects.",
      woodType: "Black Walnut",
      imageFile: new File([], "long-slabs.jpg")
    },
    {
      name: "Premium Live Edge Walnut Slab - Large Format",
      description: "Exceptional large format walnut slab with beautiful natural edge and outstanding grain character. Ideal for statement pieces.",
      woodType: "Black Walnut",
      imageFile: new File([], "large-walnut.jpg")
    },
    {
      name: "Figured Walnut Slab - Premium Grade",
      description: "Premium figured walnut with exceptional reddish grain patterns and natural character. Perfect for high-end furniture projects.",
      woodType: "Black Walnut",
      imageFile: new File([], "figured-walnut.jpg")
    },
    {
      name: "Wide Walnut Slab - Natural Beauty",
      description: "Wide walnut slab showcasing natural wood beauty with distinctive grain patterns and rich coloring throughout.",
      woodType: "Black Walnut",
      imageFile: new File([], "wide-walnut.jpg")
    },
    {
      name: "Character Walnut Slab - Unique Grain",
      description: "Walnut slab with unique character markings and natural grain flow. Each piece tells its own story through the wood.",
      woodType: "Black Walnut",
      imageFile: new File([], "character-walnut.jpg")
    },
    {
      name: "Long Walnut Live Edge - Premium Quality",
      description: "Long premium walnut slab with stunning grain patterns and natural live edge. Perfect for custom dining or conference tables.",
      woodType: "Black Walnut",
      imageFile: new File([], "long-premium.jpg")
    },
    {
      name: "Exceptional Walnut Slab - Master Grade",
      description: "Master grade walnut slab with exceptional grain figure and natural beauty. A centerpiece for any custom woodworking project.",
      woodType: "Black Walnut",
      imageFile: new File([], "master-grade.jpg")
    }
  ];

  const results = [];
  const errors = [];

  for (let i = 0; i < productsData.length; i++) {
    try {
      const productData = productsData[i];
      
      // Create the product first
      const product = await createProduct({
        name: productData.name,
        category_id: null,
        price: "Price on Request",
        description: productData.description,
        image_url: null, // Will be updated after optimization
      });

      // Note: In a real implementation, you would upload and optimize the actual image files here
      // For now, we're creating the products with the structure ready for optimization
      
      results.push(product);
      
      toast({
        title: 'Product Created',
        description: `${productData.name} has been added`,
      });
    } catch (error) {
      console.error(`Error creating product ${productsData[i].name}:`, error);
      errors.push({ product: productsData[i].name, error });
      
      toast({
        title: 'Error',
        description: `Failed to create ${productsData[i].name}`,
        variant: 'destructive',
      });
    }
  }

  return { results, errors };
}
