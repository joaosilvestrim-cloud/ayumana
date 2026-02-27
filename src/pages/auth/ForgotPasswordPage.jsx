
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthInput from '@/components/auth/AuthInput';
import AuthButton from '@/components/auth/AuthButton';
import ErrorMessage from '@/components/auth/ErrorMessage';
import SuccessMessage from '@/components/auth/SuccessMessage';
import { useAuth } from '@/hooks/useAuth';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState('');
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMsg('Por favor, insira um email válido.');
      return;
    }
    
    setStatus('loading');
    setErrorMsg('');
    try {
      await resetPassword(email);
      setStatus('success');
    } catch (err) {
      setErrorMsg('Ocorreu um erro ao enviar o link de recuperação.');
      setStatus('error');
    }
  };

  return (
    <AuthLayout>
      <div className="mb-6">
        <Link to="/login" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800 mb-4">
          <ArrowLeft size={16} className="mr-1" /> Voltar
        </Link>
        <h2 className="text-2xl font-bold text-slate-900">Recuperar Senha</h2>
        <p className="text-sm text-slate-500 mt-2">
          {status === 'success' 
            ? 'Enviamos as instruções para o seu email.' 
            : 'Informe seu email para receber um link de recuperação de senha.'}
        </p>
      </div>

      {status === 'success' ? (
        <div className="space-y-6">
          <SuccessMessage message="Link de recuperação enviado com sucesso! Verifique sua caixa de entrada e também a pasta de spam." />
          <Link to="/login">
            <AuthButton className="mt-4">Voltar ao Login</AuthButton>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {status === 'error' && <ErrorMessage message={errorMsg} />}
          
          <AuthInput
            id="email"
            label="Email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
          />

          <AuthButton loading={status === 'loading'} type="submit">
            Enviar link de recuperação
          </AuthButton>
        </form>
      )}
    </AuthLayout>
  );
}
