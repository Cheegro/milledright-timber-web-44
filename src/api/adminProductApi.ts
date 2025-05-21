
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

// Type for product with relationships
export interface AdminProduct {
  id: string;
  name: string;
  category_id: string | null;
  category?: string; // Populated from relationship
  price: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

// Fetch all products
export async function fetchProducts(): Promise<AdminProduct[]> {
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
      throw new Error(error.message);
    }

    return data.map(product => ({
      ...product,
      category: product.product_categories?.name || null
    }));
  } catch (error) {
    console.error("Exception fetching products:", error);
    throw error;
  }
}

// Fetch a single product by ID
export async function fetchProduct(id: string): Promise<AdminProduct | null> {
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
      throw new Error(error.message);
    }

    return {
      ...data,
      category: data.product_categories?.name || null
    };
  } catch (error) {
    console.error("Exception fetching product:", error);
    throw error;
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
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Exception fetching product categories:", error);
    throw error;
  }
}

// Create a new product
export async function createProduct(productData: {
  name: string;
  category_id: string | null;
  price: string;
  description: string | null;
  image_url: string | null;
}) {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert([productData])
      .select()
      .single();

    if (error) {
      console.error("Error creating product:", error);
      throw new Error(`Failed to create product: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Exception creating product:", error);
    throw error;
  }
}

// Update an existing product
export async function updateProduct(
  id: string,
  productData: {
    name?: string;
    category_id?: string | null;
    price?: string;
    description?: string | null;
    image_url?: string | null;
  }
) {
  try {
    const { data, error } = await supabase
      .from("products")
      .update(productData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating product:", error);
      throw new Error(`Failed to update product: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Exception updating product:", error);
    throw error;
  }
}

// Delete a product
export async function deleteProduct(id: string) {
  try {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting product:", error);
      throw new Error(`Failed to delete product: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error("Exception deleting product:", error);
    throw error;
  }
}

// Upload a product image
export async function uploadProductImage(file: File) {
  try {
    // Check file size before uploading
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error(`File size exceeds limit of 5MB. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
    }
    
    // Create a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    
    // Upload the file to the bucket - no need to check for bucket existence
    // The bucket should already be created and public
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file, {
        upsert: false,
        cacheControl: '3600'
      });

    if (error) {
      console.error("Error uploading image:", error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Exception uploading image:", error);
    throw error;
  }
}
