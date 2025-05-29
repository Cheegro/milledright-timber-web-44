
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectForm from '@/components/admin/ProjectForm';

const ProjectFormPage = () => {
  const navigate = useNavigate();

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
          Add New Project
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <ProjectForm />
      </div>
    </div>
  );
};

export default ProjectFormPage;
