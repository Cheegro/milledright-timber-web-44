
import React from 'react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { User, LogOut } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const AdminHeader = () => {
  const { logout } = useAdminAuth();
  
  return (
    <header className="bg-white border-b py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="h-9 w-9" />
          <span className="text-lg font-bold text-sawmill-dark-brown">MilledRight Admin</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <User className="h-4 w-4 mr-2" />
            <span>Admin User</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={logout}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
