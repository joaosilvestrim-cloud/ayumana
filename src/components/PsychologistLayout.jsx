
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { 
  LayoutDashboard, User, Calendar, Video, 
  DollarSign, Store, HelpCircle, Settings, 
  LogOut, Menu, ChevronRight
} from 'lucide-react';

const MENU_ITEMS = [
  { path: '/psychologist/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/psychologist/profile', icon: User, label: 'Vitrine (Perfil)' },
  { path: '/psychologist/schedule', icon: Calendar, label: 'Agenda' },
  { path: '/psychologist/sessions', icon: Video, label: 'Sessões' },
  { path: '/psychologist/financial', icon: DollarSign, label: 'Financeiro' },
  { path: '/psychologist/services', icon: Store, label: 'Loja de Serviços' },
  { path: '/psychologist/support', icon: HelpCircle, label: 'Suporte' },
  { path: '/psychologist/settings', icon: Settings, label: 'Configurações' },
];

export default function PsychologistLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const { signOut, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      supabase.from('psychologists').select('full_name, profile_photo_url').eq('user_id', user.id).maybeSingle()
        .then(({data}) => { if(data) setProfile(data); });
    }
  }, [user]);

  const currentMenu = MENU_ITEMS.find(item => location.pathname.startsWith(item.path)) || MENU_ITEMS[0];

  return (
    <div className="min-h-screen bg-slate-50 flex dark:bg-slate-900">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-16 flex items-center px-6 font-bold text-xl text-blue-600 dark:text-blue-500 border-b border-slate-100 dark:border-slate-800">
          Ayumana Pro
        </div>

        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold overflow-hidden">
            {profile?.profile_photo_url ? (
              <img src={profile.profile_photo_url} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              profile?.full_name?.charAt(0) || 'P'
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
              {profile?.full_name || 'Psicólogo'}
            </p>
            <p className="text-xs text-slate-500 truncate">Profissional</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon size={20} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Sair</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-500 hover:text-slate-700">
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex items-center text-sm text-slate-500">
              <span>Portal Pro</span>
              <ChevronRight size={16} className="mx-2" />
              <span className="font-medium text-slate-900 dark:text-slate-100">{currentMenu?.label}</span>
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
