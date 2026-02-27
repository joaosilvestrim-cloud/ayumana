
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Activity, CheckCircle, XCircle } from 'lucide-react';

export default function IntegrationMonitorPage() {
  const { toast } = useToast();
  
  const testConnection = async (name) => {
    toast({ title: `Testando ${name}...`, description: "Aguardando resposta do Edge Function..." });
    setTimeout(() => {
      toast({ description: "🚧 Integração testada via Mock. Endpoint real requer ambiente ativo. 🚀" });
    }, 1500);
  };

  const integrations = [
    { name: 'Asaas Pagamentos', status: 'online', ping: '20ms', lastChecked: 'Agora' },
    { name: 'Whereby API', status: 'online', ping: '45ms', lastChecked: 'Há 5 min' },
    { name: 'MailerSend', status: 'offline', ping: 'Timeout', lastChecked: 'Há 15 min', error: 'API Key Revoked' },
    { name: 'OpenAI API', status: 'online', ping: '350ms', lastChecked: 'Há 1 min' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Monitor de Integrações</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {integrations.map((int) => (
          <Card key={int.name} className={int.status === 'offline' ? 'border-red-200' : ''}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                {int.name}
                {int.status === 'online' ? <CheckCircle className="text-green-500" size={18}/> : <XCircle className="text-red-500" size={18}/>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                <p><span className="text-slate-500">Status:</span> <span className="font-medium">{int.status.toUpperCase()}</span></p>
                <p><span className="text-slate-500">Latência:</span> {int.ping}</p>
                <p><span className="text-slate-500">Última Checagem:</span> {int.lastChecked}</p>
                {int.error && <p className="text-red-600 text-xs mt-2 p-2 bg-red-50 rounded">Erro: {int.error}</p>}
              </div>
              <div className="mt-4 space-x-2">
                <Button size="sm" onClick={() => testConnection(int.name)}>Testar</Button>
                <Button variant="outline" size="sm" onClick={() => toast({description: "Configurações em breve 🚀"})}>Configurar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
