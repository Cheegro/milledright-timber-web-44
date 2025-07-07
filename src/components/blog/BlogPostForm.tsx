
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Upload, X } from 'lucide-react';
import { createBlogPost, updateBlogPost, uploadBlogImage } from '@/api/adminBlogApi';

// Form validation schema
const blogFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  category_id: z.string().optional(),
  is_published: z.boolean().default(false),
  featured_image_url: z.string().optional(),
  author_name: z.string().min(2, 'Author name must be at least 2 characters'),
});

interface BlogPostFormProps {
  initialData?: any;
  isEditing?: boolean;
}

const BlogPostForm = ({ initialData, isEditing = false }: BlogPostFormProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.featured_image_url || null
  );
  const [categories, setCategories] = useState<any[]>([]);
  const [keepExistingImage, setKeepExistingImage] = useState(true);
  const [hasExistingImage, setHasExistingImage] = useState(false);
  
  // Initialize form with existing blog post data or defaults
  const form = useForm<z.infer<typeof blogFormSchema>>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      content: initialData?.content || '',
      excerpt: initialData?.excerpt || '',
      category_id: initialData?.category_id || '',
      is_published: initialData?.is_published || false,
      featured_image_url: initialData?.featured_image_url || '',
      author_name: initialData?.author_name || 'Lucas Nauta',
    },
  });

  // Check if there's an existing image when component mounts
  useEffect(() => {
    if (initialData?.featured_image_url) {
      setHasExistingImage(true);
      setKeepExistingImage(true);
      setPreviewUrl(initialData.featured_image_url);
    }
  }, [initialData]);

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  };

  useEffect(() => {
    // Generate slug from title if not in edit mode and slug is empty
    if (!isEditing) {
      const subscription = form.watch((value, { name }) => {
        if (name === 'title') {
          const currentSlug = form.getValues('slug');
          if (!currentSlug || currentSlug === '') {
            form.setValue('slug', generateSlug(value.title || ''));
          }
        }
      });
      return () => subscription.unsubscribe();
    }
  }, [form, isEditing]);
  
  useEffect(() => {
    // Fetch blog categories
    async function fetchCategories() {
      try {
        console.log('Loading blog categories...');
        const { supabase } = await import('@/integrations/supabase/client');
        const { data, error } = await supabase
          .from('blog_categories')
          .select('*')
          .order('name');
          
        if (error) {
          console.error('Error loading blog categories:', error);
          throw error;
        }
        
        console.log('Blog categories loaded:', data?.length || 0);
        setCategories(data || []);
      } catch (err) {
        console.error('Error fetching blog categories:', err);
        toast({
          title: 'Error',
          description: 'Failed to load blog categories',
          variant: 'destructive',
        });
      }
    }
    
    fetchCategories();
  }, []);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log('Blog image selected:', file.name, 'Size:', file.size);
      setSelectedFile(file);
      setKeepExistingImage(false);
      
      // Create a preview URL for the selected image
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setKeepExistingImage(false);
    setHasExistingImage(false);
    form.setValue('featured_image_url', '');
  };

  const handleKeepExistingImage = () => {
    setSelectedFile(null);
    setPreviewUrl(initialData?.featured_image_url || null);
    setKeepExistingImage(true);
    form.setValue('featured_image_url', initialData?.featured_image_url || '');
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return null;
    
    try {
      setIsUploading(true);
      console.log("Starting blog image upload...");
      
      const imageUrl = await uploadBlogImage(selectedFile);
      console.log("Blog upload result:", imageUrl ? "Success" : "Failed");
      
      if (!imageUrl) {
        throw new Error('Upload returned null');
      }
      
      return imageUrl;
    } catch (error) {
      console.error('Error uploading blog image:', error);
      toast({
        title: 'Image Upload Failed',
        description: error instanceof Error ? error.message : 'Failed to upload image. Please try again.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof blogFormSchema>) => {
    try {
      setIsLoading(true);
      console.log('Starting blog post submission...', { isEditing, hasSelectedFile: !!selectedFile });
      
      // Handle image logic
      let imageUrl = '';
      
      if (selectedFile) {
        // Upload new image
        console.log("Uploading new featured image...");
        imageUrl = await handleImageUpload();
        if (!imageUrl) {
          console.log("Image upload failed, stopping form submission");
          return; // Don't continue if image upload fails
        }
      } else if (isEditing && keepExistingImage && hasExistingImage && initialData?.featured_image_url) {
        // Keep existing image when editing
        imageUrl = initialData.featured_image_url;
        console.log("Keeping existing image:", imageUrl);
      } else {
        // No image selected or existing image removed
        imageUrl = '';
      }
      
      const blogPostData = {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        author_name: data.author_name,
        category_id: data.category_id,
        is_published: data.is_published,
        featured_image_url: imageUrl,
      };
      
      console.log('Submitting blog post data:', blogPostData);
      
      if (isEditing && initialData) {
        await updateBlogPost(initialData.id, blogPostData);
        toast({
          title: 'Success',
          description: 'Blog post updated successfully',
        });
      } else {
        await createBlogPost(blogPostData);
        toast({
          title: 'Success',
          description: 'Blog post created successfully',
        });
      }
      
      navigate('/admin/blog');
    } catch (error: any) {
      console.error('Error saving blog post:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save blog post. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Blog post title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="blog-post-slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="author_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Author name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Short summary of the blog post" 
                      {...field}
                      rows={3}
                    />
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
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <RadioGroup 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      className="space-y-1"
                    >
                      {categories.map(category => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={category.id} id={`category-${category.id}`} />
                          <label htmlFor={`category-${category.id}`} className="text-sm">
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_published"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Published</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Make this blog post visible on the site
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Blog post content" 
                      {...field}
                      className="min-h-[300px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featured_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {/* Show existing image controls when editing and has existing image */}
                      {isEditing && hasExistingImage && !selectedFile && (
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Current image:</p>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant={keepExistingImage ? "default" : "outline"}
                              size="sm"
                              onClick={handleKeepExistingImage}
                              disabled={isUploading}
                            >
                              Keep Current Image
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={handleRemoveImage}
                              disabled={isUploading}
                            >
                              Remove Image
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="blog-image"
                          disabled={isUploading}
                        />
                        <label
                          htmlFor="blog-image"
                          className="cursor-pointer block"
                        >
                          <Upload className="h-10 w-10 mx-auto text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">
                            {isEditing ? 'Click to change featured image' : 'Click to upload featured image'}
                          </p>
                          <p className="text-xs text-gray-400">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </label>
                      </div>

                      {isUploading && (
                        <p className="text-sm text-blue-600 flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading image...
                        </p>
                      )}

                      {previewUrl && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium">
                              {selectedFile ? 'New Image Preview' : 'Current Image'}
                            </p>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={handleRemoveImage}
                              disabled={isUploading}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="border rounded p-2 bg-white">
                            <img
                              src={previewUrl}
                              alt="Featured image preview"
                              className="max-h-64 mx-auto object-contain"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Submit buttons */}
        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/blog')}
            disabled={isLoading || isUploading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading || isUploading}
            className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown"
          >
            {(isLoading || isUploading) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isUploading ? 'Uploading...' : isEditing ? 'Update' : 'Create'} Blog Post
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BlogPostForm;
