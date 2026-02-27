
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, FileText, Lock } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export default function SessionNotes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const notify = () => toast({ description: "🚧 Salvamento de prontuário em desenvolvimento! 🚀" });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft /></Button>
          <h1 className="text-2xl font-bold text-slate-900">Prontuário da Sessão</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">Último salvamento: Hoje, 14:05</span>
          <Button onClick={notify} className="gap-2"><Save size={16} /> Salvar Evolução</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center pb-2">
              <CardTitle>Anotações da Sessão</CardTitle>
              <div className="flex items-center gap-2">
                <Lock size={14} className="text-slate-400" />
                <span className="text-sm text-slate-600">Nota Privada</span>
                <Switch defaultChecked />
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md bg-white">
                <div className="flex gap-2 p-2 border-b bg-slate-50">
                  <Button variant="ghost" size="sm" className="h-8 px-2 font-bold" onClick={notify}>B</Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2 italic" onClick={notify}>I</Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2 underline" onClick={notify}>U</Button>
                </div>
                <textarea 
                  className="w-full min-h-[400px] p-4 resize-y focus:outline-none text-slate-900" 
                  placeholder="Escreva a evolução do paciente aqui..."
                ></textarea>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Paciente: Ana Clara</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
              <p><strong>Idade:</strong> 28 anos</p>
              <p><strong>Sessão Atual:</strong> {id}</p>
              <p><strong>Total de Sessões:</strong> 12</p>
              <Button variant="link" className="px-0" onClick={notify}>Ver Histórico Completo</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><FileText size={18}/> Documentos Anexos</CardTitle></CardHeader>
            <CardContent>
              <div className="border border-dashed p-6 rounded text-center text-slate-500 mb-4">
                Arraste PDFs ou Imagens aqui (Máx 10MB)
              </div>
              <Button variant="outline" className="w-full" onClick={notify}>Procurar Arquivo</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
