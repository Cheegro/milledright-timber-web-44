
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from '@/components/ui/badge';

const projectData = [
  {
    id: 1,
    title: "Live Edge Walnut Dining Table",
    description: "A stunning 8-foot dining table crafted from a single walnut slab with natural edges and custom steel legs.",
    image: "https://lh3.googleusercontent.com/pw/AP1GczOAcByE5Hm4MYIMettl4emX9aNlg4wLE-Y-TPISX24hZT_d6KeYda7iviQoVVw8xZqpvwwMUohBa6xDoxPRM22HGaag8KVSxhgF7AvievLP_kIi=w2400",
    woodType: "Walnut",
    category: "Furniture"
  },
  {
    id: 2,
    title: "Spalted Maple Coffee Table",
    description: "A conversation piece featuring unique spalting patterns with an epoxy river design and modern base.",
    image: "https://lh3.googleusercontent.com/pw/AP1GczMF-UwqDS0mzQhvKlZMMUqQjKwTeLsMs_9Y8SwdIC6a9h2vDZKec37odDn28R83IKXkMt7gvRsUIDIF0q6QJIrum2GSCsSeGQQjbUZVMcRypTv_=w2400",
    woodType: "Maple",
    category: "Furniture"
  },
  {
    id: 3,
    title: "Oak Kitchen Countertops",
    description: "Custom-milled oak countertops with a food-safe finish for a complete kitchen renovation.",
    image: "https://lh3.googleusercontent.com/pw/AP1GczNwsxZoR0-yVe3k_Wii5gR_FvJK_h-vkiR3vX3fW0miFTsr7FkZT6eO51tiqWzzGxgNpFmsJ9fDIw1K228F74pLeywJu11ezWCxrKEFkcUw7OhX=w2400",
    woodType: "Oak",
    category: "Kitchen"
  },
  {
    id: 4,
    title: "Cherry Bookshelf",
    description: "A floor-to-ceiling bookshelf made with custom-milled cherry lumber, featuring adjustable shelves.",
    image: "https://lh3.googleusercontent.com/pw/AP1GczMv8UGTC1-2V2OD2SGliOP4hQnxhDjf_B87-ZgCljeA2jQYIPT_iLA45QEKg0XqsvSMvfUJotixK1KBODI4-MZk3AQDZekoBsUbZQHp39pnLOwp=w2400",
    woodType: "Cherry",
    category: "Furniture"
  },
];

const ProjectShowcaseSection = () => {
  const [activeProject, setActiveProject] = useState(projectData[0]);

  return (
    <section className="py-16">
      <div className="container-wide">
        <h2 className="section-title text-center mx-auto">Customer Project Showcase</h2>
        <p className="text-center max-w-2xl mx-auto mb-12">See what our customers have created with our premium lumber. From dining tables to custom cabinetry, our wood brings dreams to life.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-[4/3] relative">
              <img 
                src={activeProject.image}
                alt={activeProject.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex gap-2 mb-2">
                  <Badge className="bg-sawmill-medium-brown">{activeProject.woodType}</Badge>
                  <Badge variant="outline" className="border-white text-white">{activeProject.category}</Badge>
                </div>
                <h3 className="text-white text-xl font-bold">{activeProject.title}</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700">{activeProject.description}</p>
              <Button className="mt-4 bg-sawmill-dark-brown hover:bg-sawmill-medium-brown">
                Request Similar Project
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-sawmill-dark-brown mb-6">Browse Projects</h3>
            
            <Carousel className="w-full">
              <CarouselContent>
                {projectData.map((project) => (
                  <CarouselItem key={project.id} className="basis-full md:basis-1/2 lg:basis-1/2">
                    <div 
                      className={`
                        p-2 h-full cursor-pointer transition-all
                        ${activeProject.id === project.id ? 'scale-105 shadow-md' : 'opacity-80 hover:opacity-100'}
                      `}
                      onClick={() => setActiveProject(project)}
                    >
                      <div className="aspect-square rounded-md overflow-hidden relative">
                        <img 
                          src={project.image}
                          alt={project.title}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="text-white font-medium px-3 py-1 bg-sawmill-dark-brown/70 rounded-full">View Project</span>
                        </div>
                        {activeProject.id === project.id && (
                          <div className="absolute inset-0 border-2 border-sawmill-orange"></div>
                        )}
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
            
            <p className="mt-8 text-sawmill-dark-brown">
              Our lumber is used in countless beautiful projects across the region. Browse our showcase to see the quality and versatility of our products.
            </p>
            
            <Button variant="outline" className="mt-4 border-sawmill-dark-brown text-sawmill-dark-brown hover:bg-sawmill-dark-brown hover:text-white">
              View More Projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcaseSection;
