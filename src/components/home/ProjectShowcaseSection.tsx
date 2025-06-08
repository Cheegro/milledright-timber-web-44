
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from '@/components/ui/badge';
import { fetchProjects, Project } from '@/api/projectApi';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const ProjectShowcaseSection = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const { data: allProjects = [], isLoading } = useQuery({
    queryKey: ['projects-showcase'],
    queryFn: fetchProjects,
  });

  // Filter out duplicates by title (case-insensitive)
  const projects = allProjects.filter((project, index, array) => {
    const firstOccurrence = array.findIndex(p => 
      p.title.toLowerCase().trim() === project.title.toLowerCase().trim()
    );
    return firstOccurrence === index;
  });

  // Filter out the active project from the carousel projects
  const carouselProjects = projects.filter(project => project.id !== activeProject?.id);

  // Debug logging
  console.log('All projects loaded:', allProjects.length);
  console.log('Projects after duplicate filtering:', projects.length);
  console.log('Project titles:', projects.map(p => p.title));
  console.log('Active project:', activeProject?.title);
  console.log('Carousel projects:', carouselProjects.map(p => p.title));

  useEffect(() => {
    if (projects.length > 0 && !activeProject) {
      setActiveProject(projects[0]);
    }
  }, [projects, activeProject]);

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container-wide">
          <h2 className="section-title text-center mx-auto">Customer Project Showcase</h2>
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-sawmill-dark-brown" />
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="py-16">
        <div className="container-wide">
          <h2 className="section-title text-center mx-auto">Customer Project Showcase</h2>
          <p className="text-center max-w-2xl mx-auto mb-12">
            See what our customers have created with our premium lumber. From dining tables to custom cabinetry, our wood brings dreams to life.
          </p>
          <div className="text-center py-10">
            <p className="text-muted-foreground">Check back soon to see our latest customer projects!</p>
            <Link to="/contact">
              <Button className="mt-4 bg-sawmill-dark-brown hover:bg-sawmill-medium-brown">
                Contact Us For Custom Work
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container-wide">
        <h2 className="section-title text-center mx-auto">Customer Project Showcase</h2>
        <p className="text-center max-w-2xl mx-auto mb-12">See what our customers have created with our premium lumber. From dining tables to custom cabinetry, our wood brings dreams to life.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            {activeProject && (
              <>
                <div className="aspect-[4/3] relative">
                  <img 
                    src={activeProject.image_url}
                    alt={activeProject.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex gap-2 mb-2">
                      <Badge className="bg-sawmill-medium-brown">{activeProject.wood_type}</Badge>
                      <Badge variant="outline" className="border-white text-white">{activeProject.category}</Badge>
                    </div>
                    <h3 className="text-white text-xl font-bold">{activeProject.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700">{activeProject.description}</p>
                  <Link to="/contact">
                    <Button className="mt-4 bg-sawmill-dark-brown hover:bg-sawmill-medium-brown">
                      Request Similar Project
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
          
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-sawmill-dark-brown mb-6">Browse Projects</h3>
            
            {carouselProjects.length > 0 ? (
              <Carousel className="w-full">
                <CarouselContent>
                  {carouselProjects.map((project) => (
                    <CarouselItem key={project.id} className="basis-full md:basis-1/2 lg:basis-1/2">
                      <div 
                        className={`
                          p-2 h-full cursor-pointer transition-all
                          opacity-80 hover:opacity-100 hover:scale-105
                        `}
                        onClick={() => setActiveProject(project)}
                      >
                        <div className="aspect-square rounded-md overflow-hidden relative">
                          <img 
                            src={project.image_url}
                            alt={project.title}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <span className="text-white font-medium px-3 py-1 bg-sawmill-dark-brown/70 rounded-full">View Project</span>
                          </div>
                        </div>
                        <h4 className="mt-2 text-sm font-medium text-center truncate">
                          {project.title}
                        </h4>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center gap-2 mt-4">
                  <CarouselPrevious className="static transform-none mx-0" />
                  <CarouselNext className="static transform-none mx-0" />
                </div>
              </Carousel>
            ) : (
              <p className="text-center text-muted-foreground">No other projects to display.</p>
            )}
            
            <p className="mt-8 text-sawmill-dark-brown">
              Our lumber is used in countless beautiful projects across the region. Browse our showcase to see the quality and versatility of our products.
            </p>
            
            <Link to="/projects">
              <Button variant="outline" className="mt-4 border-sawmill-dark-brown text-sawmill-dark-brown hover:bg-sawmill-dark-brown hover:text-white">
                View More Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcaseSection;
