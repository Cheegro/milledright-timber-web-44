
import { Button } from '@/components/ui/button';
import { useSidebar } from "@/components/ui/sidebar";
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  const { collapsed, setCollapsed } = useSidebar();
  
  return (
    <header className="border-b bg-white flex items-center justify-between p-4">
      <div className="flex items-center">
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-gray-100 mr-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-sawmill-dark-brown">MilledRight Admin</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <button className="p-2 rounded-md hover:bg-gray-100 relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" />
              <path d="M4 6.38A9.997 9.997 0 0 0 12 22a10 10 0 0 0 8-4" />
              <path d="M19 12h2" />
              <path d="M12 2v2" />
              <path d="M2 12h2" />
              <path d="M14.92 8.08c.7.7 1.08 1.6 1.08 2.58v.34" />
              <path d="M8.92 14.96c.7-.52 1.53-.87 2.42-1.05" />
              <path d="M5.35 16.65A8.005 8.005 0 0 0 12 20c1.94 0 3.74-.7 5.12-1.88" />
            </svg>
            <span className="absolute top-0 right-0 w-4 h-4 bg-sawmill-orange text-white rounded-full text-xs flex items-center justify-center">3</span>
          </button>
        </div>
        
        <div className="relative">
          <button className="p-2 rounded-md hover:bg-gray-100 relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3Z" />
              <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
            </svg>
            <span className="absolute top-0 right-0 w-4 h-4 bg-sawmill-orange text-white rounded-full text-xs flex items-center justify-center">2</span>
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-sawmill-dark-gray flex items-center justify-center text-white font-bold">
            A
          </div>
          <div className="hidden md:block">
            <p className="font-medium text-sm">Admin User</p>
            <p className="text-xs text-sawmill-dark-gray">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
