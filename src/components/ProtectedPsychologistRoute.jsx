
import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';

export default function ProtectedPsychologistRoute({ children }) {
  const { isPsychologist, isAdmin, currentUser, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isPsychologist && !isAdmin) { // Optional: allow admins to view psychologist pages
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-slate-50 p-4 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Acesso Restrito</h1>
        <p className="text-slate-600 mb-8">Sua conta não possui perfil de Psicólogo ativo.</p>
        <Link to="/">
          <Button>Voltar para o Início</Button>
        </Link>
      </div>
    );
  }

  return children;
}
