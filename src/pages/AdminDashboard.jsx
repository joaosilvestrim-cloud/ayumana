
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCog, Wallet, Coins, AlertTriangle, Activity } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    patients: 0, psychologists: 0, revenue: 0, ayucoins: 0, consumptionRate: 0
  });

  useEffect(() => {
    async function fetchStats() {
      const [
        { count: patCount },
        { count: psyCount },
        { data: wallets }
      ] = await Promise.all([
        supabase.from('patients').select('*', { count: 'exact', head: true }),
        supabase.from('psychologists').select('*', { count: 'exact', head: true }),
        supabase.from('ayucoin_wallets').select('balance, total_spent')
      ]);

      let totalBal = 0;
      let totalSpent = 0;
      wallets?.forEach(w => {
        totalBal += Number(w.balance || 0);
        totalSpent += Number(w.total_spent || 0);
      });
      const totalIssued = totalBal + totalSpent;
      const rate = totalIssued > 0 ? ((totalSpent / totalIssued) * 100).toFixed(1) : 0;

      setStats({
        patients: patCount || 0,
        psychologists: psyCount || 0,
        revenue: 15420.50, // Mocked for display
        ayucoins: totalBal,
        consumptionRate: rate
      });
    }
    fetchStats();
  }, []);

  const mockRevenue = [{ name: 'W1', rev: 4000 }, { name: 'W2', rev: 3000 }, { name: 'W3', rev: 5000 }, { name: 'W4', rev: 2780 }];
  const mockAyucoins = [{ name: 'W1', emit: 1000, cons: 800 }, { name: 'W2', emit: 1200, cons: 900 }, { name: 'W3', emit: 800, cons: 1100 }];
  const mockPie = [{ name: 'Sessões', value: 400 }, { name: 'IA', value: 300 }, { name: 'Cursos', value: 300 }];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Executivo</h1>
      
      {/* Alerts */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start gap-3">
        <AlertTriangle className="text-red-500 mt-0.5" size={20} />
        <div>
          <h3 className="text-sm font-medium text-red-800">Alertas Críticos</h3>
          <p className="text-sm text-red-700 mt-1">Integração MailerSend offline (últimos 15 min). 2 pagamentos Asaas não processados.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Psicólogos</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.psychologists}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Pacientes</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.patients}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Receita 30d</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">R$ {stats.revenue}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Ayucoins</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.ayucoins}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Consumo</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.consumptionRate}%</div></CardContent></Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader><CardTitle>Receita Mensal (R$)</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockRevenue}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="rev" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Consumo por Tipo</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={mockPie} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {mockPie.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3">
          <CardHeader><CardTitle>Emissão vs Consumo (Ayucoins)</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockAyucoins}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="emit" name="Emitidas" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cons" name="Consumidas" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
