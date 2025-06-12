import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { trackEnhancedPageView } from "@/utils/enhancedAnalytics";
import Analytics from "@/components/Analytics";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ProductsAdmin from "./pages/admin/ProductsAdmin";
import ProductFormPage from "./pages/admin/ProductFormPage";
import GalleryAdmin from "./pages/admin/GalleryAdmin";
import GalleryImageForm from "./pages/admin/GalleryImageForm";
import BlogAdmin from "./pages/admin/BlogAdmin";
import BlogPostEditor from "./pages/admin/BlogPostEditor";
import ReviewsAdmin from "./pages/admin/ReviewsAdmin";
import ReviewFormPage from "./pages/admin/ReviewFormPage";
import Settings from "./pages/admin/Settings";
import Login from "./pages/admin/Login";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Projects from "./pages/Projects";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import BoardFootCalculator from "./pages/BoardFootCalculator";

const routes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <ProductsAdmin />,
      },
      {
        path: "products/new",
        element: <ProductFormPage />,
      },
      {
        path: "products/:id/edit",
        element: <ProductFormPage />,
      },
      {
        path: "gallery",
        element: <GalleryAdmin />,
      },
      {
        path: "gallery/new",
        element: <GalleryImageForm />,
      },
      {
        path: "gallery/:id/edit",
        element: <GalleryImageForm />,
      },
      {
        path: "blog",
        element: <BlogAdmin />,
      },
      {
        path: "blog/new",
        element: <BlogPostEditor />,
      },
      {
        path: "blog/:id/edit",
        element: <BlogPostEditor />,
      },
      {
        path: "reviews",
        element: <ReviewsAdmin />,
      },
      {
        path: "reviews/new",
        element: <ReviewFormPage />,
      },
      {
        path: "reviews/:id/edit",
        element: <ReviewFormPage />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <ProductDetail />,
      },
      {
        path: "gallery",
        element: <Gallery />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog/:id",
        element: <BlogPost />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "board-foot-calculator",
        element: <BoardFootCalculator />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

const queryClient = new QueryClient();

function App() {
  // Initialize enhanced analytics tracking
  useEffect(() => {
    // Track initial page view with enhanced analytics
    trackEnhancedPageView();
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Analytics />
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element}>
                {route.children?.map((child) => (
                  <Route key={child.path} path={child.path} element={child.element} />
                ))}
              </Route>
            ))}
          </Routes>
          <Toaster />
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
