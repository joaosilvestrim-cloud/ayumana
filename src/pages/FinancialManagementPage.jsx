
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function FinancialManagementPage() {
  const { toast } = useToast();
  const notify = () => toast({ description: "🚧 Em desenvolvimento! 🚀" });

  const mockPayments = [
    { id: 'pay_1', amount: 150.00, status: 'CONFIRMED', date: '2026-02-26', client: 'João Silva' },
    { id: 'pay_2', amount: 300.00, status: 'PENDING', date: '2026-02-26', client: 'Maria Santos' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gestão Financeira</h1>
        <Button onClick={notify}>Gerar Relatório</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Receita Total</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">R$ 45.230</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Comissão Retida</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">R$ 6.784</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Repasses Acumulados</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">R$ 38.446</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Ayucoins em Circulação</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">12.500</div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Últimas Transações Asaas</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="p-3 font-medium">ID Transação</th>
                  <th className="p-3 font-medium">Cliente</th>
                  <th className="p-3 font-medium">Valor</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Data</th>
                  <th className="p-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockPayments.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-3 text-slate-500 font-mono text-xs">{p.id}</td>
                    <td className="p-3">{p.client}</td>
                    <td className="p-3">R$ {p.amount.toFixed(2)}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${p.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-3">{p.date}</td>
                    <td className="p-3 text-right">
                      <Button variant="ghost" size="sm" onClick={notify}>Ver Detalhes</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
