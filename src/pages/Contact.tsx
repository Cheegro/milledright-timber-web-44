
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send
} from 'lucide-react';
import MapEmbed from '@/components/MapEmbed';

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you would send the form data to your server here
    toast({
      title: "Message Sent",
      description: "We've received your message and will respond shortly.",
    });
  };

  return (
    <div className="min-h-screen">
      <div className="bg-sawmill-dark-brown py-12">
        <div className="container-wide">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-sawmill-light-brown text-lg">
            Get in touch with our team for quotes, questions, or custom orders
          </p>
        </div>
      </div>
      
      {/* Contact Information & Form */}
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
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
                    <p>(555) 123-4567</p>
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
                    <p>info@milledright.com</p>
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
                    <p>123 Lumber Lane<br />Woodsville, WA 98765</p>
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
          
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone (Optional)</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                <select
                  id="subject"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="Custom Milling">Custom Milling</option>
                  <option value="Product Inquiry">Product Inquiry</option>
                  <option value="Quote Request">Quote Request</option>
                  <option value="General Question">General Question</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                ></textarea>
              </div>
              
              <Button type="submit" className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown w-full flex items-center justify-center gap-2">
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      <Separator className="container-wide" />
      
      {/* Map */}
      <section className="py-12">
        <div className="container-wide mb-8">
          <h2 className="text-2xl font-bold text-center">Find Us</h2>
        </div>
        <MapEmbed />
      </section>
      
      {/* Quick Links */}
      <section className="bg-sawmill-light-brown py-12">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-bold mb-6">Need Something Specific?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown">
              Request Custom Milling
            </Button>
            <Button className="bg-sawmill-orange hover:bg-sawmill-auburn">
              Get Product Quote
            </Button>
            <Button variant="outline" className="border-sawmill-dark-brown text-sawmill-dark-brown hover:bg-sawmill-dark-brown hover:text-white">
              View Our Products
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
