import { Home, Package, FolderOpen, Star, Settings, BookOpen, TreePine, Archive, Users, MessageSquare, Quote, BarChart3 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: Home,
    },
    {
      title: "Wood Species",
      url: "/admin/wood-species",
      icon: TreePine,
    },
    {
      title: "Log Stock",
      url: "/admin/log-stock", 
      icon: Archive,
    },
    {
      title: "Products",
      url: "/admin/products",
      icon: Package,
    },
    {
      title: "Projects",
      url: "/admin/projects",
      icon: FolderOpen,
    },
    {
      title: "Blog Posts",
      url: "/admin/blog",
      icon: BookOpen,
    },
    {
      title: "Gallery",
      url: "/admin/gallery",
      icon: FolderOpen,
    },
    {
      title: "Reviews",
      url: "/admin/reviews",
      icon: Star,
    },
    {
      title: "Testimonials",
      url: "/admin/testimonials",
      icon: Quote,
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: BarChart3,
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>MilledRight Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
