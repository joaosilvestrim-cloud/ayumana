
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function ServicesManagementPage() {
  const { toast } = useToast();
  const notify = () => toast({ description: "🚧 Em desenvolvimento! 🚀" });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gestão de Serviços</h1>

      <Tabs defaultValue="ia" className="w-full">
        <TabsList>
          <TabsTrigger value="ia">Serviços de IA</TabsTrigger>
          <TabsTrigger value="especializados">Serviços Especializados</TabsTrigger>
          <TabsTrigger value="cursos">Cursos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ia" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Serviços IA Ativos</CardTitle></CardHeader>
            <CardContent>
              <div className="p-8 text-center text-slate-500 border border-dashed rounded-md">
                Lista de prompts cadastrados pelos psicólogos aparecerá aqui.
                <br/>
                <Button variant="link" onClick={notify}>Ver Logs de Execução OpenAI</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="especializados" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Serviços Especializados (Kanban Admin)</CardTitle></CardHeader>
            <CardContent>
              <div className="p-8 text-center text-slate-500 border border-dashed rounded-md">
                Gerencie solicitações abertas, atribua revisores e anexe arquivos finais.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cursos" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Catálogo de Cursos</CardTitle></CardHeader>
            <CardContent>
               <div className="p-8 text-center text-slate-500 border border-dashed rounded-md">
                Moderação de cursos publicados na plataforma.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
