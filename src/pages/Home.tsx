
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Home = () => {
  // Sample featured products
  const featuredProducts = [
    {
      id: 1,
      name: 'LT40 Portable Sawmill',
      description: 'Our flagship portable sawmill with hydraulic log handling.',
      image: '/placeholder.svg',
      price: '$8,995',
    },
    {
      id: 2,
      name: 'LT20 Portable Sawmill',
      description: 'Compact and versatile sawmill for small to medium operations.',
      image: '/placeholder.svg',
      price: '$4,995',
    },
    {
      id: 3,
      name: 'Industrial Bandsaw Blades',
      description: 'Premium quality bandsaw blades for all sawmill models.',
      image: '/placeholder.svg',
      price: '$29.99',
    },
    {
      id: 4,
      name: 'Log Loading Attachment',
      description: 'Easily load heavy logs onto your sawmill with this attachment.',
      image: '/placeholder.svg',
      price: '$1,295',
    },
  ];

  // Sample testimonials
  const testimonials = [
    {
      id: 1,
      text: "MilledRight's LT40 completely transformed my small lumber business. The precision cuts and ease of use have saved me countless hours of work.",
      author: "John D., Professional Sawyer",
      location: "Oregon"
    },
    {
      id: 2,
      text: "As a hobbyist, I was hesitant about the investment, but the LT20 has paid for itself within months through projects and custom cutting jobs for neighbors.",
      author: "Michael T., Hobbyist",
      location: "Michigan"
    },
    {
      id: 3,
      text: "The customer service at MilledRight is unmatched. When I had questions about my new mill, they walked me through everything step by step.",
      author: "Sarah L., Furniture Maker",
      location: "North Carolina"
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
              Precision Milling Solutions for Every Woodworker
            </h1>
            <p className="text-xl mb-8 max-w-2xl text-shadow">
              From hobbyists to industrial operations, MilledRight provides the highest quality portable and industrial sawmill equipment on the market.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-sawmill-orange hover:bg-sawmill-auburn text-white">
                <Link to="/products">Explore Products</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-sawmill-dark-brown">
                <Link to="/contact">Request a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
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
              <p className="text-sawmill-dark-gray">Built with the highest grade materials and precision engineering for lasting performance.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-20 h-20 rounded-full bg-sawmill-dark-brown text-white flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-sawmill-dark-brown">Expert Support</h3>
              <p className="text-sawmill-dark-gray">Our team of experienced sawmill operators provides industry-leading customer service.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-20 h-20 rounded-full bg-sawmill-dark-brown text-white flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-sawmill-dark-brown">Versatile Solutions</h3>
              <p className="text-sawmill-dark-gray">Products designed for all levels, from weekend hobbyists to full-scale production facilities.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-20 h-20 rounded-full bg-sawmill-dark-brown text-white flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-sawmill-dark-brown">Value for Money</h3>
              <p className="text-sawmill-dark-gray">Competitive pricing without compromising on quality or performance.</p>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Not Sure Which Sawmill is Right for You?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our team of experts can help you choose the perfect equipment for your specific needs and budget.
          </p>
          <Button size="lg" className="bg-white text-sawmill-dark-brown hover:bg-sawmill-light-brown hover:text-sawmill-dark-brown">
            <Link to="/contact">Request Expert Advice</Link>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Milling Operations?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have chosen MilledRight for their sawmill needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-sawmill-forest hover:bg-sawmill-light-brown">
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sawmill-forest">
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
