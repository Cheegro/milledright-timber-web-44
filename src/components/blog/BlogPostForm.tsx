
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { fetchBlogCategories } from "@/api/blogApi";
import { createBlogPost, updateBlogPost, uploadBlogImage } from "@/api/adminBlogApi";

// Define the form schema with Zod
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  excerpt: z.string().min(10, {
    message: "Excerpt must be at least 10 characters.",
  }),
  content: z.string().min(20, {
    message: "Content must be at least 20 characters.",
  }),
  author: z.string().min(2, {
    message: "Author name must be at least 2 characters.",
  }),
  category_id: z.string().uuid({
    message: "Please select a valid category.",
  }),
  is_published: z.boolean().default(false),
  image_url: z.string().optional(),
});

// Define the props for the form component
interface BlogPostFormProps {
  initialData?: any;
  isEditing?: boolean;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({
  initialData,
  isEditing = false,
}) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    initialData?.image_url || null
  );

  // Initialize react-hook-form with zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      excerpt: initialData?.excerpt || "",
      content: initialData?.content || "",
      author: initialData?.author || "",
      category_id: initialData?.category_id || "",
      is_published: initialData?.is_published || false,
      image_url: initialData?.image_url || "",
    },
  });

  // Load categories on component mount
  useEffect(() => {
    async function loadCategories() {
      const categoriesData = await fetchBlogCategories();
      setCategories(categoriesData);
    }
    loadCategories();
  }, []);

  // Handle file change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      // Create a preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
    }
  };

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      let imageUrl = values.image_url;

      // If there's a new file selected, upload it first
      if (selectedFile) {
        imageUrl = await uploadBlogImage(selectedFile);
        if (!imageUrl) {
          throw new Error("Failed to upload image");
        }
      }

      // Create the post data with the image URL
      const postData = {
        ...values,
        image_url: imageUrl,
        // Set published_at if the post is being published
        published_at: values.is_published ? new Date().toISOString() : null,
      };

      let result;
      if (isEditing && initialData?.id) {
        result = await updateBlogPost(initialData.id, postData);
      } else {
        result = await createBlogPost(postData);
      }

      if (result) {
        // Navigate to the blog admin page on success
        navigate("/admin/blog");
      }
    } catch (error) {
      console.error("Error saving blog post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column - Basic info */}
          <div className="space-y-6">
            {/* Title field */}
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

            {/* Author field */}
            <FormField
              control={form.control}
              name="author"
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

            {/* Category field */}
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
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

            {/* Excerpt field */}
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A brief summary of the blog post"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will be displayed in blog listings
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Published switch */}
            <FormField
              control={form.control}
              name="is_published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Publish</FormLabel>
                    <FormDescription>
                      When enabled, this post will be visible on your blog
                    </FormDescription>
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

          {/* Right column - Content and image */}
          <div className="space-y-6">
            {/* Featured image upload */}
            <div>
              <FormLabel className="block mb-2">Featured Image</FormLabel>
              <div className="space-y-4">
                {previewImage && (
                  <div className="w-full h-48 overflow-hidden rounded-md border border-input">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                  id="image-upload"
                />
              </div>
            </div>

            {/* Content field */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Blog post content (HTML supported)"
                      className="min-h-[400px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    HTML tags are supported for formatting
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/blog")}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-sawmill-dark-brown" disabled={isLoading}>
            {isLoading
              ? "Saving..."
              : isEditing
              ? "Update Post"
              : "Create Post"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BlogPostForm;
