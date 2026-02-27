
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function PsychologistSettings() {
  const { toast } = useToast();
  const notify = () => toast({ description: "🚧 Configurações de segurança em desenvolvimento! 🚀" });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Configurações da Conta</h1>

      <Card>
        <CardHeader><CardTitle>Dados Bancários (Recebimentos)</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Banco</label>
              <Input placeholder="Ex: Nubank, Itaú..." />
            </div>
            <div>
              <label className="text-sm font-medium">Tipo de Conta</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background text-slate-900">
                <option>Conta Corrente</option>
                <option>Conta Poupança</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Agência</label>
              <Input placeholder="0000" />
            </div>
            <div>
              <label className="text-sm font-medium">Conta</label>
              <Input placeholder="00000-0" />
            </div>
          </div>
          <Button onClick={notify}>Salvar Dados Bancários</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Segurança</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nova Senha</label>
            <Input type="password" placeholder="***" />
          </div>
          <Button variant="outline" onClick={notify}>Atualizar Senha</Button>
        </CardContent>
      </Card>

      <Card className="border-red-200">
        <CardHeader><CardTitle className="text-red-600">Zona de Perigo</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600 mb-4">Ao excluir sua conta, todos os seus dados e históricos serão removidos permanentemente. Esta ação não pode ser desfeita.</p>
          <Button variant="destructive" onClick={notify}>Excluir Conta Permanentemente</Button>
        </CardContent>
      </Card>
    </div>
  );
}
