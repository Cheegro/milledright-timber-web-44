
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { fetchProjects, Project } from '@/api/projectApi';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading projects:", error);
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Customer Projects"
        description="Browse our gallery of custom woodworking projects created with premium lumber from MilledRight Sawmill."
        keywords="custom projects, woodworking gallery, lumber projects, furniture making"
      />
      
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto py-10 px-4">
          <h1 className="text-3xl font-bold mb-2 text-sawmill-dark-brown">Customer Projects</h1>
          <p className="text-muted-foreground mb-8">
            Browse our gallery of custom woodworking projects created with our lumber.
          </p>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-sawmill-dark-brown" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No projects found.</p>
              <Link to="/contact">
                <Button className="mt-4 bg-sawmill-dark-brown hover:bg-sawmill-medium-brown">
                  Contact Us To Start Your Project
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="aspect-[4/3] relative">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <div className="flex gap-2 mt-1">
                      <Badge className="bg-sawmill-medium-brown text-white">{project.wood_type}</Badge>
                      <Badge variant="outline">{project.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {project.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link to="/contact" className="w-full">
                      <Button className="w-full bg-sawmill-dark-brown hover:bg-sawmill-medium-brown">
                        Request Similar Project
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          
          <div className="mt-12 bg-muted p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-sawmill-dark-brown">Start Your Custom Project</h2>
            <p className="mb-4">
              Have an idea for a custom woodworking project? Contact us today to discuss your vision 
              and how our premium lumber can bring it to life.
            </p>
            <Link to="/contact">
              <Button className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
