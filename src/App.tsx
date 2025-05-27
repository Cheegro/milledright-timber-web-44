import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

// Layouts
import AdminLayout from "@/layouts/AdminLayout";

// Public Pages
import Index from "@/pages/Index";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Projects from "@/pages/Projects";
import Gallery from "@/pages/Gallery";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Reviews from "@/pages/Reviews";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

// Admin Pages
import Login from "@/pages/admin/Login";
import Dashboard from "@/pages/admin/Dashboard";
import ProductsAdmin from "@/pages/admin/ProductsAdmin";
import ProjectsAdmin from "@/pages/admin/ProjectsAdmin";
import BlogAdmin from "@/pages/admin/BlogAdmin";
import BlogPostEditor from "@/pages/admin/BlogPostEditor";
import GalleryAdmin from "@/pages/admin/GalleryAdmin";
import GalleryImageForm from "@/pages/admin/GalleryImageForm";
import ReviewsAdmin from "@/pages/admin/ReviewsAdmin";
import ReviewDetail from "@/pages/admin/ReviewDetail";
import Settings from "@/pages/admin/Settings";
import WoodSpeciesAdmin from "@/pages/admin/WoodSpeciesAdmin";
import LogStockAdmin from "@/pages/admin/LogStockAdmin";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="wood-species" element={<WoodSpeciesAdmin />} />
            <Route path="log-stock" element={<LogStockAdmin />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="projects" element={<ProjectsAdmin />} />
            <Route path="blog" element={<BlogAdmin />} />
            <Route path="blog/new" element={<BlogPostEditor />} />
            <Route path="blog/edit/:id" element={<BlogPostEditor />} />
            <Route path="gallery" element={<GalleryAdmin />} />
            <Route path="gallery/new" element={<GalleryImageForm />} />
            <Route path="gallery/edit/:id" element={<GalleryImageForm />} />
            <Route path="reviews" element={<ReviewsAdmin />} />
            <Route path="reviews/:id" element={<ReviewDetail />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
