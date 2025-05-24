
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import {
  Home,
  Package,
  FileText,
  Image,
  Star,
  Settings,
  LogOut,
  PanelLeft,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminSidebar = () => {
  const { logout } = useAdminAuth();
  const { isOpen, toggle } = useSidebar();
  const location = useLocation();

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      path: "/admin",
    },
    {
      title: "Products",
      icon: <Package className="h-5 w-5" />,
      path: "/admin/products",
    },
    {
      title: "Blog",
      icon: <FileText className="h-5 w-5" />,
      path: "/admin/blog",
    },
    {
      title: "Gallery",
      icon: <Image className="h-5 w-5" />,
      path: "/admin/gallery",
    },
    {
      title: "Projects",
      icon: <Workflow className="h-5 w-5" />,
      path: "/admin/projects",
    },
    {
      title: "Reviews",
      icon: <Star className="h-5 w-5" />,
      path: "/admin/reviews",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/admin/settings",
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || 
           (path !== "/admin" && location.pathname.startsWith(path));
  };

  return (
    <Sidebar className="border-r z-20 bg-background">
      <div className="p-3 h-16 flex items-center border-b">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-xl">MilledRight</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={toggle} className="ml-auto">
          <PanelLeft className={cn("h-4 w-4 transition-transform", !isOpen && "rotate-180")} />
        </Button>
      </div>
      
      <div className="flex flex-col gap-1 p-3">
        {sidebarItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
              isActive(item.path)
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
            )}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
      
      <div className="p-3 mt-auto border-t">
        <button
          onClick={logout}
          className="flex items-center w-full gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </Sidebar>
  );
};

export default AdminSidebar;
