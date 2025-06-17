
import React, { useState, useEffect } from 'react';
import SEOHead from '@/components/SEOHead';
import { fetchProjects, Project } from '@/api/projectApi';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Hammer, Palette, TreePine } from 'lucide-react';
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
    <>
      <SEOHead 
        title="Custom Projects Gallery" 
        description="Explore our portfolio of custom woodworking projects created with premium lumber from MilledRight Sawmill. From furniture to structures, see what's possible." 
        keywords="custom projects, woodworking gallery, lumber projects, furniture making, custom structures" 
      />
      
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-secondary rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-wide py-20 md:py-28 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Custom Projects Gallery
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/80 leading-relaxed max-w-3xl mx-auto">
              Discover the artistry and craftsmanship behind our custom woodworking projects. Each piece tells a story of quality lumber transformed into functional beauty.
            </p>
            
            {/* Project highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Hammer className="w-8 h-8 mx-auto mb-3 text-accent" />
                <h3 className="font-bold text-lg mb-2">Custom Furniture</h3>
                <p className="text-sm text-primary-foreground/70">Tables, chairs, cabinets crafted to your specifications</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <TreePine className="w-8 h-8 mx-auto mb-3 text-secondary" />
                <h3 className="font-bold text-lg mb-2">Live Edge Creations</h3>
                <p className="text-sm text-primary-foreground/70">Showcasing natural wood beauty in functional pieces</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Palette className="w-8 h-8 mx-auto mb-3 text-accent" />
                <h3 className="font-bold text-lg mb-2">Unique Structures</h3>
                <p className="text-sm text-primary-foreground/70">Pergolas, gazebos, and custom outdoor features</p>
              </div>
            </div>
            
            <div className="bg-accent/20 border border-accent/30 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-accent mb-2">Ready to Start Your Project?</h3>
              <p className="text-primary-foreground mb-4">Let's discuss how we can bring your vision to life with our premium lumber and expert craftsmanship.</p>
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Start Your Custom Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container-wide py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">No projects found.</p>
            <Link to="/contact">
              <Button className="bg-primary hover:bg-primary/90">
                Contact Us To Start Your Project
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-card shadow-lg hover:transform hover:scale-105">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img src={project.image_url} alt={project.title} className="object-cover w-full h-full transition-transform duration-300 hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-primary">{project.title}</CardTitle>
                  <div className="flex gap-2 mt-1">
                    <Badge className="bg-primary text-primary-foreground rounded-2xl">{project.wood_type}</Badge>
                    <Badge variant="outline" className="border-accent text-accent">{project.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-3 text-foreground text-left font-light">
                    {project.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/contact" className="w-full">
                    <Button className="w-full bg-primary hover:bg-primary/90 transition-all duration-300">
                      Request Similar Project
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        <div className="mt-12 bg-gradient-to-r from-accent/10 to-primary/10 p-8 rounded-2xl border border-accent/20">
          <h2 className="text-2xl font-bold mb-4 text-primary">We Value Your Trees - Contact us and Arrange a Trade</h2>
          <p className="mb-6 text-foreground">Got Logs? Need Lumber? Let's make a deal. Bring us your logs, and we'll cut them to your exact specifications. You pay us with a portion of the wood, and you keep the rest. It's the smartest, most efficient way to get custom lumber.</p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Contact Us Today
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Projects;
