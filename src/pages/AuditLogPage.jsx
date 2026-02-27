
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function AuditLogPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('audit_logs')
        .select(`id, action, entity_type, created_at, users(email)`)
        .order('created_at', { ascending: false })
        .limit(30);
      if (error) throw error;
      setLogs(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    if (!logs.length) return toast({ description: "Nenhum dado para exportar." });
    
    const headers = ["Timestamp", "Usuário", "Ação", "Entidade"];
    const rows = logs.map(l => [
      new Date(l.created_at).toISOString(),
      l.users?.email || 'Sistema',
      l.action,
      l.entity_type
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "audit_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Exportado", description: "O download iniciou." });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Logs de Auditoria</h1>
        <Button onClick={exportCSV}>Exportar CSV</Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-4 py-4">
          <Input placeholder="Filtrar eventos..." className="max-w-sm" />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="p-3 font-medium">Data/Hora</th>
                  <th className="p-3 font-medium">Usuário</th>
                  <th className="p-3 font-medium">Ação</th>
                  <th className="p-3 font-medium">Entidade</th>
                  <th className="p-3 font-medium text-right">Detalhes</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? <tr><td colSpan="5" className="p-4 text-center">Carregando...</td></tr> : 
                  logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="p-3 text-slate-500">{new Date(log.created_at).toLocaleString()}</td>
                    <td className="p-3 font-medium">{log.users?.email || 'SISTEMA'}</td>
                    <td className="p-3"><span className="bg-slate-100 text-slate-800 px-2 py-1 rounded text-xs">{log.action}</span></td>
                    <td className="p-3 text-slate-500">{log.entity_type}</td>
                    <td className="p-3 text-right">
                      <Button variant="ghost" size="sm" onClick={() => toast({description: "🚧 JSON Viewer em breve! 🚀"})}>JSON</Button>
                    </td>
                  </tr>
                ))}
                {!loading && logs.length === 0 && (
                  <tr><td colSpan="5" className="p-4 text-center text-slate-500">Nenhum log encontrado.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
