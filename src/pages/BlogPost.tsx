
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react';

// Mock blog post data - in a real app this would come from an API
const getBlogPost = (id: number) => {
  return {
    id,
    title: "Selecting the Right Wood for Your Project",
    content: `
      <p>Choosing the right type of wood for your project is crucial for both structural integrity and aesthetics. With so many options available, it can be overwhelming to make the best selection. In this guide, we'll walk you through the considerations that should inform your choice.</p>
      
      <h2>Hardwood vs. Softwood</h2>
      <p>One of the first distinctions to understand is between hardwoods and softwoods. Despite their names, the terms don't necessarily describe the physical hardness of the wood, but rather the type of tree it comes from.</p>
      
      <p><strong>Hardwoods</strong> come from deciduous trees (those that lose their leaves annually) and generally grow slower, resulting in denser wood. Examples include oak, maple, cherry, and walnut. These woods are often used for furniture, flooring, and high-wear applications.</p>
      
      <p><strong>Softwoods</strong> come from coniferous trees (evergreens with needles and cones). Examples include pine, cedar, spruce, and fir. These woods are typically less dense, easier to work with, and more affordable, making them ideal for construction, outdoor projects, and decorative elements.</p>
      
      <h2>Durability and Strength</h2>
      <p>Different woods offer varying levels of durability:</p>
      <ul>
        <li><strong>High durability</strong>: Teak, white oak, cedar, cypress</li>
        <li><strong>Medium durability</strong>: Cherry, walnut, maple</li>
        <li><strong>Lower durability</strong>: Pine, spruce, poplar</li>
      </ul>
      
      <p>Choose based on the intended use and exposure to elements. For outdoor furniture or structures, opt for naturally rot-resistant woods like cedar, cypress, or treated lumber.</p>
      
      <h2>Appearance and Grain</h2>
      <p>The visual characteristics of wood can dramatically impact your project:</p>
      <ul>
        <li><strong>Color</strong>: Woods range from the pale tones of maple and ash to the rich darkness of walnut and mahogany</li>
        <li><strong>Grain pattern</strong>: Some woods have distinctive grain patterns (like oak's prominent grain or bird's eye maple's unique spots)</li>
        <li><strong>Character marks</strong>: Knots, mineral streaks, and color variations can either be flaws or features depending on your aesthetic preference</li>
      </ul>
      
      <h2>Workability</h2>
      <p>Consider how easy the wood is to work with using your available tools:</p>
      <ul>
        <li>Pine and poplar are soft and easy to cut, sand, and shape</li>
        <li>Cherry and walnut offer moderate workability with beautiful results</li>
        <li>Oak and maple can be more challenging due to their hardness but hold details well</li>
        <li>Exotic hardwoods often require specialized tools and techniques</li>
      </ul>
      
      <h2>Cost Considerations</h2>
      <p>Wood prices vary significantly based on species, quality, and availability:</p>
      <ul>
        <li>Budget-friendly: Pine, poplar, fir</li>
        <li>Mid-range: Oak, maple, ash</li>
        <li>Premium: Cherry, walnut, mahogany</li>
        <li>Luxury: Exotic woods like purpleheart, ebony, and teak</li>
      </ul>
      
      <h2>Sustainability</h2>
      <p>For environmentally conscious woodworkers, consider:</p>
      <ul>
        <li>FSC-certified woods from responsibly managed forests</li>
        <li>Reclaimed or salvaged lumber</li>
        <li>Fast-growing, renewable species like bamboo (technically a grass) and eucalyptus</li>
        <li>Domestic woods that require less shipping and typically have better environmental regulations</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>The right wood for your project balances functionality, appearance, workability, budget, and environmental impact. At MilledRight Sawmill, we offer guidance to help you select the perfect lumber for any application. Visit our showroom to see and feel different wood species in person, and consult with our experts about your specific project needs.</p>
    `,
    date: "2025-04-22",
    author: "Mike Johnson",
    authorTitle: "Head Miller",
    authorImg: "/placeholder.svg",
    category: "Tips & Tricks",
    imageUrl: "/placeholder.svg",
    relatedPosts: [
      {
        id: 2,
        title: "Understanding Wood Moisture Content",
        excerpt: "Why moisture content matters in lumber and how it affects your woodworking projects.",
        imageUrl: "/placeholder.svg",
        date: "2025-04-15"
      },
      {
        id: 5,
        title: "Working with Live Edge Slabs",
        excerpt: "Tips and techniques for incorporating the natural beauty of live edge wood into your furniture projects.",
        imageUrl: "/placeholder.svg",
        date: "2025-03-21"
      },
      {
        id: 6,
        title: "Proper Wood Storage Techniques",
        excerpt: "How to store your lumber to prevent warping, cracking, and other issues that can ruin your wood supply.",
        imageUrl: "/placeholder.svg",
        date: "2025-03-15"
      }
    ]
  };
};

// Format date in a nice readable format
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = getBlogPost(parseInt(id || "1", 10));

  return (
    <div className="min-h-screen">
      <div className="bg-sawmill-dark-brown py-12">
        <div className="container-wide">
          <Link to="/blog" className="flex items-center text-sawmill-light-brown hover:text-white mb-4 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
          <h1 className="text-4xl font-bold text-white">{post.title}</h1>
          <div className="flex items-center mt-6 text-white">
            <Badge className="bg-sawmill-orange border-none mr-4">{post.category}</Badge>
            <div className="flex items-center mr-4 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center text-sm">
              <User className="h-4 w-4 mr-1" />
              <span>{post.author}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container-wide py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8 rounded-lg overflow-hidden">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-auto"
              />
            </div>
            
            <article className="prose max-w-none lg:prose-lg mb-8" dangerouslySetInnerHTML={{ __html: post.content }}></article>
            
            {/* Author Bio */}
            <div className="bg-gray-100 p-6 rounded-lg flex items-center gap-6 mt-12">
              <Avatar className="h-16 w-16">
                <AvatarImage src={post.authorImg} />
                <AvatarFallback className="bg-sawmill-medium-brown text-white">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-lg">{post.author}</h3>
                <p className="text-sm text-muted-foreground">{post.authorTitle}</p>
                <p className="mt-2">Mike has over 20 years of experience in the lumber industry and leads our milling operations.</p>
              </div>
            </div>
            
            {/* Post Navigation */}
            <div className="flex justify-between mt-12 border-t border-b py-4">
              <Button variant="ghost" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Post
              </Button>
              <Button variant="ghost" className="flex items-center">
                Next Post
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Related Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Related Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {post.relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="flex gap-4 hover:text-sawmill-dark-brown transition-colors">
                    <div className="w-20 h-16 flex-shrink-0">
                      <img 
                        src={relatedPost.imageUrl} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium line-clamp-2">{relatedPost.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{formatDate(relatedPost.date)}</p>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
            
            {/* Call to Action */}
            <Card className="bg-sawmill-dark-brown text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-4">Need Custom Milling?</h3>
                <p className="mb-6">Contact us today to discuss your custom lumber needs or to request a quote.</p>
                <Button className="w-full bg-white text-sawmill-dark-brown hover:bg-sawmill-light-brown hover:text-sawmill-dark-brown">
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
