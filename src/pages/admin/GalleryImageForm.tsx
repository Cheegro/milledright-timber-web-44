import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Upload, X, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().optional(),
  category_id: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface GalleryCategory {
  id: string;
  name: string;
}

const GalleryImageForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      category_id: undefined,
    },
  });

  // Load categories and image data if editing
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        console.log('Loading gallery form data...');
        
        // Load categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('gallery_categories')
          .select('*')
          .order('name');
          
        if (categoriesError) {
          console.error('Error loading categories:', categoriesError);
          throw categoriesError;
        }
        
        console.log('Categories loaded:', categoriesData?.length || 0);
        setCategories(categoriesData || []);
        
        // If editing, load the image data
        if (isEditing) {
          console.log('Loading existing gallery image:', id);
          const { data, error } = await supabase
            .from('gallery_images')
            .select('*')
            .eq('id', id)
            .single();
            
          if (error) {
            console.error('Error loading gallery image:', error);
            throw error;
          }
          
          if (data) {
            form.reset({
              title: data.title,
              description: data.description || '',
              category_id: data.category_id || undefined,
            });
            
            setPreviewImage(data.image_url);
            console.log('Existing image loaded:', data.title);
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
        toast({
          title: "Error loading data",
          description: error instanceof Error ? error.message : "An unknown error occurred",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [id, isEditing, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Image selected for gallery:', file.name, 'Size:', file.size);
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setPreviewImage(null);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      console.log('Starting gallery image upload...');
      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      
      console.log('Uploading to gallery-images bucket:', fileName);
      
      const { data, error } = await supabase.storage
        .from('gallery-images')
        .upload(fileName, file, {
          contentType: file.type,
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Storage upload error:', error);
        throw error;
      }

      const { data: publicUrlData } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(fileName);

      console.log('Gallery image uploaded successfully:', publicUrlData.publicUrl);
      return publicUrlData.publicUrl;
    } catch (error) {
      console.error('Error uploading gallery image:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (values: FormValues) => {
    if (!isEditing && !imageFile) {
      console.error('No image file selected for new gallery image');
      toast({
        title: "Error",
        description: "Please select an image to upload",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      console.log('Starting gallery form submission...', { isEditing, hasImageFile: !!imageFile });
      
      let imageUrl = previewImage;
      
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
        if (!imageUrl) {
          throw new Error('Failed to upload image');
        }
      }

      if (isEditing) {
        console.log('Updating gallery image:', id);
        // Update existing image
        const { error } = await supabase
          .from('gallery_images')
          .update({
            title: values.title,
            description: values.description || null,
            category_id: values.category_id || null,
          })
          .eq('id', id);
          
        if (error) {
          console.error('Error updating gallery image:', error);
          throw error;
        }

        toast({
          title: "Success",
          description: "Gallery image updated successfully",
        });
      } else {
        console.log('Creating new gallery image');
        // Create new image - include required thumbnail_url
        const { error } = await supabase
          .from('gallery_images')
          .insert({
            title: values.title,
            description: values.description || null,
            category_id: values.category_id || null,
            image_url: imageUrl!,
            thumbnail_url: imageUrl!, // Use same image for thumbnail
          });
          
        if (error) {
          console.error('Error creating gallery image:', error);
          throw error;
        }

        toast({
          title: "Success",
          description: "Gallery image uploaded successfully",
        });
      }
      
      navigate('/admin/gallery');
    } catch (error) {
      console.error("Error saving gallery image:", error);
      toast({
        title: "Error saving image",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !categories.length) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate('/admin/gallery')}
          className="flex items-center gap-2"
          disabled={loading || uploading}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Gallery
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold">
          {isEditing ? 'Edit Gallery Image' : 'Add New Gallery Image'}
        </h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Image Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter image title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter image description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category (Optional)</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {!isEditing && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Image Upload</label>
                      <Input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange}
                        className="w-full"
                        disabled={uploading}
                      />
                      <p className="text-sm text-gray-500">
                        Select an image to upload (JPG, PNG, GIF - Max 5MB)
                      </p>
                      {uploading && (
                        <p className="text-sm text-blue-600 flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading image...
                        </p>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-center">
                  {previewImage ? (
                    <div className="relative w-full max-w-xs">
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="w-full h-64 object-cover rounded-md border"
                      />
                      {!isEditing && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={removeImage}
                          disabled={uploading}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="w-full max-w-xs h-64 bg-gray-100 rounded-md border border-dashed flex items-center justify-center">
                      <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          {isEditing ? "Loading image..." : "Image preview will appear here"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/admin/gallery')}
                  disabled={loading || uploading}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading || uploading}
                >
                  {(loading || uploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {uploading ? 'Uploading...' : isEditing ? 'Update Image' : 'Upload Image'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GalleryImageForm;
