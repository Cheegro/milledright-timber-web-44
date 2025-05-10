
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Category {
  name: string;
  count: number;
}

interface BlogCategoriesProps {
  categories: Category[];
}

const BlogCategories: React.FC<BlogCategoriesProps> = ({ categories }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <React.Fragment key={category.name}>
              <li>
                <Link 
                  to={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex justify-between hover:text-sawmill-dark-brown transition-colors"
                >
                  <span>{category.name}</span>
                  <span className="text-muted-foreground">{category.count}</span>
                </Link>
              </li>
              {index < categories.length - 1 && (
                <Separator className="my-2" />
              )}
            </React.Fragment>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default BlogCategories;
