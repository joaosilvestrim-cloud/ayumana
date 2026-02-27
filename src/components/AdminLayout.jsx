
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, ChevronRight } from 'lucide-react';
import AdminSidebar, { ADMIN_MENU_ITEMS } from './AdminSidebar';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const currentMenu = ADMIN_MENU_ITEMS.find(item => 
    item.path === location.pathname || (item.path !== '/admin' && location.pathname.startsWith(item.path))
  ) || ADMIN_MENU_ITEMS[0];

  return (
    <div className="min-h-screen bg-gray-50 flex dark:bg-slate-950">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              <Menu size={24} />
            </button>
            
            <div className="hidden sm:flex items-center text-sm text-gray-500 dark:text-slate-400">
              <span>SysAdmin</span>
              <ChevronRight size={16} className="mx-2" />
              <span className="font-medium text-gray-900 dark:text-white">
                {currentMenu?.label}
              </span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
