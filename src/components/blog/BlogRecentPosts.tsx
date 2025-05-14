
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface BlogPost {
  id: string | number;
  title: string;
  excerpt?: string;
  date?: string;
  published_at?: string;
  author?: string;
  category?: string;
  imageUrl?: string;
  image_url?: string;
}

interface BlogRecentPostsProps {
  posts: BlogPost[];
}

// Format the date in a nice readable format
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const BlogRecentPosts: React.FC<BlogRecentPostsProps> = ({ posts }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Posts</CardTitle>
      </CardHeader>
      <CardContent>
        {posts.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No recent posts</p>
        ) : (
          <ul className="space-y-4">
            {posts.slice(0, 3).map((post, index) => (
              <React.Fragment key={post.id}>
                <li>
                  <Link 
                    to={`/blog/${post.id}`}
                    className="flex gap-3 hover:text-sawmill-dark-brown transition-colors"
                  >
                    <div className="w-16 h-16 flex-shrink-0">
                      <img 
                        src={post.image_url || post.imageUrl} 
                        alt={post.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{post.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {(post.published_at || post.date) ? formatDate(post.published_at || post.date!) : "No date"}
                      </p>
                    </div>
                  </Link>
                </li>
                {index < Math.min(posts.length, 3) - 1 && (
                  <Separator className="my-4" />
                )}
              </React.Fragment>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default BlogRecentPosts;
