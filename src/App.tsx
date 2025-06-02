
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { HelmetProvider } from 'react-helmet-async';

// Regular pages
import Index from '@/pages/Index';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import Projects from '@/pages/Projects';
import Gallery from '@/pages/Gallery';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import Reviews from '@/pages/Reviews';
import NotFound from '@/pages/NotFound';

// Admin pages
import AdminLayout from '@/layouts/AdminLayout';
import Login from '@/pages/admin/Login';
import Dashboard from '@/pages/admin/Dashboard';
import ProductsAdmin from '@/pages/admin/ProductsAdmin';
import ProductFormPage from '@/pages/admin/ProductFormPage';
import ProjectsAdmin from '@/pages/admin/ProjectsAdmin';
import ProjectFormPage from '@/pages/admin/ProjectFormPage';
import GalleryAdmin from '@/pages/admin/GalleryAdmin';
import GalleryImageForm from '@/pages/admin/GalleryImageForm';
import BulkGalleryUploadPage from '@/pages/admin/BulkGalleryUploadPage';
import TestimonialsAdmin from '@/pages/admin/TestimonialsAdmin';
import ReviewsAdmin from '@/pages/admin/ReviewsAdmin';
import ReviewDetail from '@/pages/admin/ReviewDetail';
import ReviewFormPage from '@/pages/admin/ReviewFormPage';
import CustomerPipeline from '@/pages/admin/CustomerPipeline';
import BlogAdmin from '@/pages/admin/BlogAdmin';
import BlogPostEditor from '@/pages/admin/BlogPostEditor';
import WoodSpeciesAdmin from '@/pages/admin/WoodSpeciesAdmin';
import LogStockAdmin from '@/pages/admin/LogStockAdmin';
import Settings from '@/pages/admin/Settings';

import Analytics from '@/components/Analytics';

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Analytics />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/reviews" element={<Reviews />} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<ProductsAdmin />} />
              <Route path="products/new" element={<ProductFormPage />} />
              <Route path="products/:id/edit" element={<ProductFormPage />} />
              <Route path="projects" element={<ProjectsAdmin />} />
              <Route path="projects/new" element={<ProjectFormPage />} />
              <Route path="projects/:id/edit" element={<ProjectFormPage />} />
              <Route path="gallery" element={<GalleryAdmin />} />
              <Route path="gallery/new" element={<GalleryImageForm />} />
              <Route path="gallery/bulk-upload" element={<BulkGalleryUploadPage />} />
              <Route path="gallery/:id/edit" element={<GalleryImageForm />} />
              <Route path="testimonials" element={<TestimonialsAdmin />} />
              <Route path="reviews" element={<ReviewsAdmin />} />
              <Route path="reviews/:id" element={<ReviewDetail />} />
              <Route path="reviews/:id/edit" element={<ReviewFormPage />} />
              <Route path="customers" element={<CustomerPipeline />} />
              <Route path="blog" element={<BlogAdmin />} />
              <Route path="blog/new" element={<BlogPostEditor />} />
              <Route path="blog/:id/edit" element={<BlogPostEditor />} />
              <Route path="wood-species" element={<WoodSpeciesAdmin />} />
              <Route path="log-stock" element={<LogStockAdmin />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* 404 catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
