
import { createProduct } from '@/api/adminProductApi';
import { toast } from '@/components/ui/use-toast';

interface ProductFromImage {
  name: string;
  description: string;
  woodType: string;
  imageUrl: string;
}

export async function addProductsFromUploadedImages() {
  // Use the actual uploaded image URLs from your uploads
  const productsData: ProductFromImage[] = [
    {
      name: "Raw Walnut Live Edge Slab - Natural Character",
      description: "Beautiful raw walnut slab with natural cracks and stunning grain patterns. Perfect for custom table projects or artistic woodworking.",
      woodType: "Black Walnut",
      imageUrl: "/lovable-uploads/11084600-1006-48ed-8e7d-0c46751ccc05.png"
    },
    {
      name: "Premium Walnut Slab - Rich Heartwood",
      description: "Gorgeous walnut slab featuring rich reddish heartwood coloring with natural character marks and beautiful grain flow.",
      woodType: "Black Walnut", 
      imageUrl: "/lovable-uploads/15c1d1dd-4743-4437-9885-f0a252905680.png"
    },
    {
      name: "Custom Fractal Burn Table - Artistic Masterpiece",
      description: "Stunning finished table featuring intricate fractal burn patterns (Lichtenberg wood burning). A true work of functional art.",
      woodType: "Mixed Hardwood",
      imageUrl: "/lovable-uploads/20824b3a-95ce-47ff-895d-b19f775386b0.png"
    },
    {
      name: "Long Walnut Live Edge Slabs - Bookmatched Set",
      description: "Set of long walnut slabs with natural live edges. Perfect for dining tables, conference tables, or large custom projects.",
      woodType: "Black Walnut",
      imageUrl: "/lovable-uploads/3690e90b-4ecc-4ea1-ae72-8c2c65ccba68.png"
    },
    {
      name: "Premium Live Edge Walnut Slab - Large Format",
      description: "Exceptional large format walnut slab with beautiful natural edge and outstanding grain character. Ideal for statement pieces.",
      woodType: "Black Walnut",
      imageUrl: "/lovable-uploads/3bbdcd8d-05b2-47e1-aca3-320512a4fc72.png"
    },
    {
      name: "Figured Walnut Slab - Premium Grade",
      description: "Premium figured walnut with exceptional reddish grain patterns and natural character. Perfect for high-end furniture projects.",
      woodType: "Black Walnut",
      imageUrl: "/lovable-uploads/3c7d6dd1-8b41-4a54-abd5-a29423098810.png"
    },
    {
      name: "Wide Walnut Slab - Natural Beauty",
      description: "Wide walnut slab showcasing natural wood beauty with distinctive grain patterns and rich coloring throughout.",
      woodType: "Black Walnut",
      imageUrl: "/lovable-uploads/3cf80757-6bfb-4d57-a6a3-a2ac3e456804.png"
    },
    {
      name: "Character Walnut Slab - Unique Grain",
      description: "Walnut slab with unique character markings and natural grain flow. Each piece tells its own story through the wood.",
      woodType: "Black Walnut",
      imageUrl: "/lovable-uploads/3e9a035e-9de4-472c-97f1-0f026cf9486d.png"
    },
    {
      name: "Long Walnut Live Edge - Premium Quality",
      description: "Long premium walnut slab with stunning grain patterns and natural live edge. Perfect for custom dining or conference tables.",
      woodType: "Black Walnut",
      imageUrl: "/lovable-uploads/46e45d1a-ad1a-4971-8e60-f54e280b5f86.png"
    },
    {
      name: "Exceptional Walnut Slab - Master Grade",
      description: "Master grade walnut slab with exceptional grain figure and natural beauty. A centerpiece for any custom woodworking project.",
      woodType: "Black Walnut",
      imageUrl: "/lovable-uploads/4ce3798a-36c6-4e85-b7a0-6b61c9dc55b7.png"
    }
  ];

  const results = [];
  const errors = [];

  for (let i = 0; i < productsData.length; i++) {
    try {
      const productData = productsData[i];
      
      // Create the product with the actual image URL
      const product = await createProduct({
        name: productData.name,
        category_id: null,
        price: "Price on Request",
        description: productData.description,
        image_url: productData.imageUrl,
      });
      
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
