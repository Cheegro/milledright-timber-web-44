
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import AdminLayout from "./layouts/AdminLayout";

// Main Website Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import ProductsAdmin from "./pages/admin/ProductsAdmin";
import BlogAdmin from "./pages/admin/BlogAdmin";
import GalleryAdmin from "./pages/admin/GalleryAdmin";
import ReviewsAdmin from "./pages/admin/ReviewsAdmin";

const queryClient = new QueryClient();

const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Website Routes */}
          <Route 
            path="/" 
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            } 
          />
          <Route 
            path="/products" 
            element={
              <MainLayout>
                <Products />
              </MainLayout>
            } 
          />
          <Route 
            path="/products/:id" 
            element={
              <MainLayout>
                <ProductDetail />
              </MainLayout>
            } 
          />
          <Route 
            path="/gallery" 
            element={
              <MainLayout>
                <Gallery />
              </MainLayout>
            } 
          />
          <Route 
            path="/blog" 
            element={
              <MainLayout>
                <Blog />
              </MainLayout>
            } 
          />
          <Route 
            path="/blog/:id" 
            element={
              <MainLayout>
                <BlogPost />
              </MainLayout>
            } 
          />
          <Route 
            path="/about" 
            element={
              <MainLayout>
                <About />
              </MainLayout>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <MainLayout>
                <Contact />
              </MainLayout>
            } 
          />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="blog" element={<BlogAdmin />} />
            <Route path="gallery" element={<GalleryAdmin />} />
            <Route path="reviews" element={<ReviewsAdmin />} />
            {/* Future Admin Routes */}
            {/* <Route path="products/:id/edit" element={<ProductEditForm />} /> */}
            {/* <Route path="products/new" element={<ProductNewForm />} /> */}
            {/* <Route path="blog/:id/edit" element={<BlogEditForm />} /> */}
            {/* <Route path="blog/new" element={<BlogNewForm />} /> */}
            {/* <Route path="gallery/:id/edit" element={<GalleryEditForm />} /> */}
            {/* <Route path="gallery/new" element={<GalleryNewForm />} /> */}
            {/* <Route path="reviews/:id/edit" element={<ReviewEditForm />} /> */}
            {/* <Route path="reviews/new" element={<ReviewNewForm />} /> */}
            {/* <Route path="settings" element={<Settings />} /> */}
            {/* <Route path="users" element={<Users />} /> */}
          </Route>
          
          {/* 404 Page */}
          <Route path="*" element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
