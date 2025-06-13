import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
  return <div className="min-h-screen flex flex-col">
      <SEOHead title="Custom Projects Gallery" description="Explore our portfolio of custom woodworking projects created with premium lumber from MilledRight Sawmill. From furniture to structures, see what's possible." keywords="custom projects, woodworking gallery, lumber projects, furniture making, custom structures" />
      
      <Header />
      
      <main className="flex-1">
        {/* Enhanced Hero Section */}
        <section className="relative bg-gradient-to-br from-sawmill-dark-brown via-sawmill-medium-brown to-sawmill-auburn text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-sawmill-orange rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-sawmill-light-brown rounded-full blur-3xl"></div>
          </div>
          
          <div className="container-wide py-20 md:py-28 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Custom Projects Gallery
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed max-w-3xl mx-auto">
                Discover the artistry and craftsmanship behind our custom woodworking projects. Each piece tells a story of quality lumber transformed into functional beauty.
              </p>
              
              {/* Project highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <Hammer className="w-8 h-8 mx-auto mb-3 text-sawmill-orange" />
                  <h3 className="font-bold text-lg mb-2">Custom Furniture</h3>
                  <p className="text-sm text-gray-200">Tables, chairs, cabinets crafted to your specifications</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <TreePine className="w-8 h-8 mx-auto mb-3 text-sawmill-forest" />
                  <h3 className="font-bold text-lg mb-2">Live Edge Creations</h3>
                  <p className="text-sm text-gray-200">Showcasing natural wood beauty in functional pieces</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <Palette className="w-8 h-8 mx-auto mb-3 text-sawmill-auburn" />
                  <h3 className="font-bold text-lg mb-2">Unique Structures</h3>
                  <p className="text-sm text-gray-200">Pergolas, gazebos, and custom outdoor features</p>
                </div>
              </div>
              
              <div className="bg-sawmill-orange/20 border border-sawmill-orange/30 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-sawmill-orange mb-2">Ready to Start Your Project?</h3>
                <p className="text-white mb-4">Let's discuss how we can bring your vision to life with our premium lumber and expert craftsmanship.</p>
                <Link to="/contact">
                  <Button size="lg" className="bg-sawmill-orange hover:bg-sawmill-auburn text-white">
                    Start Your Custom Project
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="container-wide py-12">
          {loading ? <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-sawmill-dark-brown" />
            </div> : projects.length === 0 ? <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">No projects found.</p>
              <Link to="/contact">
                <Button className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown">
                  Contact Us To Start Your Project
                </Button>
              </Link>
            </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-lg hover:transform hover:scale-105">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img src={project.image_url} alt={project.title} className="object-cover w-full h-full transition-transform duration-300 hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-sawmill-dark-brown">{project.title}</CardTitle>
                    <div className="flex gap-2 mt-1">
                      <Badge className="bg-sawmill-medium-brown text-white bg-orange-500 rounded-none">{project.wood_type}</Badge>
                      <Badge variant="outline" className="border-sawmill-orange text-sawmill-orange bg-slate-950">{project.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {project.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link to="/contact" className="w-full">
                      <Button className="w-full bg-sawmill-dark-brown hover:bg-sawmill-medium-brown transition-all duration-300">
                        Request Similar Project
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>)}
            </div>}
          
          <div className="mt-12 bg-gradient-to-r from-sawmill-orange/10 to-sawmill-auburn/10 p-8 rounded-2xl border border-sawmill-orange/20">
            <h2 className="text-2xl font-bold mb-4 text-sawmill-dark-brown">Start Your Custom Project</h2>
            <p className="mb-6 text-gray-700">
              Have an idea for a custom woodworking project? Contact us today to discuss your vision 
              and how our premium lumber can bring it to life. From initial concept to final delivery, 
              we'll work with you every step of the way.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown">
                Contact Us Today
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Projects;