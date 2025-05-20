
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
import SharedBanner from "./components/SharedBanner";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ProductsAdmin from "./pages/admin/ProductsAdmin";
import ProductForm from "./components/admin/ProductForm";
import BlogAdmin from "./pages/admin/BlogAdmin";
import BlogPostEditor from "./pages/admin/BlogPostEditor";
import GalleryAdmin from "./pages/admin/GalleryAdmin";
import GalleryImageForm from "./pages/admin/GalleryImageForm";
import ReviewsAdmin from "./pages/admin/ReviewsAdmin";
import ReviewDetail from "./pages/admin/ReviewDetail";
import Settings from "./pages/admin/Settings";
import ReviewForm from "./components/admin/ReviewForm";

const queryClient = new QueryClient();

const MainLayout = ({ children, hideBanner = false }: { children: React.ReactNode, hideBanner?: boolean }) => (
  <>
    <Header />
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {children}
      </div>
      {!hideBanner && <SharedBanner variant="compact" />}
      <Footer />
    </div>
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
              <MainLayout hideBanner={true}>
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
          
          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="blog" element={<BlogAdmin />} />
            <Route path="gallery" element={<GalleryAdmin />} />
            <Route path="gallery/new" element={<GalleryImageForm />} />
            <Route path="gallery/:id/edit" element={<GalleryImageForm />} />
            <Route path="reviews" element={<ReviewsAdmin />} />
            <Route path="settings" element={<Settings />} />
            {/* Product Admin Routes */}
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/:id/edit" element={<ProductForm />} />
            {/* Blog Admin Routes */}
            <Route path="blog/new" element={<BlogPostEditor />} />
            <Route path="blog/:id/edit" element={<BlogPostEditor />} />
            {/* Review Admin Routes */}
            <Route path="reviews" element={<ReviewsAdmin />} />
            <Route path="reviews/new" element={<ReviewForm />} />
            <Route path="reviews/:id/edit" element={<ReviewForm />} />
            <Route path="reviews/:id/detail" element={<ReviewDetail />} />
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
