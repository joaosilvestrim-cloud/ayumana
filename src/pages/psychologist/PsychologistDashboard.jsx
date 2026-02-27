
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Wallet, 
  Calendar, 
  Users, 
  Star, 
  Bell, 
  Clock, 
  DollarSign 
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

export default function PsychologistDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    balance: 0,
    revenue: 0,
    totalSessions: 0,
    todaySessions: 0,
    newPatients: 0
  });
  
  const notify = () => toast({ description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" });

  useEffect(() => {
    async function fetchData() {
      if (!user) return;
      try {
        const [walletRes, sessionRes] = await Promise.all([
          supabase.from('ayucoin_wallets').select('balance, total_earned').eq('user_id', user.id).maybeSingle(),
          supabase.from('sessions').select('id, status, scheduled_date')
        ]);

        const today = new Date().toISOString().split('T')[0];
        let tSessions = 0;
        let todayS = 0;

        if (sessionRes.data) {
          tSessions = sessionRes.data.filter(s => s.status === 'Realizada').length;
          todayS = sessionRes.data.filter(s => s.scheduled_date === today).length;
        }

        setStats({
          balance: walletRes.data?.balance || 0,
          revenue: walletRes.data?.total_earned ? (walletRes.data.total_earned * 1.5) : 0,
          totalSessions: tSessions,
          todaySessions: todayS,
          newPatients: 3 
        });
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [user]);

  const mockRevenue = [
    { name: 'Sem 1', rev: 400 }, 
    { name: 'Sem 2', rev: 800 }, 
    { name: 'Sem 3', rev: 650 }, 
    { name: 'Sem 4', rev: 1200 }
  ];
  const mockSessions = [
    { name: 'Seg', val: 3 }, 
    { name: 'Ter', val: 5 }, 
    { name: 'Qua', val: 2 }, 
    { name: 'Qui', val: 6 }, 
    { name: 'Sex', val: 4 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Visão Geral</h1>
        <div className="space-x-2">
          <Link to="/psychologist/schedule">
            <Button variant="outline">Gerenciar Agenda</Button>
          </Link>
          <Link to="/psychologist/sessions">
            <Button>Ver Sessões de Hoje</Button>
          </Link>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-md flex items-start gap-3">
        <Bell className="text-blue-600 mt-0.5" size={20} />
        <div>
          <h3 className="text-sm font-medium text-blue-900">Novidades para você</h3>
          <p className="text-sm text-blue-800 mt-1">Você tem 1 nova solicitação de serviço especializado e 2 novas avaliações positivas.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-slate-500">Saldo Atual (Ayucoins)</CardTitle>
            <Wallet className="h-4 w-4 text-slate-400"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.balance} AC</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-slate-500">Receita Mês (Est. R$)</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-400"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {stats.revenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-slate-500">Sessões Hoje</CardTitle>
            <Clock className="h-4 w-4 text-slate-400"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.todaySessions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-slate-500">Novos Pacientes (Mês)</CardTitle>
            <Users className="h-4 w-4 text-slate-400"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newPatients}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Receita Últimos 30 Dias (R$)</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockRevenue}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="rev" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Volume de Sessões (Semana)</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockSessions}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="val" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
