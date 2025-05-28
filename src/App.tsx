
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

// Layouts
import AdminLayout from "@/layouts/AdminLayout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Public Pages
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
import TestimonialsAdmin from "@/pages/admin/TestimonialsAdmin";
import Settings from "@/pages/admin/Settings";
import WoodSpeciesAdmin from "@/pages/admin/WoodSpeciesAdmin";
import LogStockAdmin from "@/pages/admin/LogStockAdmin";

const queryClient = new QueryClient();

// Layout wrapper for public pages
const PublicPageLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      {children}
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public Routes with Header/Footer */}
          <Route path="/" element={<PublicPageLayout><Home /></PublicPageLayout>} />
          <Route path="/home" element={<PublicPageLayout><Home /></PublicPageLayout>} />
          <Route path="/about" element={<PublicPageLayout><About /></PublicPageLayout>} />
          <Route path="/products" element={<PublicPageLayout><Products /></PublicPageLayout>} />
          <Route path="/products/:id" element={<PublicPageLayout><ProductDetail /></PublicPageLayout>} />
          <Route path="/projects" element={<PublicPageLayout><Projects /></PublicPageLayout>} />
          <Route path="/gallery" element={<PublicPageLayout><Gallery /></PublicPageLayout>} />
          <Route path="/blog" element={<PublicPageLayout><Blog /></PublicPageLayout>} />
          <Route path="/blog/:slug" element={<PublicPageLayout><BlogPost /></PublicPageLayout>} />
          <Route path="/reviews" element={<PublicPageLayout><Reviews /></PublicPageLayout>} />
          <Route path="/contact" element={<PublicPageLayout><Contact /></PublicPageLayout>} />

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
            <Route path="testimonials" element={<TestimonialsAdmin />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<PublicPageLayout><NotFound /></PublicPageLayout>} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
