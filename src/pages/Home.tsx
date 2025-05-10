
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MapEmbed from '@/components/MapEmbed';
import FirewoodBanner from '@/components/FirewoodBanner';

const Home = () => {
  // Sample featured lumber products
  const featuredProducts = [
    {
      id: 1,
      name: 'Live Edge Slabs',
      description: 'Beautiful live edge wood slabs ideal for custom tables, countertops, and more.',
      image: '/lovable-uploads/3e9a035e-9de4-472c-97f1-0f026cf9486d.png',
      price: 'From $85/board ft',
    },
    {
      id: 2,
      name: '2" Dimensional Lumber',
      description: 'High-quality dimensional lumber perfect for construction and woodworking projects.',
      image: '/placeholder.svg',
      price: 'From $3.50/board ft',
    },
    {
      id: 3,
      name: '2S Surfaced Wood',
      description: 'Surfaced on two sides for smooth finish, ready for your carpentry projects.',
      image: '/placeholder.svg',
      price: 'From $4.25/board ft',
    },
    {
      id: 4,
      name: 'Custom Milling Services',
      description: 'Bring your logs and we\'ll mill them to your specifications on-site.',
      image: '/placeholder.svg',
      price: 'Starting at $75/hour',
    },
  ];

  // Sample testimonials
  const testimonials = [
    {
      id: 1,
      text: "The live edge maple slab I purchased from MilledRight was absolutely stunning. The quality was even better than I expected, and the team was so helpful in helping me select the perfect piece.",
      author: "John D., Furniture Maker",
      location: "Barrie"
    },
    {
      id: 2,
      text: "I brought my own logs to be milled and couldn't be happier with the results. Fair pricing and expert cutting - I'll definitely be returning with more logs next season.",
      author: "Michael T., Hobbyist",
      location: "Orillia"
    },
    {
      id: 3,
      text: "The quality of lumber from MilledRight is consistently excellent. As a professional woodworker, I depend on good materials, and they never disappoint.",
      author: "Sarah L., Cabinet Maker",
      location: "Beaverton"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/placeholder.svg')` }}
        ></div>
        
        <div className="container-wide py-24 md:py-32 lg:py-40 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow">
              Quality Lumber Direct From Our Sawmill
            </h1>
            <p className="text-xl mb-8 max-w-2xl text-shadow">
              From live edge slabs to dimensional lumber, MilledRight Sawmill provides premium locally sourced wood products and custom milling services.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-sawmill-orange hover:bg-sawmill-auburn text-white">
                <Link to="/products">Browse Our Products</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-sawmill-dark-brown">
                <Link to="/contact">Request Custom Milling</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Firewood Banner */}
      <FirewoodBanner />
      
      {/* Why Choose Us */}
      <section className="py-16 bg-muted">
        <div className="container-wide">
          <h2 className="section-title text-center mx-auto">Why Choose MilledRight</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
            <div className="text-center p-6">
              <div className="w-20 h-20 rounded-full bg-sawmill-dark-brown text-white flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-sawmill-dark-brown">Premium Quality</h3>
              <p className="text-sawmill-dark-gray">Hand-selected local lumber with attention to detail, ensuring the highest quality for your projects.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-20 h-20 rounded-full bg-sawmill-dark-brown text-white flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-sawmill-dark-brown">Local Sourcing</h3>
              <p className="text-sawmill-dark-gray">All our lumber comes from sustainably harvested local trees, supporting the regional economy.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-20 h-20 rounded-full bg-sawmill-dark-brown text-white flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-sawmill-dark-brown">Custom Services</h3>
              <p className="text-sawmill-dark-gray">Bring your logs to us, and we'll mill them to your exact specifications on-site.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-20 h-20 rounded-full bg-sawmill-dark-brown text-white flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-sawmill-dark-brown">Expert Knowledge</h3>
              <p className="text-sawmill-dark-gray">Our team has years of experience and can help you select the perfect wood for your project.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container-wide">
          <h2 className="section-title text-center mx-auto">Featured Products</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {featuredProducts.map(product => (
              <Card key={product.id} className="product-card">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-sawmill-dark-brown">{product.name}</h3>
                  <p className="text-sawmill-dark-gray text-sm mt-2 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sawmill-dark-brown font-bold">{product.price}</span>
                    <Link 
                      to={`/products/${product.id}`}
                      className="text-sawmill-orange hover:underline font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown text-white">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Call to Action - Middle */}
      <section className="py-16 bg-sawmill-medium-brown text-white">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Custom Milling Services Available</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Have logs that need milling? Bring them to us and we'll transform them into beautiful, usable lumber to your specifications.
          </p>
          <Button size="lg" className="bg-white text-sawmill-dark-brown hover:bg-sawmill-light-brown hover:text-sawmill-dark-brown">
            <Link to="/contact">Request Custom Milling Quote</Link>
          </Button>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-100">
        <div className="container-wide">
          <h2 className="section-title text-center mx-auto">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                <p className="italic text-sawmill-dark-gray mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-sawmill-dark-brown">{testimonial.author}</p>
                  <p className="text-sawmill-medium-brown">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/reviews"
              className="text-sawmill-orange hover:text-sawmill-auburn font-medium underline"
            >
              Read More Customer Reviews
            </Link>
          </div>
        </div>
      </section>
      
      {/* Map Location */}
      <MapEmbed />
      
      {/* Latest Blog Posts */}
      <section className="py-16">
        <div className="container-wide">
          <h2 className="section-title text-center mx-auto">Latest From Our Blog</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <Card>
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="Blog post"
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-4">
                <div className="text-sawmill-orange text-sm mb-2">May 5, 2025</div>
                <h3 className="text-xl font-bold text-sawmill-dark-brown">10 Tips for Maintaining Your Bandsaw Blades</h3>
                <p className="text-sawmill-dark-gray mt-2 mb-4">Learn how to extend the life of your bandsaw blades and improve cutting performance...</p>
                <Link 
                  to="/blog/10-tips-for-maintaining-your-bandsaw-blades"
                  className="text-sawmill-orange hover:underline font-medium"
                >
                  Read More
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="Blog post"
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-4">
                <div className="text-sawmill-orange text-sm mb-2">April 28, 2025</div>
                <h3 className="text-xl font-bold text-sawmill-dark-brown">Portable vs. Stationary Sawmills: Which Is Right For You?</h3>
                <p className="text-sawmill-dark-gray mt-2 mb-4">We compare the benefits and limitations of portable and stationary sawmill options...</p>
                <Link 
                  to="/blog/portable-vs-stationary-sawmills"
                  className="text-sawmill-orange hover:underline font-medium"
                >
                  Read More
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="Blog post"
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-4">
                <div className="text-sawmill-orange text-sm mb-2">April 15, 2025</div>
                <h3 className="text-xl font-bold text-sawmill-dark-brown">Customer Spotlight: Building a Successful Business with MilledRight</h3>
                <p className="text-sawmill-dark-gray mt-2 mb-4">Meet John Davis, who turned his passion for woodworking into a thriving business...</p>
                <Link 
                  to="/blog/customer-spotlight-john-davis"
                  className="text-sawmill-orange hover:underline font-medium"
                >
                  Read More
                </Link>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown text-white">
              <Link to="/blog">Visit Our Blog</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Call to Action - Bottom */}
      <section className="py-16 bg-sawmill-forest text-white">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Wood Project?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Visit our sawmill to browse our selection of quality lumber or discuss your custom milling needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-sawmill-forest hover:bg-sawmill-light-brown">
              <Link to="/products">Browse Products</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sawmill-forest">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
