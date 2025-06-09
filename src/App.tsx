import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { trackPageView } from "@/utils/analytics";
import Analytics from "@/components/Analytics";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import EditProduct from "./pages/admin/EditProduct";
import NewProduct from "./pages/admin/NewProduct";
import Gallery from "./pages/admin/Gallery";
import NewGalleryImage from "./pages/admin/NewGalleryImage";
import EditGalleryImage from "./pages/admin/EditGalleryImage";
import Blog from "./pages/admin/Blog";
import NewBlogPost from "./pages/admin/NewBlogPost";
import EditBlogPost from "./pages/admin/EditBlogPost";
import Reviews from "./pages/admin/Reviews";
import NewReview from "./pages/admin/NewReview";
import EditReview from "./pages/admin/EditReview";
import Settings from "./pages/admin/Settings";
import Login from "./pages/admin/Login";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";
import GalleryPage from "./pages/GalleryPage";
import BlogPage from "./pages/BlogPage";
import BlogPost from "./pages/BlogPost";
import ProjectsPage from "./pages/ProjectsPage";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import BoardFootCalculatorPage from "./pages/BoardFootCalculator";

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
        element: <Products />,
      },
      {
        path: "products/new",
        element: <NewProduct />,
      },
      {
        path: "products/:id/edit",
        element: <EditProduct />,
      },
      {
        path: "gallery",
        element: <Gallery />,
      },
      {
        path: "gallery/new",
        element: <NewGalleryImage />,
      },
      {
        path: "gallery/:id/edit",
        element: <EditGalleryImage />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog/new",
        element: <NewBlogPost />,
      },
      {
        path: "blog/:id/edit",
        element: <EditBlogPost />,
      },
      {
        path: "reviews",
        element: <Reviews />,
      },
      {
        path: "reviews/new",
        element: <NewReview />,
      },
      {
        path: "reviews/:id/edit",
        element: <EditReview />,
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
        element: <ProductsPage />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
      {
        path: "gallery",
        element: <GalleryPage />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
      {
        path: "blog/:id",
        element: <BlogPost />,
      },
      {
        path: "projects",
        element: <ProjectsPage />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "board-foot-calculator",
        element: <BoardFootCalculatorPage />,
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
  // Initialize analytics tracking
  useEffect(() => {
    // Track initial page view
    trackPageView();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Analytics />
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
