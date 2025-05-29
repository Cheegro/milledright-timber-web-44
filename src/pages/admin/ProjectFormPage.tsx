
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectForm from '@/components/admin/ProjectForm';
import { fetchProject } from '@/api/adminProjectApi';

const ProjectFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  // Fetch project if editing
  const { data: project, isLoading: projectLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: () => fetchProject(id!),
    enabled: isEditing,
  });

  if (isEditing && projectLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sawmill-dark-brown mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate('/admin/projects')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold text-sawmill-dark-brown">
          {isEditing ? 'Edit Project' : 'Add New Project'}
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <ProjectForm
          project={project}
          isEditing={isEditing}
        />
      </div>
    </div>
  );
};

export default ProjectFormPage;
