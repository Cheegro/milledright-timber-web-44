
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const AdminHeader = () => {
  return (
    <header className="bg-white border-b py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2 lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <span className="text-lg font-bold text-sawmill-dark-brown">MilledRight Admin</span>
        </div>
        
        <div>
          <Button variant="ghost" size="sm">
            <span className="mr-2">Admin User</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
