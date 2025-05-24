
import React from 'react';
import { Input } from '@/components/ui/input';

interface BlogHeaderProps {
  title?: string;
  description?: string;
  headingLevel?: 'h1' | 'h2' | 'h3';
  showSearch?: boolean;
  searchQuery?: string;
  onSearch?: (query: string) => void;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({
  title = 'Blog',
  description = 'Insights, tips, and stories from the world of sawmills and woodworking',
  headingLevel = 'h1',
  showSearch = false,
  searchQuery = '',
  onSearch
}) => {
  const HeadingTag = headingLevel as keyof JSX.IntrinsicElements;
  
  return (
    <div className="space-y-4">
      <HeadingTag className={`font-bold ${headingLevel === 'h1' ? 'text-4xl' : 'text-3xl'}`}>
        {title}
      </HeadingTag>
      
      {description && (
        <p className="text-muted-foreground">
          {description}
        </p>
      )}
      
      {showSearch && onSearch && (
        <div className="mt-4">
          <Input
            type="search"
            placeholder="Search blog posts..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>
      )}
    </div>
  );
};

export default BlogHeader;
