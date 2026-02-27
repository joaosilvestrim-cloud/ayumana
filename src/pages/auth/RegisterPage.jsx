
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, FileText } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthInput from '@/components/auth/AuthInput';
import AuthButton from '@/components/auth/AuthButton';
import PasswordStrength from '@/components/auth/PasswordStrength';
import ErrorMessage from '@/components/auth/ErrorMessage';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
  const [type, setType] = useState('patient');
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '', crp: '' });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.fullName.length < 3) return setError('O nome deve ter no mínimo 3 caracteres.');
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return setError('Email inválido.');
    if (formData.password.length < 8) return setError('A senha deve ter no mínimo 8 caracteres.');
    if (formData.password !== formData.confirmPassword) return setError('As senhas não coincidem.');
    if (type === 'psychologist' && !formData.crp) return setError('CRP é obrigatório para psicólogos.');
    if (!agreed) return setError('Você deve aceitar os termos de uso.');

    try {
      await register(formData.email, formData.password, { ...formData, type });
      toast({ title: 'Sucesso', description: 'Conta criada! Confirme seu email.' });
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Erro ao criar conta.');
    }
  };

  return (
    <AuthLayout>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Criar Conta</h2>
        <p className="text-sm text-slate-500 mt-1">Junte-se à comunidade Ayumana</p>
      </div>

      <div className="flex gap-4 mb-6">
        <label className={`flex-1 flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-all ${type === 'patient' ? 'border-[#6BA644] bg-green-50' : 'border-slate-200 hover:border-slate-300'}`}>
          <input type="radio" name="type" value="patient" className="sr-only" checked={type === 'patient'} onChange={() => setType('patient')} />
          <span className="font-semibold text-sm text-slate-900">Sou Paciente</span>
        </label>
        <label className={`flex-1 flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-all ${type === 'psychologist' ? 'border-[#6BA644] bg-green-50' : 'border-slate-200 hover:border-slate-300'}`}>
          <input type="radio" name="type" value="psychologist" className="sr-only" checked={type === 'psychologist'} onChange={() => setType('psychologist')} />
          <span className="font-semibold text-sm text-slate-900">Sou Psicólogo</span>
        </label>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <ErrorMessage message={error} />
        
        <AuthInput id="fullName" label="Nome Completo" placeholder="João da Silva" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} icon={User} />
        <AuthInput id="email" label="Email" type="email" placeholder="seu@email.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} icon={Mail} />
        
        {type === 'psychologist' && (
          <AuthInput id="crp" label="CRP" placeholder="00/00000-UF" value={formData.crp} onChange={(e) => setFormData({...formData, crp: e.target.value})} icon={FileText} />
        )}

        <div>
          <AuthInput id="password" label="Senha" type="password" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} icon={Lock} />
          <PasswordStrength password={formData.password} />
        </div>

        <AuthInput id="confirmPassword" label="Confirmar Senha" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} icon={Lock} />

        <div className="flex items-center space-x-2 pt-2">
          <Checkbox id="terms" checked={agreed} onCheckedChange={(c) => setAgreed(c)} />
          <Label htmlFor="terms" className="text-sm font-normal text-slate-600 cursor-pointer">
            Li e aceito os <a href="#" className="text-[#1B4D5C] hover:underline">termos de uso</a> e <a href="#" className="text-[#1B4D5C] hover:underline">política de privacidade</a>.
          </Label>
        </div>

        <AuthButton loading={isLoading} type="submit" className="mt-2">
          Criar Conta
        </AuthButton>
      </form>

      <div className="mt-6 text-center text-sm text-slate-600">
        Já tem uma conta?{' '}
        <Link to="/login" className="font-semibold text-[#1B4D5C] hover:underline">
          Faça login
        </Link>
      </div>
    </AuthLayout>
  );
}
