
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function AyucoinsManagementPage() {
  const { toast } = useToast();
  const notify = () => toast({ description: "🚧 Em desenvolvimento! 🚀" });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Controle de Ayucoins</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Emitir Ayucoins</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Paciente ID / Email</label>
              <Input placeholder="Busque o paciente..." className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Quantidade</label>
              <Input type="number" placeholder="0" className="mt-1" />
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700" onClick={notify}>Confirmar Emissão</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader><CardTitle>Debitar Ayucoins</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Paciente ID / Email</label>
              <Input placeholder="Busque o paciente..." className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Quantidade a Debitar</label>
              <Input type="number" placeholder="0" className="mt-1" />
            </div>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={notify}>Confirmar Débito</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Histórico de Operações Manuais</CardTitle></CardHeader>
        <CardContent>
          <div className="p-8 text-center text-slate-500 border border-dashed rounded-md">
            Nenhuma operação manual recente.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
