
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function PsychologistSchedule() {
  const { toast } = useToast();
  const notify = () => toast({ description: "🚧 Funcionalidade de agenda interativa em desenvolvimento! 🚀" });

  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Gerenciar Agenda</h1>
        <Button onClick={notify}>Salvar Todas as Configurações</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Disponibilidade Semanal</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {days.map((day, idx) => (
                <div key={day} className="flex flex-wrap items-center gap-4 p-3 bg-slate-50 rounded-md border">
                  <div className="w-24 font-medium">{day}</div>
                  {idx < 5 ? (
                    <>
                      <input type="time" className="border rounded p-1 text-sm bg-white" defaultValue="09:00" />
                      <span className="text-slate-500">até</span>
                      <input type="time" className="border rounded p-1 text-sm bg-white" defaultValue="18:00" />
                      <div className="ml-auto">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Ativo</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 text-slate-400 text-sm">Indisponível</div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Bloqueios de Data</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 mb-4">Adicione férias, feriados ou dias que não irá atender.</p>
              <Button variant="outline" className="w-full" onClick={notify}>+ Adicionar Bloqueio</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Sincronização</CardTitle></CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" onClick={notify}>Sincronizar Google Calendar</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
