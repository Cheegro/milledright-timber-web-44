
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

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
    <div className="bg-gradient-to-r from-sawmill-dark-brown to-sawmill-medium-brown text-white">
      <div className="container-wide py-12 md:py-16">
        <div className="text-center space-y-4">
          <HeadingTag className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {title}
          </HeadingTag>
          
          {description && (
            <p className="text-lg md:text-xl text-sawmill-light-brown max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
          
          {showSearch && onSearch && (
            <div className="mt-8 max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search blog posts..."
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
