
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import ContactInfo from '@/components/ContactInfo';
import { useSettings } from '@/hooks/useSettings';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
} from 'lucide-react';
import MapEmbed from '@/components/MapEmbed';
import MultiStepQuoteForm from '@/components/home/MultiStepQuoteForm';

const Contact = () => {
  const { getSetting } = useSettings();

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Contact Us"
        description="Get in touch with MilledRight Sawmill for custom lumber milling, live edge slabs, and wood products. Located in Whitchurch-Stouffville, Ontario."
        keywords="contact sawmill, lumber quotes, custom milling services, Whitchurch-Stouffville lumber"
      />
      
      <Header />
      
      <main className="flex-1">
        {/* Contact Information & Form */}
        <div className="container-wide py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-sawmill-dark-brown">Get In Touch</h2>
              <p className="mb-8 text-lg">
                Whether you have questions about our products, need a custom quote, or want to discuss a special project, we're here to help. Reach out using any of the methods below.
              </p>
              
              <div className="space-y-6">
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="bg-sawmill-orange rounded-full p-3 text-white">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Phone</h3>
                      <p>(437) 898-0642</p>
                      <p>(905) 717-3474</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="bg-sawmill-orange rounded-full p-3 text-white">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <p>Lucas@Flamingfirewood.ca</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="bg-sawmill-orange rounded-full p-3 text-white">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Address</h3>
                      <p>16720 Hwy 48<br />Whitchurch-Stouffville, ON</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="bg-sawmill-orange rounded-full p-3 text-white">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Hours</h3>
                      <p>Monday-Friday: 8am-5pm<br />Saturday: 9am-3pm<br />Sunday: Closed</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Updated Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-sawmill-dark-brown">Request a Quote</h2>
              <MultiStepQuoteForm />
            </div>
          </div>
        </div>
        
        <Separator className="container-wide" />
        
        {/* Map */}
        <section className="py-12">
          <div className="container-wide mb-8">
            <h2 className="text-2xl font-bold text-center text-sawmill-dark-brown">Find Us</h2>
          </div>
          <MapEmbed />
        </section>
        
        {/* Quick Links */}
        <section className="bg-sawmill-light-brown py-12">
          <div className="container-wide text-center">
            <h2 className="text-2xl font-bold mb-6 text-sawmill-dark-brown">Need Something Specific?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setTimeout(() => {
                    const url = new URL(window.location.href);
                    url.searchParams.set('project', 'mill-logs');
                    window.history.replaceState({}, '', url.toString());
                    window.location.reload();
                  }, 300);
                }}
              >
                Request Custom Milling
              </Button>
              <Button 
                className="bg-sawmill-orange hover:bg-sawmill-auburn"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setTimeout(() => {
                    const url = new URL(window.location.href);
                    url.searchParams.set('project', 'other');
                    window.history.replaceState({}, '', url.toString());
                    window.location.reload();
                  }, 300);
                }}
              >
                Get Product Quote
              </Button>
              <Button 
                variant="outline" 
                className="border-sawmill-dark-brown text-sawmill-dark-brown hover:bg-sawmill-dark-brown hover:text-white"
                onClick={() => window.location.href = '/products'}
              >
                View Our Products
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
