
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export interface Category {
  id: string;
  name: string;
  count: number;
}

export interface BlogCategoriesProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onCategoryClick: (categoryId: string | null) => void;
  showAllLink?: boolean;
  isLoading?: boolean;
}

const BlogCategories: React.FC<BlogCategoriesProps> = ({
  categories,
  selectedCategoryId,
  onCategoryClick,
  showAllLink = true,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="space-y-2">
        <h3 className="text-lg font-medium mb-3">Categories</h3>
        {Array(5).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium mb-3">Categories</h3>
      
      {showAllLink && (
        <Button
          variant="ghost"
          className={cn(
            "justify-start px-2 w-full font-normal",
            selectedCategoryId === null && "bg-muted"
          )}
          onClick={() => onCategoryClick(null)}
        >
          All Posts
          <span className="ml-auto text-muted-foreground">
            {categories.reduce((sum, cat) => sum + cat.count, 0)}
          </span>
        </Button>
      )}
      
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="ghost"
          className={cn(
            "justify-start px-2 w-full font-normal",
            selectedCategoryId === category.id && "bg-muted"
          )}
          onClick={() => onCategoryClick(category.id)}
        >
          {category.name}
          <span className="ml-auto text-muted-foreground">
            {category.count}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default BlogCategories;
