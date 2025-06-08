import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Pencil, 
  Trash2, 
  Plus, 
  Loader2, 
  Search,
  Eye
} from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { 
  fetchProjects,
  deleteProject,
  Project
} from '@/api/adminProjectApi';
import { addAntoniasPergola } from '@/utils/addAntoniasPergola';

const ProjectsAdmin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isAddingAntonia, setIsAddingAntonia] = useState(false);

  // Fetch projects
  const { 
    data: projects = [], 
    isLoading 
  } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      toast({
        title: 'Project deleted',
        description: 'The project has been successfully deleted.',
      });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setProjectToDelete(null);
    },
    onError: (error: any) => {
      toast({
        title: 'Error deleting project',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Handle adding Antonia's pergola
  const handleAddAntoniaPergola = async () => {
    try {
      setIsAddingAntonia(true);
      await addAntoniasPergola();
      toast({
        title: 'Project Added Successfully',
        description: "Antonia's Pergola has been added to the customer projects.",
      });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    } catch (error: any) {
      toast({
        title: 'Error Adding Project',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsAddingAntonia(false);
    }
  };

  // Check if Antonia's pergola already exists
  const antoniasPergolaExists = projects.some(project => 
    project.title.toLowerCase().includes("antonia") && 
    project.title.toLowerCase().includes("pergola")
  );

  // Filter projects based on search query
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.wood_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle delete
  const handleDelete = () => {
    if (projectToDelete) {
      deleteMutation.mutate(projectToDelete.id);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customer Projects</h1>
        <div className="flex gap-2">
          {!antoniasPergolaExists && (
            <Button 
              onClick={handleAddAntoniaPergola}
              disabled={isAddingAntonia}
              variant="outline"
            >
              {isAddingAntonia && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Antonia's Pergola
            </Button>
          )}
          <Button onClick={() => navigate('/admin/projects/new')}>
            <Plus className="mr-2 h-4 w-4" /> Add Project
          </Button>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            Total: {projects.length}
          </Badge>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center my-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate('/admin/projects/new')}
          >
            Add your first project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="aspect-[4/3] relative">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </div>
                <div className="flex gap-2 mt-1">
                  <Badge variant="secondary">{project.wood_type}</Badge>
                  <Badge variant="outline">{project.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {project.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-xs text-muted-foreground">
                  {format(new Date(project.created_at), 'MMM d, yyyy')}
                </div>
                <div className="flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => navigate(`/admin/projects/${project.id}/edit`)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={() => setProjectToDelete(project)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!projectToDelete} onOpenChange={(open) => !open && setProjectToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{projectToDelete?.title}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setProjectToDelete(null)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsAdmin;
