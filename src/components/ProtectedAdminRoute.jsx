
import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';

export default function ProtectedAdminRoute({ children }) {
  const { isAdmin, isPsychologist, currentUser, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    const redirectPath = isPsychologist ? '/psychologist/dashboard' : '/';
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Acesso Negado</h1>
        <p className="text-gray-600 mb-8">Você não tem permissões de administrador para acessar esta página.</p>
        <Link to={redirectPath}>
          <Button>Ir para o seu Painel</Button>
        </Link>
      </div>
    );
  }

  return children;
}
