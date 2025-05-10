
import React from 'react';

const BlogHeader: React.FC = () => {
  return (
    <div className="bg-sawmill-dark-brown py-12">
      <div className="container-wide">
        <h1 className="text-4xl font-bold text-white mb-4">Blog</h1>
        <p className="text-sawmill-light-brown text-lg">
          Insights, tips, and stories from the world of sawmills and woodworking
        </p>
      </div>
    </div>
  );
};

export default BlogHeader;
