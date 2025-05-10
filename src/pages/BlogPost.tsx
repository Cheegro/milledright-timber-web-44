
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock blog data - in a real app this would come from an API
const blogPosts = [
  {
    id: 1,
    title: "Selecting the Right Wood for Your Project",
    excerpt: "Learn how to choose the perfect type of wood for any woodworking project based on durability, appearance, and budget.",
    content: `<p>Choosing the right wood for your project is crucial to its success and longevity. Different woods have different properties that make them suitable for specific applications.</p>
              <h2>Hardwoods vs. Softwoods</h2>
              <p>Hardwoods come from deciduous trees (those that lose their leaves annually) and generally offer better durability and a more refined look. Oak, maple, cherry, and walnut are popular hardwood choices. Softwoods come from coniferous trees (typically evergreens) and are generally less expensive, lighter, and easier to work with. Pine, cedar, and fir are common softwoods.</p>
              <h2>Consider These Factors</h2>
              <ul>
                <li><strong>Durability:</strong> For outdoor projects or pieces that will see heavy use, opt for naturally rot-resistant woods like cedar, redwood, or white oak.</li>
                <li><strong>Appearance:</strong> Think about grain pattern, color, and how the wood will age. Some woods like cherry will darken over time, while others like maple remain relatively stable.</li>
                <li><strong>Workability:</strong> Some woods are easier to cut, shape, and sand than others. If you're a beginner, pine or poplar might be more forgiving.</li>
                <li><strong>Budget:</strong> Prices vary widely. Pine is usually the most affordable, while exotic hardwoods can be quite expensive.</li>
              </ul>
              <p>At MilledRight Sawmill, we can help you select the perfect wood species for your specific project needs. Visit our yard to see and feel the different options available!</p>`,
    date: "2025-04-22",
    author: "Mike Johnson",
    category: "Tips & Tricks",
    imageUrl: "public/lovable-uploads/15c1d1dd-4743-4437-9885-f0a252905680.png",
    tags: ["Woodworking", "Material Selection", "Beginner Tips"]
  },
  {
    id: 2,
    title: "Understanding Wood Moisture Content",
    excerpt: "Why moisture content matters in lumber and how it affects your woodworking projects in both the short and long term.",
    content: `<p>Moisture content is perhaps the most critical factor in woodworking success yet is often overlooked by beginners and even experienced craftspeople.</p>
              <h2>What is Moisture Content?</h2>
              <p>Simply put, moisture content (MC) is the weight of water in wood expressed as a percentage of the wood's oven-dry weight. Fresh-cut lumber can have an MC of 30% or higher, while properly kiln-dried lumber typically has an MC of 6-8%.</p>
              <h2>Why It Matters</h2>
              <p>Wood is hygroscopic, meaning it will absorb or release moisture until it reaches equilibrium with the surrounding environment. This movement of moisture causes wood to expand or contract, potentially leading to:</p>
              <ul>
                <li>Warping, cupping, or twisting</li>
                <li>Splitting or checking</li>
                <li>Joint failure</li>
                <li>Finish issues</li>
              </ul>
              <h2>Best Practices</h2>
              <p>Here are some tips for managing moisture content:</p>
              <ol>
                <li>Always use a moisture meter to check your lumber before purchasing and using it</li>
                <li>Allow wood to acclimate to your workshop for at least one week before use</li>
                <li>For projects meant for indoor use, aim for lumber with 6-8% MC</li>
                <li>For outdoor projects, 12-15% MC is acceptable</li>
                <li>Store lumber properly, stacked with stickers between layers to allow airflow</li>
              </ol>
              <p>At MilledRight Sawmill, we carefully dry and monitor our lumber to ensure it's at the appropriate moisture content for your projects.</p>`,
    date: "2025-04-15",
    author: "Sarah Miller",
    category: "Education",
    imageUrl: "public/lovable-uploads/bc15c355-6ee0-46a0-abe2-a10542535a4e.png",
    tags: ["Wood Properties", "Moisture Management", "Technical"]
  },
  {
    id: 3,
    title: "The Advantages of Portable Sawmills",
    excerpt: "Discover why portable sawmills are revolutionizing small-scale lumber production and custom woodworking.",
    content: `<p>Portable sawmills have transformed the lumber industry, making it possible to process logs on-site without the need for expensive transportation and large industrial facilities.</p>
              <h2>What is a Portable Sawmill?</h2>
              <p>A portable sawmill is a sawmill that can be transported to the location of the logs, rather than having to transport logs to a stationary sawmill. These machines range from small manually operated models to sophisticated hydraulic mills with computer-controlled cutting systems.</p>
              <h2>Key Benefits</h2>
              <ul>
                <li><strong>Reduced Transportation Costs:</strong> By milling logs where they fall, you eliminate the need to transport large, heavy logs to a distant mill.</li>
                <li><strong>Less Waste:</strong> On-site milling allows you to use parts of trees that might otherwise be left behind as waste.</li>
                <li><strong>Custom Cutting:</strong> You can cut lumber to your exact specifications, including unusual sizes that might not be available commercially.</li>
                <li><strong>Sustainability:</strong> Portable mills can use trees that would otherwise go unused, such as those removed due to disease or urban development.</li>
                <li><strong>Economic Opportunity:</strong> They create opportunities for small-scale lumber production that wouldn't be feasible with traditional mills.</li>
              </ul>
              <h2>Our Portable Milling Service</h2>
              <p>At MilledRight Sawmill, we offer portable milling services throughout the region. Whether you have a single tree or several, we can come to your property and transform those logs into usable lumber. It's an excellent way to give new life to trees that might otherwise end up as firewood or mulch.</p>
              <p>Contact us today to learn more about our portable milling services and rates!</p>`,
    date: "2025-04-08",
    author: "Tom Wilson",
    category: "Equipment",
    imageUrl: "public/lovable-uploads/fbfcdde3-8d46-4da8-8058-04b6ba96bfc4.png",
    tags: ["Sawmill Equipment", "Portable Milling", "Services"]
  },
  {
    id: 4,
    title: "Sustainable Forestry Practices",
    excerpt: "How we ensure our lumber comes from responsibly managed forests and why it matters for the environment.",
    content: `<p>Sustainable forestry is at the heart of our operation at MilledRight Sawmill. We believe that responsible forest management is not just good for the environment—it's essential for the long-term viability of our business and industry.</p>
              <h2>What is Sustainable Forestry?</h2>
              <p>Sustainable forestry involves managing forest resources in a way that meets current needs while ensuring those resources remain viable for future generations. It balances economic considerations with environmental and social responsibilities.</p>
              <h2>Our Practices</h2>
              <p>Here's how we implement sustainable forestry in our operations:</p>
              <ul>
                <li><strong>Selective Harvesting:</strong> Rather than clear-cutting, we selectively harvest trees based on age, size, and species, maintaining forest diversity and structure.</li>
                <li><strong>Responsible Sourcing:</strong> We work with landowners who practice sustainable forestry and prioritize locally sourced timber to reduce transportation emissions.</li>
                <li><strong>Minimizing Waste:</strong> We utilize as much of each log as possible, converting "waste" into products like firewood, mulch, and biomass fuel.</li>
                <li><strong>Reforestation:</strong> We support and participate in reforestation efforts, ensuring that harvested areas are replanted with native species.</li>
                <li><strong>Ecosystem Protection:</strong> We identify and protect sensitive habitats, waterways, and wildlife corridors in harvesting operations.</li>
              </ul>
              <h2>Why It Matters</h2>
              <p>Sustainable forestry practices provide numerous benefits:</p>
              <ul>
                <li>Maintaining biodiversity and ecosystem health</li>
                <li>Ensuring continued carbon sequestration</li>
                <li>Protecting water quality and reducing soil erosion</li>
                <li>Providing sustainable livelihoods for rural communities</li>
                <li>Ensuring a continuous supply of high-quality timber</li>
              </ul>
              <p>By choosing lumber from MilledRight Sawmill, you're supporting responsible forest management practices that help protect our natural resources for future generations.</p>`,
    date: "2025-03-30",
    author: "Lisa Green",
    category: "Sustainability",
    imageUrl: "public/lovable-uploads/20824b3a-95ce-47ff-895d-b19f775386b0.png",
    tags: ["Sustainability", "Environmental", "Forest Management"]
  },
  {
    id: 5,
    title: "Working with Live Edge Slabs",
    excerpt: "Tips and techniques for incorporating the natural beauty of live edge wood into your furniture projects.",
    content: `<p>Live edge woodworking has surged in popularity, and for good reason. The natural, organic lines of a live edge slab add character and uniqueness to any project.</p>
              <h2>What is Live Edge Wood?</h2>
              <p>Live edge refers to lumber where at least one edge remains in its natural state, preserving the original shape of the tree trunk. This includes the natural edge of the wood, often with the bark either intact or removed while maintaining the natural profile.</p>
              <h2>Selecting Your Slab</h2>
              <p>When choosing a live edge slab, consider:</p>
              <ul>
                <li><strong>Species:</strong> Different wood species offer varying grain patterns, colors, and stability.</li>
                <li><strong>Moisture Content:</strong> Ensure your slab is properly dried to 6-8% for indoor use to prevent warping.</li>
                <li><strong>Shape and Character:</strong> Look for interesting grain patterns, colorful heartwood/sapwood contrasts, and natural features like burls or spalting.</li>
                <li><strong>Stability:</strong> Check for existing cracks and assess whether they're stable or likely to expand.</li>
              </ul>
              <h2>Working with Live Edge</h2>
              <ol>
                <li><strong>Flattening:</strong> Most slabs need flattening with a router sled or large thickness planer.</li>
                <li><strong>Filling Cracks:</strong> Stabilize cracks with epoxy resin, often tinted with complementary or contrasting colors.</li>
                <li><strong>Bark Decisions:</strong> Decide whether to keep or remove bark based on the look you want and the bark's stability.</li>
                <li><strong>Sanding:</strong> Progress through grits from 80 to at least 220 for furniture applications.</li>
                <li><strong>Finishing:</strong> Oil-based finishes like tung oil or osmo-polyx enhance the natural beauty of the wood.</li>
              </ol>
              <h2>Popular Live Edge Projects</h2>
              <ul>
                <li>Dining and coffee tables</li>
                <li>Bar tops and counters</li>
                <li>Floating shelves</li>
                <li>Bench seats</li>
                <li>Headboards</li>
                <li>Mantels</li>
              </ul>
              <p>Visit MilledRight Sawmill to view our extensive selection of live edge slabs in various species, sizes, and price points. We can even help you select the perfect piece for your specific project!</p>`,
    date: "2025-03-21",
    author: "Chris Taylor",
    category: "Projects",
    imageUrl: "public/lovable-uploads/3c7d6dd1-8b41-4a54-abd5-a29423098810.png",
    tags: ["Live Edge", "Furniture Making", "Premium Products"]
  },
];

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  
  useEffect(() => {
    // Find the current post
    const currentPost = blogPosts.find(post => post.id === Number(id));
    setPost(currentPost);
    
    // Find related posts (same category, excluding current post)
    if (currentPost) {
      const related = blogPosts
        .filter(p => p.category === currentPost.category && p.id !== currentPost.id)
        .slice(0, 2);
      setRelatedPosts(related);
    }
  }, [id]);
  
  if (!post) {
    return (
      <div className="container-wide py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
        <Button asChild>
          <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] bg-gray-900">
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.imageUrl})` }}
        ></div>
        <div className="container-wide relative z-10 h-full flex items-end pb-8">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-sawmill-orange">{post.category}</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 text-shadow">
              {post.title}
            </h1>
            <div className="flex items-center text-white">
              <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
              <span className="mx-2">•</span>
              <span>By {post.author}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container-wide py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Back to Blog Link */}
            <Button variant="ghost" className="mb-6" asChild>
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
            
            {/* Article Content */}
            <article className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
            
            {/* Tags */}
            <div className="mt-8">
              <h3 className="font-medium mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="bg-gray-100">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <aside>
            {/* Author */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="font-bold text-lg mb-2">About the Author</h3>
              <p className="text-muted-foreground">
                {post.author} is an experienced woodworker and lumber specialist with over 15 years in the industry.
              </p>
            </div>
            
            {/* Related Posts */}
            <div>
              <h3 className="font-bold text-lg mb-4">Related Articles</h3>
              <div className="space-y-6">
                {relatedPosts.map(related => (
                  <Card key={related.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <Link to={`/blog/${related.id}`}>
                      <div className="h-36 overflow-hidden">
                        <img 
                          src={related.imageUrl} 
                          alt={related.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-medium hover:text-sawmill-dark-brown transition-colors">
                          {related.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {format(new Date(related.date), 'MMMM d, yyyy')}
                        </p>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
