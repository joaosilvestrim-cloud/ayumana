
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PsychologistFinancial() {
  const { toast } = useToast();
  const notify = () => toast({ description: "🚧 Relatórios e extratos em desenvolvimento! 🚀" });

  const mockChart = [
    { name: 'Jan', val: 1200 }, { name: 'Fev', val: 1800 }, { name: 'Mar', val: 2400 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Financeiro</h1>
        <Button onClick={notify}>Exportar Relatório</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Saldo Disponível</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-blue-600">850 AC</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Receita Estimada (Mês)</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-green-600">R$ 1.275,00</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Ticket Médio</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">150 AC</div></CardContent></Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Receita Mensal (Ayucoins)</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockChart}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="val" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Últimas Transações</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="flex justify-between items-center border-b pb-2 last:border-0 text-sm">
                  <div>
                    <p className="font-medium">Sessão Realizada</p>
                    <p className="text-slate-500 text-xs">Hoje, 15:00</p>
                  </div>
                  <div className="text-green-600 font-bold">+150 AC</div>
                </div>
              ))}
            </div>
            <Button variant="link" className="w-full mt-4" onClick={notify}>Ver Extrato Completo</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
