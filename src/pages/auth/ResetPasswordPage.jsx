
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Lock } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthInput from '@/components/auth/AuthInput';
import AuthButton from '@/components/auth/AuthButton';
import PasswordStrength from '@/components/auth/PasswordStrength';
import ErrorMessage from '@/components/auth/ErrorMessage';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export default function ResetPasswordPage() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { updatePassword, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) return setError('A senha deve ter no mínimo 8 caracteres.');
    if (password !== confirmPassword) return setError('As senhas não coincidem.');

    try {
      await updatePassword(token, password);
      toast({ title: 'Sucesso', description: 'Senha atualizada com sucesso!' });
      navigate('/login');
    } catch (err) {
      setError('Token inválido ou expirado. Tente novamente.');
    }
  };

  return (
    <AuthLayout>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Nova Senha</h2>
        <p className="text-sm text-slate-500 mt-2">Crie uma nova senha segura para sua conta.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <ErrorMessage message={error} />
        
        <div>
          <AuthInput
            id="password"
            label="Nova Senha"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
          />
          <PasswordStrength password={password} />
        </div>

        <AuthInput
          id="confirmPassword"
          label="Confirmar Nova Senha"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          icon={Lock}
        />

        <AuthButton loading={isLoading} type="submit">
          Redefinir Senha
        </AuthButton>
      </form>
    </AuthLayout>
  );
}
