
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { fetchProjects, Project } from '@/api/projectApi';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Hammer, Palette, TreePine, Award, Star } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col bg-sawmill-warm-white">
      <SEOHead 
        title="Custom Projects Gallery" 
        description="Explore our portfolio of custom woodworking projects created with premium lumber from MilledRight Sawmill. From furniture to structures, see what's possible." 
        keywords="custom projects, woodworking gallery, lumber projects, furniture making, custom structures" 
      />
      
      <Header />
      
      <main className="flex-1">
        {/* Enhanced Hero Section */}
        <section className="relative modern-gradient-dark text-white overflow-hidden section-padding">
          {/* Enhanced background effects */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-64 h-64 bg-sawmill-orange rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-sawmill-orange-light rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-sawmill-forest rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          </div>
          
          {/* Wood grain texture overlay */}
          <div className="absolute inset-0 wood-texture opacity-10"></div>
          
          <div className="container-wide relative z-10">
            <div className="max-w-6xl mx-auto text-center">
              {/* Enhanced heading with awards */}
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                  <Award className="w-5 h-5 text-sawmill-orange" />
                  <span className="text-sm font-semibold">Award-Winning Craftsmanship</span>
                  <div className="flex gap-1 ml-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-sawmill-orange text-sawmill-orange" />
                    ))}
                  </div>
                </div>
              </div>

              <h1 className="display-xl mb-8 leading-tight">
                Custom Projects Gallery
              </h1>
              <p className="text-premium-lg mb-12 text-white/90 leading-relaxed max-w-4xl mx-auto">
                Discover the artistry and craftsmanship behind our custom woodworking projects. Each piece tells a story of quality lumber transformed into functional beauty.
              </p>
              
              {/* Enhanced project highlights */}
              <div className="premium-grid mb-12">
                <div className="glass-effect rounded-3xl p-8 border border-white/20 group hover:bg-white/20 transition-all duration-500">
                  <Hammer className="w-12 h-12 mx-auto mb-4 text-sawmill-orange group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-bold text-xl mb-3">Custom Furniture</h3>
                  <p className="text-sm text-white/80">Tables, chairs, cabinets crafted to your specifications</p>
                </div>
                <div className="glass-effect rounded-3xl p-8 border border-white/20 group hover:bg-white/20 transition-all duration-500">
                  <TreePine className="w-12 h-12 mx-auto mb-4 text-sawmill-forest group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-bold text-xl mb-3">Live Edge Creations</h3>
                  <p className="text-sm text-white/80">Showcasing natural wood beauty in functional pieces</p>
                </div>
                <div className="glass-effect rounded-3xl p-8 border border-white/20 group hover:bg-white/20 transition-all duration-500">
                  <Palette className="w-12 h-12 mx-auto mb-4 text-sawmill-auburn group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-bold text-xl mb-3">Unique Structures</h3>
                  <p className="text-sm text-white/80">Pergolas, gazebos, and custom outdoor features</p>
                </div>
              </div>
              
              {/* Enhanced CTA section */}
              <div className="premium-banner bg-gradient-to-r from-sawmill-orange/20 to-sawmill-orange-light/20 border-2 border-sawmill-orange/30 backdrop-blur-sm max-w-4xl mx-auto">
                <h3 className="heading-md text-sawmill-orange mb-3 font-bold">Ready to Start Your Project?</h3>
                <p className="text-white mb-6 text-premium-base">Let's discuss how we can bring your vision to life with our premium lumber and expert craftsmanship.</p>
                <Link to="/contact">
                  <Button className="modern-button-primary">
                    Start Your Custom Project
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="container-wide section-padding-sm">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-sawmill-orange" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-sawmill-medium-brown mb-6 text-premium-lg">No projects found.</p>
              <Link to="/contact">
                <Button className="modern-button-primary">
                  Contact Us To Start Your Project
                </Button>
              </Link>
            </div>
          ) : (
            <div className="premium-grid">
              {projects.map(project => (
                <Card key={project.id} className="product-card group">
                  <div className="aspect-[4/3] relative overflow-hidden rounded-t-3xl">
                    <img 
                      src={project.image_url} 
                      alt={project.title} 
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-sawmill-dark-brown/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl text-sawmill-dark-brown font-bold">{project.title}</CardTitle>
                    <div className="flex gap-3 mt-2">
                      <Badge className="product-badge">{project.wood_type}</Badge>
                      <Badge className="bg-white border-2 border-sawmill-orange text-sawmill-orange hover:bg-sawmill-cream font-semibold">{project.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sawmill-medium-brown line-clamp-3 text-left leading-relaxed">
                      {project.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link to="/contact" className="w-full">
                      <Button className="modern-button-primary w-full">
                        Request Similar Project
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          
          {/* Enhanced value proposition */}
          <div className="mt-16 premium-banner">
            <h2 className="heading-md text-sawmill-dark-brown mb-6 font-bold">We Value Your Trees - Contact us and Arrange a Trade</h2>
            <p className="mb-8 text-sawmill-medium-brown text-premium-base leading-relaxed">
              Got Logs? Need Lumber? Let's make a deal. Bring us your logs, and we'll cut them to your exact specifications. 
              You pay us with a portion of the wood, and you keep the rest. It's the smartest, most efficient way to get custom lumber.
            </p>
            <Link to="/contact">
              <Button className="modern-button-primary">
                Contact Us Today
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
