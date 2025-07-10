
import { BlogPost, DatabaseBlogPost } from './types';

// Helper function to map database response to BlogPost
export function mapDbPostToBlogPost(post: DatabaseBlogPost): BlogPost {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.content,
    excerpt: post.excerpt || "",
    category_id: post.category_id,
    status: post.status || "draft",
    author: post.author,
    author_name: post.author_name,
    is_published: post.is_published || false,
    published_at: post.published_at,
    featured_image_url: post.image_url || null,
    image_url: post.image_url || null,
    created_at: post.created_at || "",
    updated_at: post.updated_at || "",
    category_name: post.blog_categories?.name
  };
}
