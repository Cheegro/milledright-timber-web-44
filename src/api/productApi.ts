
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export interface Product {
  id: string;
  name: string;
  category_id: string;
  price: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  created_at: string;
}

// Fetch all products
export async function fetchProducts() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        product_categories(name)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
      return [];
    }

    return data.map(product => ({
      ...product,
      category: product.product_categories?.name || "Uncategorized"
    }));
  } catch (error) {
    console.error("Exception fetching products:", error);
    toast({
      title: "Error",
      description: "Failed to load products",
      variant: "destructive",
    });
    return [];
  }
}

// Fetch a single product by ID
export async function fetchProduct(id: string) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        product_categories(name)
      `)
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching product:", error);
      toast({
        title: "Error",
        description: "Failed to load product",
        variant: "destructive",
      });
      return null;
    }

    return {
      ...data,
      category: data.product_categories?.name || "Uncategorized"
    };
  } catch (error) {
    console.error("Exception fetching product:", error);
    toast({
      title: "Error",
      description: "Failed to load product",
      variant: "destructive",
    });
    return null;
  }
}

// Fetch all product categories
export async function fetchProductCategories() {
  try {
    const { data, error } = await supabase
      .from("product_categories")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching product categories:", error);
      toast({
        title: "Error",
        description: "Failed to load product categories",
        variant: "destructive",
      });
      return [];
    }

    return data;
  } catch (error) {
    console.error("Exception fetching product categories:", error);
    toast({
      title: "Error",
      description: "Failed to load product categories",
      variant: "destructive",
    });
    return [];
  }
}

// Upload a product image
export async function uploadProductImage(file: File) {
  try {
    // Create a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
      return null;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Exception uploading image:", error);
    toast({
      title: "Error",
      description: "Failed to upload image",
      variant: "destructive",
    });
    return null;
  }
}
