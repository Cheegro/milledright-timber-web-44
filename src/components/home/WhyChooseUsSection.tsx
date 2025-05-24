
import React from 'react';
import { Hammer, PalmTree, Axe, Home, Flame, Brush } from 'lucide-react';

const WhyChooseUsSection = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container-wide">
        <h2 className="section-title text-center mx-auto mb-8">Our Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            icon={<Axe className="h-8 w-8" />}
            title="Custom Lumber Milling"
            description="We mill lumber to your exact specifications, including live edge, dimensional lumber, structural beams and posts. Any dimensions can be cut in both hardwood and softwood."
          />
          
          <ServiceCard 
            icon={<Home className="h-8 w-8" />}
            title="Custom Built Structures"
            description="We build sheds, chicken coops, and other wooden structures available upon inquiry. Totally custom - we help with design and provide knowledge from years of experience."
          />
          
          <ServiceCard 
            icon={<Brush className="h-8 w-8" />}
            title="Wood Finishing Services"
            description="We offer prefinished live edge wood. We can sand, flatten, and finish wood to help speed up your project and give it a professional touch."
          />
          
          <ServiceCard 
            icon={<Hammer className="h-8 w-8" />}
            title="Pre-Cut Wood & Project Materials"
            description="Need help with your DIY project? We offer pre-cut wood to your specifications, making your building projects easier and faster to complete."
          />
          
          <ServiceCard 
            icon={<Flame className="h-8 w-8" />}
            title="Firewood Sales"
            description="We also sell quality firewood under our Flaming Firewood brand. Available in various quantities to meet your needs."
          />
          
          <ServiceCard 
            icon={<PalmTree className="h-8 w-8" />}
            title="Expert Consultation"
            description="We provide our knowledge and expertise to help you decide on your next project and how to go about it for the best results."
          />
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-sawmill-dark-brown">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-sawmill-dark-brown">{title}</h3>
      </div>
      <p className="text-sawmill-dark-gray">{description}</p>
    </div>
  );
};

export default WhyChooseUsSection;
