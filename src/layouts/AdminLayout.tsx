
import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import AuthWrapper from "@/components/admin/AuthWrapper";

const AdminLayout = () => {
  return (
    <AuthWrapper>
      <SidebarProvider defaultOpen={true}>
        <div className="min-h-screen flex w-full">
          <AdminSidebar />
          <div className="flex-1 flex flex-col">
            <AdminHeader />
            <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </AuthWrapper>
  );
};

export default AdminLayout;
