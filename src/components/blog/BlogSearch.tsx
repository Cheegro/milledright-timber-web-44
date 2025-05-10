
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BlogSearch: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Search</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button className="absolute right-3 top-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogSearch;
