
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export default function PsychologistSessions() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const notify = () => toast({ description: "🚧 Ação em desenvolvimento! 🚀" });

  const mockSessions = [
    { id: '1', patient: 'Ana Clara', date: '26/02/2026', time: '14:00', duration: 50, status: 'Agendada', ayucoins: 150 },
    { id: '2', patient: 'Carlos Silva', date: '26/02/2026', time: '16:00', duration: 50, status: 'Agendada', ayucoins: 150 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Sessões</h1>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">Próximas Sessões</TabsTrigger>
          <TabsTrigger value="completed">Realizadas</TabsTrigger>
          <TabsTrigger value="cancelled">Canceladas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Hoje e Futuras</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-md border">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-700">
                    <tr>
                      <th className="p-3 font-medium">Paciente</th>
                      <th className="p-3 font-medium">Data / Hora</th>
                      <th className="p-3 font-medium">Duração</th>
                      <th className="p-3 font-medium">Ayucoins</th>
                      <th className="p-3 font-medium text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {mockSessions.map(s => (
                      <tr key={s.id} className="hover:bg-slate-50">
                        <td className="p-3 font-medium">{s.patient}</td>
                        <td className="p-3">{s.date} às {s.time}</td>
                        <td className="p-3">{s.duration} min</td>
                        <td className="p-3 font-medium text-green-600">{s.ayucoins}</td>
                        <td className="p-3 text-right space-x-2">
                          <Button size="sm" onClick={notify}>Iniciar Sala</Button>
                          <Button variant="outline" size="sm" onClick={() => navigate(`/psychologist/sessions/${s.id}/notes`)}>Prontuário</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          <Card><CardContent className="p-8 text-center text-slate-500 border border-dashed rounded-md mt-4">Nenhuma sessão realizada recente.</CardContent></Card>
        </TabsContent>
        
        <TabsContent value="cancelled" className="mt-4">
          <Card><CardContent className="p-8 text-center text-slate-500 border border-dashed rounded-md mt-4">Nenhuma sessão cancelada.</CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
