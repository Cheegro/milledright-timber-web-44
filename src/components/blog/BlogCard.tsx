
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BlogPost {
  id: string | number;
  title: string;
  excerpt: string;
  date?: string;
  published_at?: string;
  author: string;
  category?: string;
  imageUrl?: string;
  image_url?: string;
}

interface BlogCardProps {
  post: BlogPost;
  isAdmin?: boolean; // Add isAdmin prop
}

// Format the date in a nice readable format
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const BlogCard: React.FC<BlogCardProps> = ({ post, isAdmin = false }) => {
  // Handle both mock data and Supabase data structures
  const imageUrl = post.image_url || post.imageUrl;
  const date = post.published_at || post.date;
  const linkPath = isAdmin ? `/admin/blog/${post.id}/edit` : `/blog/${post.id}`;
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={linkPath}>
        <div className="h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardHeader>
          <Badge className="w-fit mb-2 bg-sawmill-medium-brown hover:bg-sawmill-dark-brown">{post.category}</Badge>
          <CardTitle className="hover:text-sawmill-dark-brown transition-colors">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground flex justify-between">
          <span>{date ? formatDate(date) : "No date"}</span>
          <span>By {post.author}</span>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default BlogCard;
