
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthInput from '@/components/auth/AuthInput';
import AuthButton from '@/components/auth/AuthButton';
import ErrorMessage from '@/components/auth/ErrorMessage';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return setError('Por favor, insira um email válido.');
    }
    if (password.length < 6) {
      return setError('A senha deve ter pelo menos 6 caracteres.');
    }

    setLoading(true);

    try {
      const { error: signInError } = await signIn(email, password);
      
      if (signInError) {
        throw signInError;
      }

      // Fetch user role
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user) {
        const { data: roleData, error: roleError } = await supabase
          .from('users')
          .select('role')
          .eq('id', userData.user.id)
          .maybeSingle();

        toast({ title: 'Sucesso', description: 'Login realizado com sucesso!' });

        if (roleData?.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (roleData?.role === 'psychologist') {
          navigate('/psychologist/dashboard');
        } else if (roleData?.role === 'patient') {
          navigate('/patient/dashboard');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.message?.includes('Invalid login credentials')) {
        setError('Credenciais inválidas. Verifique seu email e senha e tente novamente.');
      } else {
        setError(err.message || 'Ocorreu um erro ao tentar fazer login.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-8 text-center relative">
        <h2 className="text-2xl font-bold text-slate-900">Bem-vindo à Ayumana</h2>
        <p className="text-sm text-slate-500 mt-2">Plataforma de saúde mental integrada</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <ErrorMessage message={error} />

        <AuthInput
          id="email"
          label="Email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={Mail}
        />

        <div className="relative">
          <AuthInput
            id="password"
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
          />
          <button 
            type="button" 
            className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer select-none">
              Lembrar-me
            </label>
          </div>
          <Link to="/forgot-password" className="text-sm font-medium text-[#1B4D5C] hover:text-[#6BA644] transition-colors">
            Esqueceu a senha?
          </Link>
        </div>

        <AuthButton loading={loading} type="submit">
          {loading ? 'Autenticando...' : 'Entrar'}
        </AuthButton>
      </form>

      <div className="mt-8 text-center text-sm text-slate-600">
        Não tem uma conta?{' '}
        <Link to="/register" className="font-semibold text-[#1B4D5C] hover:text-[#6BA644] transition-colors">
          Registre-se
        </Link>
      </div>
    </AuthLayout>
  );
}
