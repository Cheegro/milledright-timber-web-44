
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { LayoutDashboard, Camera, BookOpen, Star, Users } from 'lucide-react';

const AdminSidebar = () => {
  return (
    <Sidebar className="w-64 border-r min-h-screen">
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/admin" 
                    end
                    className={({isActive}) => isActive ? "bg-muted text-primary font-medium flex items-center p-2 rounded-md w-full" : "flex items-center p-2 rounded-md w-full hover:bg-muted/50"}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/admin/products"
                    className={({isActive}) => isActive ? "bg-muted text-primary font-medium flex items-center p-2 rounded-md w-full" : "flex items-center p-2 rounded-md w-full hover:bg-muted/50"}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    <span>Products</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/admin/blog"
                    className={({isActive}) => isActive ? "bg-muted text-primary font-medium flex items-center p-2 rounded-md w-full" : "flex items-center p-2 rounded-md w-full hover:bg-muted/50"}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>Blog</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/admin/gallery"
                    className={({isActive}) => isActive ? "bg-muted text-primary font-medium flex items-center p-2 rounded-md w-full" : "flex items-center p-2 rounded-md w-full hover:bg-muted/50"}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    <span>Gallery</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/admin/reviews"
                    className={({isActive}) => isActive ? "bg-muted text-primary font-medium flex items-center p-2 rounded-md w-full" : "flex items-center p-2 rounded-md w-full hover:bg-muted/50"}
                  >
                    <Star className="mr-2 h-4 w-4" />
                    <span>Reviews</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
