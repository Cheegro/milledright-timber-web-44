
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  category_id: string;
  price: string;
  price_unit?: string;
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

// Fetch all products for admin
export async function fetchProducts(): Promise<Product[]> {
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

    return data || [];
  } catch (error) {
    console.error("Exception fetching products:", error);
    throw error;
  }
}

// Fetch a single product
export async function fetchProduct(id: string): Promise<Product> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching product:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Exception fetching product:", error);
    throw error;
  }
}

// Fetch all product categories
export async function fetchProductCategories(): Promise<ProductCategory[]> {
  try {
    const { data, error } = await supabase
      .from("product_categories")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching product categories:", error);
      throw new Error(error.message);
    }

    return data || [];
  } catch (error) {
    console.error("Exception fetching product categories:", error);
    throw error;
  }
}

// Create a new product
export async function createProduct(productData: {
  name: string;
  price: string;
  price_unit?: string;
  description: string;
  category_id: string;
  image_url?: string;
}): Promise<Product> {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert([productData])
      .select()
      .single();

    if (error) {
      console.error("Error creating product:", error);
      throw new Error(error.message);
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
  productData: Partial<{
    name: string;
    price: string;
    price_unit?: string;
    description: string;
    category_id: string;
    image_url?: string;
  }>
): Promise<Product> {
  try {
    const { data, error } = await supabase
      .from("products")
      .update(productData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating product:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Exception updating product:", error);
    throw error;
  }
}

// Delete a product
export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting product:", error);
      throw new Error(error.message);
    }

    return true;
  } catch (error) {
    console.error("Exception deleting product:", error);
    throw error;
  }
}

// Upload a product image
export async function uploadProductImage(file: File): Promise<string | null> {
  try {
    // Check file size
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error(`File size exceeds 5MB limit. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
    }

    // Create unique filename
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;

    console.log(`Uploading product image: ${fileName}`);

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error("Error uploading product image:", error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);

    console.log("Product image uploaded successfully:", publicUrlData.publicUrl);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Exception uploading product image:", error);
    throw error;
  }
}
