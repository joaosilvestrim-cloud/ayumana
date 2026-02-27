
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { 
  LayoutDashboard, Users, UserCog, Wallet, 
  Activity, Webhook, ShieldAlert, Coins, 
  Settings, LogOut, Briefcase
} from 'lucide-react';

export const ADMIN_MENU_ITEMS = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/psychologists', icon: UserCog, label: 'Gestão de Psicólogos' },
  { path: '/admin/patients', icon: Users, label: 'Gestão de Pacientes' },
  { path: '/admin/financial', icon: Wallet, label: 'Gestão Financeira' },
  { path: '/admin/ayucoins', icon: Coins, label: 'Controle de Ayucoins' },
  { path: '/admin/services', icon: Briefcase, label: 'Gestão de Serviços' },
  { path: '/admin/integrations', icon: Activity, label: 'Integrações' },
  { path: '/admin/webhooks', icon: Webhook, label: 'Webhooks' },
  { path: '/admin/audit', icon: ShieldAlert, label: 'Auditoria' },
];

export default function AdminSidebar({ isOpen, onClose }) {
  const { logout, currentUser } = useAdminAuth();
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-slate-900 text-slate-300 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-16 flex items-center px-6 font-bold text-xl text-white border-b border-slate-800">
          Ayumana Admin
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {ADMIN_MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-md transition-colors
                      ${isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'hover:bg-slate-800 hover:text-white'}
                    `}
                    onClick={onClose}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="mb-4 px-3 text-sm truncate text-slate-400">
            {currentUser?.email}
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
}
