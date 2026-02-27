
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function PsychologistServices() {
  const { toast } = useToast();
  const notify = () => toast({ description: "🚧 Criação de serviços em desenvolvimento! 🚀" });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Loja de Serviços</h1>
        <Button onClick={notify}>+ Criar Novo Serviço</Button>
      </div>

      <Tabs defaultValue="ai" className="w-full">
        <TabsList>
          <TabsTrigger value="ai">Serviços de IA (Prompts)</TabsTrigger>
          <TabsTrigger value="specialized">Especializados (Kanban)</TabsTrigger>
          <TabsTrigger value="courses">Cursos e Trilhas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ai" className="mt-4">
          <Card><CardContent className="p-8 text-center text-slate-500 border border-dashed rounded-md mt-4">
            Crie prompts automatizados que seus pacientes podem consumir usando Ayucoins.
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="specialized" className="mt-4">
          <Card><CardContent className="p-8 text-center text-slate-500 border border-dashed rounded-md mt-4">
            Gerencie entregas personalizadas (ex: Laudos, Testes Vocacionais) através de um painel Kanban.
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="courses" className="mt-4">
          <Card><CardContent className="p-8 text-center text-slate-500 border border-dashed rounded-md mt-4">
            Publique cursos em vídeo ou texto e gere receita passiva.
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
