
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function PatientManagementPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => { fetchPatients(); }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('patients')
        .select(`id, full_name, created_at, users(email, is_active), ayucoin_wallets(balance, total_spent)`)
        .limit(50);
      if (error) throw error;
      setPatients(data || []);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Erro', description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const notify = () => toast({ description: "🚧 Em desenvolvimento! 🚀" });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gestão de Pacientes</h1>

      <Card>
        <CardHeader className="flex flex-row gap-4 py-4">
          <Input placeholder="Buscar por nome ou email..." className="max-w-sm" />
          <Button variant="outline" onClick={notify}>Filtros</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="p-3 font-medium">Nome</th>
                  <th className="p-3 font-medium">Email</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Saldo AC</th>
                  <th className="p-3 font-medium">Cadastro</th>
                  <th className="p-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? <tr><td colSpan="6" className="p-4 text-center">Carregando...</td></tr> : 
                  patients.map((pat) => (
                  <tr key={pat.id} className="hover:bg-slate-50">
                    <td className="p-3 font-medium text-slate-900">{pat.full_name}</td>
                    <td className="p-3 text-slate-500">{pat.users?.email}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${pat.users?.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {pat.users?.is_active ? 'Ativo' : 'Bloqueado'}
                      </span>
                    </td>
                    <td className="p-3">{pat.ayucoin_wallets?.[0]?.balance || 0}</td>
                    <td className="p-3">{new Date(pat.created_at).toLocaleDateString()}</td>
                    <td className="p-3 text-right space-x-2">
                      <Button variant="ghost" size="sm" onClick={notify}>Ver Perfil</Button>
                      <Button variant="ghost" size="sm" className="text-red-600" onClick={notify}>Bloquear</Button>
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
