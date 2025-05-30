
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProductsAdmin from './pages/admin/ProductsAdmin';
import ProjectsAdmin from './pages/admin/ProjectsAdmin';
import BlogAdmin from './pages/admin/BlogAdmin';
import BlogPostEditor from './pages/admin/BlogPostEditor';
import GalleryAdmin from './pages/admin/GalleryAdmin';
import GalleryImageForm from './pages/admin/GalleryImageForm';
import ReviewsAdmin from './pages/admin/ReviewsAdmin';
import ReviewDetail from './pages/admin/ReviewDetail';
import TestimonialsAdmin from './pages/admin/TestimonialsAdmin';
import LogStockAdmin from './pages/admin/LogStockAdmin';
import WoodSpeciesAdmin from './pages/admin/WoodSpeciesAdmin';
import Settings from './pages/admin/Settings';
import { Toaster } from "@/components/ui/toaster"

import ProductFormPage from './pages/admin/ProductFormPage';
import ProjectFormPage from './pages/admin/ProjectFormPage';
import ReviewFormPage from './pages/admin/ReviewFormPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              
              {/* Admin Login Route - Outside of AdminLayout */}
              <Route path="/admin/login" element={<AdminLogin />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<ProductsAdmin />} />
                <Route path="products/new" element={<ProductFormPage />} />
                <Route path="products/:id/edit" element={<ProductFormPage />} />
                <Route path="projects" element={<ProjectsAdmin />} />
                <Route path="projects/new" element={<ProjectFormPage />} />
                <Route path="projects/:id/edit" element={<ProjectFormPage />} />
                <Route path="blog" element={<BlogAdmin />} />
                <Route path="blog/new" element={<BlogPostEditor />} />
                <Route path="blog/:id/edit" element={<BlogPostEditor />} />
                <Route path="gallery" element={<GalleryAdmin />} />
                <Route path="gallery/new" element={<GalleryImageForm />} />
                <Route path="gallery/:id/edit" element={<GalleryImageForm />} />
                <Route path="reviews" element={<ReviewsAdmin />} />
                <Route path="reviews/new" element={<ReviewFormPage />} />
                <Route path="reviews/:id" element={<ReviewDetail />} />
                <Route path="reviews/:id/edit" element={<ReviewFormPage />} />
                <Route path="testimonials" element={<TestimonialsAdmin />} />
                <Route path="log-stock" element={<LogStockAdmin />} />
                <Route path="wood-species" element={<WoodSpeciesAdmin />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
