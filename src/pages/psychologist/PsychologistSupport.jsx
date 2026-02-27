
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Bell, MessageSquare, AlertCircle } from 'lucide-react';

export default function PsychologistSupport() {
  const { toast } = useToast();
  const notify = () => toast({ description: "🚧 Central de suporte será ativada na próxima versão! 🚀" });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Notificações e Suporte</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Bell size={20}/> Notificações Recentes</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3 border-b pb-3 text-sm">
                <div className="mt-1 text-blue-500"><AlertCircle size={16} /></div>
                <div>
                  <p className="font-medium">Novo agendamento</p>
                  <p className="text-slate-600">Ana Clara agendou uma sessão para 26/02 às 14:00.</p>
                  <span className="text-xs text-slate-400">Há 2 horas</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={notify}>Marcar todas como lidas</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><MessageSquare size={20}/> Central de Ajuda</CardTitle></CardHeader>
          <CardContent className="text-center py-8">
            <p className="text-slate-600 mb-6">Precisa de ajuda com a plataforma ou está com problemas em uma integração?</p>
            <Button onClick={notify} className="bg-slate-900 text-white hover:bg-slate-800">Abrir Chamado</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
