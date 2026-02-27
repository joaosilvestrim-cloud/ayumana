
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function WebhookManagementPage() {
  const { toast } = useToast();
  const notify = () => toast({ description: "🚧 Em desenvolvimento! 🚀" });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Logs de Webhooks</h1>

      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Eventos Recentes</CardTitle>
          <Button variant="outline" onClick={notify}>Atualizar</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="p-3 font-medium">Timestamp</th>
                  <th className="p-3 font-medium">Origem</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Resposta</th>
                  <th className="p-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {/* Mock Data */}
                <tr className="hover:bg-slate-50">
                  <td className="p-3">2026-02-26 14:30:00</td>
                  <td className="p-3">Asaas Payment</td>
                  <td className="p-3"><span className="text-green-600">✅ Processado</span></td>
                  <td className="p-3 text-slate-500 truncate max-w-[200px]">200 OK</td>
                  <td className="p-3 text-right">
                    <Button variant="ghost" size="sm" onClick={notify}>Ver Payload</Button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3">2026-02-26 14:25:00</td>
                  <td className="p-3">MailerSend Event</td>
                  <td className="p-3"><span className="text-red-600">❌ Erro 500</span></td>
                  <td className="p-3 text-slate-500 truncate max-w-[200px]">API Key Invalid</td>
                  <td className="p-3 text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={notify}>Reprocessar</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
