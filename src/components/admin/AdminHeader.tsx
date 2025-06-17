import React from 'react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { User, LogOut } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
const AdminHeader = () => {
  const {
    logout
  } = useAdminAuth();
  return <header className="bg-white border-b border-gray-200 py-4 px-6 flex-shrink-0 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="h-9 w-9 text-zinc-950 bg-cyan-300 hover:bg-cyan-200" />
          <div>
            <h1 className="text-xl font-bold text-sawmill-dark-brown text-gray-950">MilledRight Admin</h1>
            <p className="text-sm text-gray-600">Content Management System</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-gray-700">
            <User className="h-4 w-4 mr-2" />
            <span>Admin User</span>
          </Button>
          
          <Button variant="ghost" size="sm" onClick={logout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="h-4 w-4 mr-2" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </header>;
};
export default AdminHeader;