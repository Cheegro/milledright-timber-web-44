
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
}

interface BlogCardProps {
  post: BlogPost;
}

// Format the date in a nice readable format
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/blog/${post.id}`}>
        <div className="h-48 overflow-hidden">
          <img 
            src={post.imageUrl} 
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
          <span>{formatDate(post.date)}</span>
          <span>By {post.author}</span>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default BlogCard;
