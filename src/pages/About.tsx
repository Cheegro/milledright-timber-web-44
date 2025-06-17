
import React from 'react';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Clock, 
  Heart, 
  Users, 
  Leaf,
  GalleryHorizontal,
  Lightbulb,
  DollarSign,
  TreePine
} from 'lucide-react';

const About = () => {
  return (
    <>
      <SEOHead 
        title="About Us - Sustainable Renegades"
        description="Meet the renegades at MilledRight Sawmill. We help customers make their dreams come true using naturally sustainable practices and old-forgotten methods."
        keywords="about sawmill, sustainable lumber, natural wood treatment, custom milling, renegade woodworkers"
      />
      
      <div className="bg-gradient-to-br from-card via-secondary to-muted py-20 md:py-28">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">About Us</h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              We're the <span className="text-primary font-bold">renegades</span> who believe in making your dreams come true 
              through sustainable craftsmanship and time-tested wisdom
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Philosophy */}
      <section className="container-wide py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
              Making Dreams Come True, <span className="text-primary">Naturally</span>
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                At MilledRight Sawmill, we're more than just lumber suppliers – <strong className="text-foreground">we're dream makers</strong>. Every piece of wood that leaves our mill carries the potential to become something extraordinary in your hands.
              </p>
              <p>
                We believe in helping our customers achieve their visions using <span className="text-primary font-semibold">naturally sustainable practices</span>. That's why we say no to pressure-treated wood and yes to the old, forgotten methods that have stood the test of time.
              </p>
              <p className="italic text-muted-foreground bg-muted p-4 rounded-lg border-l-4 border-primary">
                "Not every customer interaction is about money. If we can help without charging you, we prefer that. We're renegades who put relationships before revenue."
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="/placeholder.svg" 
              alt="Natural wood processing at MilledRight" 
              className="rounded-xl shadow-2xl w-full h-auto"
            />
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-primary to-accent p-6 rounded-xl shadow-xl text-primary-foreground">
              <p className="font-bold text-2xl">RENEGADES</p>
              <p className="text-sm opacity-90">Since 2008</p>
            </div>
          </div>
        </div>
      </section>
      
      <Separator className="container-wide" />
      
      {/* Our Values */}
      <section className="bg-muted/50 py-20">
        <div className="container-wide">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              The Renegade Way
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We empower our customers with resources, knowledge, and expertise. 
              Our mission is to revive the sustainable methods that modern industry forgot.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="modern-card hover:shadow-xl transition-all duration-300 hover:border-primary/50">
              <CardContent className="flex flex-col items-center text-center p-8">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground flex items-center justify-center mb-6">
                  <Heart size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Dreams First</h3>
                <p className="text-muted-foreground">We help make your vision reality, focusing on what matters most to you and your project.</p>
              </CardContent>
            </Card>
            
            <Card className="modern-card hover:shadow-xl transition-all duration-300 hover:border-primary/50">
              <CardContent className="flex flex-col items-center text-center p-8">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-secondary to-muted text-foreground flex items-center justify-center mb-6">
                  <Leaf size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Natural Methods</h3>
                <p className="text-muted-foreground">We embrace sustainable practices and avoid chemical treatments, returning to time-tested techniques.</p>
              </CardContent>
            </Card>
            
            <Card className="modern-card hover:shadow-xl transition-all duration-300 hover:border-primary/50">
              <CardContent className="flex flex-col items-center text-center p-8">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-accent to-primary text-primary-foreground flex items-center justify-center mb-6">
                  <Lightbulb size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Knowledge Sharing</h3>
                <p className="text-muted-foreground">We empower customers with resources, expertise, and forgotten wisdom of traditional woodworking.</p>
              </CardContent>
            </Card>
            
            <Card className="modern-card hover:shadow-xl transition-all duration-300 hover:border-primary/50">
              <CardContent className="flex flex-col items-center text-center p-8">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground flex items-center justify-center mb-6">
                  <DollarSign size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Help First</h3>
                <p className="text-muted-foreground">If we can help without charging, we prefer that. Relationships matter more than transactions.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Our Approach */}
      <section className="container-wide py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
            Why We Avoid Pressure-Treated Wood
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-destructive mb-3 flex items-center gap-2">
                  <TreePine className="w-6 h-6" />
                  The Problem with Chemicals
                </h3>
                <p className="text-muted-foreground">
                  Pressure-treated wood is infused with harsh chemicals that can be harmful to health and the environment. 
                  These chemicals never fully leave the wood and can leach into soil and groundwater.
                </p>
              </div>
              
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                  <Leaf className="w-6 h-6" />
                  The Natural Alternative
                </h3>
                <p className="text-muted-foreground">
                  We champion natural preservation methods: proper drying, natural oils, traditional joinery, and selecting the right wood species for each application. 
                  These methods have protected wood for centuries.
                </p>
              </div>
            </div>
            
            <div className="modern-card bg-gradient-to-br from-card to-secondary text-foreground p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Our Promise</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  No harmful chemical treatments
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Traditional preservation methods
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Sustainable sourcing practices
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Education on natural alternatives
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Long-term durability without compromise
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="bg-muted/30 py-20">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-foreground">
            Meet the Renegades
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Lucas Nauta", role: "Owner & Head Renegade", img: "/placeholder.svg", initials: "LN" },
              { name: "Amber Watters", role: "Sustainability Advocate", img: "/placeholder.svg", initials: "AW" },
              { name: "Martin Nauta", role: "Traditional Methods Expert", img: "/placeholder.svg", initials: "MN" },
              { name: "Lisa Green", role: "Customer Dream Facilitator", img: "/placeholder.svg", initials: "LG" }
            ].map((member) => (
              <Card key={member.name} className="modern-card overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-primary/50">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={member.img} alt={member.name} />
                    <AvatarFallback className="bg-secondary text-foreground text-lg">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold mb-1 text-foreground">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Hours & Contact */}
      <section className="container-wide py-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="modern-card bg-gradient-to-br from-card to-secondary text-foreground p-10 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-center mb-8">
              <Clock className="h-8 w-8 mr-3 text-primary" />
              <h2 className="text-3xl font-bold">Hours of Operation</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="font-bold">Monday - Friday</span>
                <span className="text-muted-foreground">8:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="font-bold">Saturday</span>
                <span className="text-muted-foreground">9:00 AM - 3:00 PM</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-bold">Sunday</span>
                <span className="text-muted-foreground">Closed</span>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="italic text-muted-foreground">
                Custom consultations available anytime – just call!
              </p>
            </div>
          </div>
          
          <div className="modern-card bg-gradient-to-br from-primary to-accent text-primary-foreground p-10 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Ready to Start Your Dream?</h2>
            
            <div className="space-y-6 text-center">
              <p className="text-lg">
                Whether you need lumber, advice, or just want to chat about your project, 
                we're here to help make it happen – the natural way.
              </p>
              
              <div className="space-y-3">
                <p><strong>Phone:</strong> (437) 898-0642</p>
                <p><strong>Location:</strong> 16720 Hwy 48, Whitchurch-Stouffville</p>
                <p><strong>Email:</strong> info@milledright.com</p>
              </div>
              
              <p className="italic text-sm opacity-90">
                Remember: We're renegades who believe in helping first, 
                selling second. Your success is our mission.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
