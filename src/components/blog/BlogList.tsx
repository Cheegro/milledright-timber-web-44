
import React from 'react';
import BlogCard from './BlogCard';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date?: string;
  published_at?: string; 
  author: string;
  category?: string;
  imageUrl?: string;
  image_url?: string;
}

interface BlogListProps {
  posts: BlogPost[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;
