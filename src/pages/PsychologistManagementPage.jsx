
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function PsychologistManagementPage() {
  const [psychologists, setPsychologists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => { fetchPsychologists(); }, []);

  const fetchPsychologists = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('psychologists')
        .select(`id, full_name, crp_number, is_vitrine_active, users(email, is_active)`)
        .limit(50);
      if (error) throw error;
      setPsychologists(data || []);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Erro', description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const notify = () => toast({ description: "🚧 Funcionalidade em desenvolvimento! 🚀" });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gestão de Psicólogos</h1>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-4 py-4">
          <Input placeholder="Buscar por nome ou CRP..." className="max-w-sm" />
          <Button variant="outline" onClick={notify}>Filtros</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="p-3 font-medium">Nome</th>
                  <th className="p-3 font-medium">CRP</th>
                  <th className="p-3 font-medium">Status Conta</th>
                  <th className="p-3 font-medium">Vitrine</th>
                  <th className="p-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? <tr><td colSpan="5" className="p-4 text-center">Carregando...</td></tr> : 
                  psychologists.map((psych) => (
                  <tr key={psych.id} className="hover:bg-slate-50">
                    <td className="p-3 font-medium text-slate-900">{psych.full_name}</td>
                    <td className="p-3 text-slate-500">{psych.crp_number}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${psych.users?.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {psych.users?.is_active ? 'Ativo' : 'Suspenso'}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${psych.is_vitrine_active ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                        {psych.is_vitrine_active ? '🟢 Pública' : '🔴 Privada'}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={notify}>Ver Perfil</Button>
                      <Button variant="outline" size="sm" onClick={notify}>Métricas</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
