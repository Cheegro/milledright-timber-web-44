import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchRecentBlogPosts } from '@/api/blogApi';
const BlogPostsSection = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadRecentPosts() {
      const recentPosts = await fetchRecentBlogPosts(3);
      setPosts(recentPosts);
      setLoading(false);
    }
    loadRecentPosts();
  }, []);

  // Format the date in a nice readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  return <section className="py-16">
      
    </section>;
};
export default BlogPostsSection;