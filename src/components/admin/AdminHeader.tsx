
import React from 'react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { User } from 'lucide-react';

const AdminHeader = () => {
  return (
    <header className="bg-white border-b py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="h-9 w-9" />
          <span className="text-lg font-bold text-sawmill-dark-brown">MilledRight Admin</span>
        </div>
        
        <div>
          <Button variant="ghost" size="sm">
            <User className="h-4 w-4 mr-2" />
            <span>Admin User</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
