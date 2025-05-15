
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
  useSidebar
} from "@/components/ui/sidebar";
import { LayoutDashboard, Camera, BookOpen, Star, Users, Settings } from 'lucide-react';

const AdminSidebar = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={`${isCollapsed ? "w-16" : "w-64"} border-r min-h-screen transition-width duration-200`}>
      <div className="py-4">
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
                      {!isCollapsed && <span>Dashboard</span>}
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
                      {!isCollapsed && <span>Products</span>}
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
                      {!isCollapsed && <span>Blog</span>}
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
                      {!isCollapsed && <span>Gallery</span>}
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
                      {!isCollapsed && <span>Reviews</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to="/admin/settings"
                      className={({isActive}) => isActive ? "bg-muted text-primary font-medium flex items-center p-2 rounded-md w-full" : "flex items-center p-2 rounded-md w-full hover:bg-muted/50"}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      {!isCollapsed && <span>Settings</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </Sidebar>
  );
};

export default AdminSidebar;
