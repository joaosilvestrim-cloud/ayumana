
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import { AdminAuthProvider, useAdminAuth } from '@/contexts/AdminAuthContext';
import ErrorBoundary from '@/components/ErrorBoundary';

// Auth Pages
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';
import DiagnosticsPage from '@/pages/DiagnosticsPage';

// Admin Components
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute';
import AdminLayout from '@/components/AdminLayout';
import AdminDashboard from '@/pages/AdminDashboard';
import PatientManagementPage from '@/pages/PatientManagementPage';
import PsychologistManagementPage from '@/pages/PsychologistManagementPage';
import FinancialManagementPage from '@/pages/FinancialManagementPage';
import AyucoinsManagementPage from '@/pages/AyucoinsManagementPage';
import IntegrationMonitorPage from '@/pages/IntegrationMonitorPage';
import WebhookManagementPage from '@/pages/WebhookManagementPage';
import ServicesManagementPage from '@/pages/ServicesManagementPage';
import AuditLogPage from '@/pages/AuditLogPage';

// Psychologist Components
import ProtectedPsychologistRoute from '@/components/ProtectedPsychologistRoute';
import PsychologistLayout from '@/components/PsychologistLayout';
import PsychologistDashboard from '@/pages/psychologist/PsychologistDashboard';
import PsychologistProfile from '@/pages/psychologist/PsychologistProfile';
import PsychologistSchedule from '@/pages/psychologist/PsychologistSchedule';
import PsychologistSessions from '@/pages/psychologist/PsychologistSessions';
import SessionNotes from '@/pages/psychologist/SessionNotes';
import PsychologistFinancial from '@/pages/psychologist/PsychologistFinancial';
import PsychologistServices from '@/pages/psychologist/PsychologistServices';
import PsychologistSupport from '@/pages/psychologist/PsychologistSupport';
import PsychologistSettings from '@/pages/psychologist/PsychologistSettings';

import HomePage from '@/pages/HomePage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function RoleBasedRedirect() {
  const { userRole, loading } = useAdminAuth();
  
  if (loading) return null;
  
  if (userRole === 'admin') return <Navigate to="/admin/dashboard" replace />;
  if (userRole === 'psychologist') return <Navigate to="/psychologist/dashboard" replace />;
  if (userRole === 'patient') return <Navigate to="/patient/dashboard" replace />;
  
  return <HomePage />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AdminAuthProvider>
          <Helmet>
            <title>Ayumana</title>
            <meta name="description" content="Ayumana Platform" />
          </Helmet>
          
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public/Root Route with Redirect Logic */}
              <Route path="/" element={<RoleBasedRedirect />} />
              
              <Route path="/login" element={
                <ErrorBoundary><LoginPage /></ErrorBoundary>
              } />
              <Route path="/register" element={
                <ErrorBoundary><RegisterPage /></ErrorBoundary>
              } />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
              <Route path="/diagnostics" element={<DiagnosticsPage />} />
              
              {/* Psychologist Routes */}
              <Route path="/psychologist/*" element={
                <ErrorBoundary>
                  <ProtectedPsychologistRoute>
                    <PsychologistLayout>
                      <Routes>
                        <Route path="dashboard" element={<PsychologistDashboard />} />
                        <Route path="profile" element={<PsychologistProfile />} />
                        <Route path="schedule" element={<PsychologistSchedule />} />
                        <Route path="sessions" element={<PsychologistSessions />} />
                        <Route path="sessions/:id/notes" element={<SessionNotes />} />
                        <Route path="financial" element={<PsychologistFinancial />} />
                        <Route path="services" element={<PsychologistServices />} />
                        <Route path="support" element={<PsychologistSupport />} />
                        <Route path="settings" element={<PsychologistSettings />} />
                        <Route path="*" element={<Navigate to="dashboard" replace />} />
                      </Routes>
                    </PsychologistLayout>
                  </ProtectedPsychologistRoute>
                </ErrorBoundary>
              } />

              {/* Admin Routes */}
              <Route path="/admin/*" element={
                <ErrorBoundary>
                  <ProtectedAdminRoute>
                    <AdminLayout>
                      <Routes>
                        <Route path="/" element={<AdminDashboard />} />
                        <Route path="patients" element={<PatientManagementPage />} />
                        <Route path="psychologists" element={<PsychologistManagementPage />} />
                        <Route path="financial" element={<FinancialManagementPage />} />
                        <Route path="ayucoins" element={<AyucoinsManagementPage />} />
                        <Route path="services" element={<ServicesManagementPage />} />
                        <Route path="integrations" element={<IntegrationMonitorPage />} />
                        <Route path="webhooks" element={<WebhookManagementPage />} />
                        <Route path="audit" element={<AuditLogPage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </AdminLayout>
                  </ProtectedAdminRoute>
                </ErrorBoundary>
              } />

              {/* Note: Patient routes can be added here mirroring the structure above */}

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
          
          <Toaster />
        </AdminAuthProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
