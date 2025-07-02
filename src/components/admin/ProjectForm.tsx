
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, Upload, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { fetchProject, createProject, updateProject, uploadProjectImage } from '@/api/adminProjectApi';

// Validation schema
const projectFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  wood_type: z.string().min(1, 'Wood type is required'),
  category: z.string().min(1, 'Category is required'),
  image_url: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Form setup
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: '',
      description: '',
      wood_type: '',
      category: '',
      image_url: '',
    },
  });

  // Fetch existing project if editing
  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: () => fetchProject(id!),
    enabled: !!id,
  });

  // Set form values when project data is loaded
  useEffect(() => {
    if (project) {
      form.reset({
        title: project.title,
        description: project.description,
        wood_type: project.wood_type,
        category: project.category,
        image_url: project.image_url,
      });
      setImagePreview(project.image_url);
    }
  }, [project, form]);

  // Create mutation
  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      toast({
        title: 'Project created successfully',
        description: 'The new project has been added.',
      });
      navigate('/admin/projects');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error) => {
      toast({
        title: 'Error creating project',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProjectFormValues> }) => 
      updateProject(id, data),
    onSuccess: () => {
      toast({
        title: 'Project updated successfully',
        description: 'The project has been updated.',
      });
      navigate('/admin/projects');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error) => {
      toast({
        title: 'Error updating project',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    form.setValue('image_url', '');
  };

  // Handle form submission
  const onSubmit = async (values: ProjectFormValues) => {
    try {
      // Upload image if there's a new one
      if (imageFile) {
        setIsUploading(true);
        const imageUrl = await uploadProjectImage(imageFile);
        setIsUploading(false);
        
        if (imageUrl) {
          values.image_url = imageUrl;
        }
      }

      if (id) {
        updateMutation.mutate({ 
          id, 
          data: values 
        });
      } else {
        createMutation.mutate({
          title: values.title,
          description: values.description,
          image_url: values.image_url || '',
          wood_type: values.wood_type,
          category: values.category,
        });
      }
    } catch (error: any) {
      setIsUploading(false);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          {id ? 'Edit Project' : 'Create New Project'}
        </h1>
        <p className="text-muted-foreground">
          {id ? 'Update the project details.' : 'Add a new customer project to showcase.'}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Live Edge Walnut Dining Table" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="wood_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wood Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Walnut, Oak, Maple, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Furniture, Kitchen, etc." {...field} />
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the project and its features..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <FormLabel>Project Image</FormLabel>
                <div className="border rounded-md p-4 space-y-4">
                  {imagePreview ? (
                    <div className="relative aspect-[4/3] rounded-md overflow-hidden">
                      <img 
                        src={imagePreview} 
                        alt="Project preview" 
                        className="object-cover w-full h-full"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center aspect-[4/3] bg-muted rounded-md border border-dashed">
                      <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="text-muted-foreground">No image selected</p>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <Input 
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Upload project image (JPG, PNG, GIF). Max 5MB.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/projects')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending || isUploading}
                >
                  {(createMutation.isPending || updateMutation.isPending || isUploading) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {id ? 'Update Project' : 'Create Project'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProjectForm;
