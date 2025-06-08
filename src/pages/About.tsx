
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Clock, 
  Award, 
  Users, 
  BarChart3,
  GalleryHorizontal,
} from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="About Us"
        description="Learn about MilledRight Sawmill's story, mission, and team. Family-owned since 2008, providing premium lumber and custom milling services."
        keywords="about sawmill, family business, lumber company history, Whitchurch-Stouffville"
      />
      
      <Header />
      
      <main className="flex-1">
        <div className="bg-sawmill-dark-brown py-12">
          <div className="container-wide">
            <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>
            <p className="text-sawmill-light-brown text-lg">
              Discover the story of MilledRight Sawmill and our commitment to quality lumber
            </p>
          </div>
        </div>
        
        {/* Our Story */}
        <section className="container-wide py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-sawmill-dark-brown">Our Story</h2>
              <p className="mb-4 text-lg">
                Founded in 2008, MilledRight Sawmill began as a small family operation with a single portable sawmill. Today, we've grown into a premier provider of custom lumber solutions while maintaining our commitment to quality and sustainability.
              </p>
              <p className="mb-4">
                Our journey started when founder Mike Richards, a third-generation woodworker, recognized the need for high-quality custom milling services in the region. What began as a weekend hobby quickly turned into a thriving business as word spread about our attention to detail and exceptional customer service.
              </p>
              <p>
                Over the years, we've expanded our operations to include a full range of sawmill services, from custom lumber milling to specialized cuts for furniture makers and builders. Despite our growth, we've stayed true to our roots: producing premium lumber products with personal attention to each customer's needs.
              </p>
            </div>
            <div className="relative">
              <img 
                src="/placeholder.svg" 
                alt="MilledRight Sawmill building" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-sawmill-orange p-4 rounded-lg shadow-lg">
                <p className="text-white font-bold text-xl">EST. 2008</p>
              </div>
            </div>
          </div>
        </section>
        
        <Separator className="container-wide" />
        
        {/* Our Mission */}
        <section className="bg-sawmill-light-brown py-16">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6 text-sawmill-dark-brown">Our Mission</h2>
              <p className="text-xl">
                At MilledRight Sawmill, we strive to transform raw timber into premium lumber products while maintaining sustainable forestry practices and delivering exceptional value to our customers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-white">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <div className="h-16 w-16 rounded-full bg-sawmill-orange text-white flex items-center justify-center mb-4">
                    <Award size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Quality</h3>
                  <p>We're committed to producing the highest quality lumber for every project, large or small.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <div className="h-16 w-16 rounded-full bg-sawmill-orange text-white flex items-center justify-center mb-4">
                    <GalleryHorizontal size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                  <p>We practice responsible forestry and minimize waste in all our operations.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <div className="h-16 w-16 rounded-full bg-sawmill-orange text-white flex items-center justify-center mb-4">
                    <Users size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Community</h3>
                  <p>We support local craftsmen and builders with materials and expertise.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <div className="h-16 w-16 rounded-full bg-sawmill-orange text-white flex items-center justify-center mb-4">
                    <BarChart3 size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Innovation</h3>
                  <p>We continually improve our processes and techniques to better serve our customers.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="container-wide py-16">
          <h2 className="text-3xl font-bold mb-10 text-center text-sawmill-dark-brown">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Lucas Nauta", role: "Owner & Head Miller", img: "/placeholder.svg", initials: "LN" },
              { name: "Amber Watters", role: "Operations Manager", img: "/placeholder.svg", initials: "AW" },
              { name: "Martin Nauta", role: "Lead Sawyer", img: "/placeholder.svg", initials: "MN" },
              { name: "Lisa Green", role: "Customer Relations", img: "/placeholder.svg", initials: "LG" }
            ].map((member) => (
              <Card key={member.name} className="overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={member.img} alt={member.name} />
                    <AvatarFallback className="bg-sawmill-medium-brown text-white text-lg">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Equipment & Facilities */}
        <section className="bg-gray-100 py-16">
          <div className="container-wide">
            <h2 className="text-3xl font-bold mb-10 text-center text-sawmill-dark-brown">Our Equipment & Facilities</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <img 
                  src="/placeholder.svg" 
                  alt="Sawmill equipment" 
                  className="rounded-lg shadow-lg w-full h-auto mb-6" 
                />
                <h3 className="text-2xl font-bold mb-3 text-sawmill-dark-brown">State-of-the-Art Equipment</h3>
                <p>
                  Our sawmill operation features top-of-the-line equipment, including portable bandsaw mills, industrial resaws, planers, and specialized drying kilns. We regularly update our machinery to ensure precision cuts and efficient processing.
                </p>
              </div>
              <div>
                <img 
                  src="/placeholder.svg" 
                  alt="Sawmill facility" 
                  className="rounded-lg shadow-lg w-full h-auto mb-6" 
                />
                <h3 className="text-2xl font-bold mb-3 text-sawmill-dark-brown">4-Acre Facility</h3>
                <p>
                  Located on 4 acres of land, our facility includes a covered milling area, climate-controlled wood storage, a retail showroom, and ample space for lumber processing. We've designed our space to optimize workflow while maintaining a safe and efficient operation.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Hours of Operation */}
        <section className="container-wide py-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-sawmill-dark-brown text-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 mr-3" />
                <h2 className="text-3xl font-bold">Hours of Operation</h2>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b border-sawmill-medium-brown">
                  <span className="font-bold">Monday - Friday</span>
                  <span>8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-sawmill-medium-brown">
                  <span className="font-bold">Saturday</span>
                  <span>9:00 AM - 3:00 PM</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-bold">Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="italic">
                  Custom milling services by appointment only.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
