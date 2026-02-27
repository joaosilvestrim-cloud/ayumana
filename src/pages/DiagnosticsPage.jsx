
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DiagnosticsPage() {
  const [results, setResults] = useState({
    clientInit: { status: 'pending', detail: '' },
    authService: { status: 'pending', detail: '' },
    dbConnection: { status: 'pending', detail: '' },
  });
  const [isRunning, setIsRunning] = useState(false);

  const runDiagnostics = async () => {
    setIsRunning(true);
    setResults({
      clientInit: { status: 'pending', detail: '' },
      authService: { status: 'pending', detail: '' },
      dbConnection: { status: 'pending', detail: '' },
    });

    // 1. Check Client Init
    let clientOk = false;
    try {
      if (supabase && supabase.auth) {
        setResults(prev => ({ ...prev, clientInit: { status: 'success', detail: 'Supabase client and auth module available.' } }));
        clientOk = true;
      } else {
        throw new Error('Supabase client is null or missing auth module');
      }
    } catch (e) {
      setResults(prev => ({ ...prev, clientInit: { status: 'error', detail: e.message } }));
    }

    // 2. Check Auth Service (Get Session)
    if (clientOk) {
      try {
        const { error } = await supabase.auth.getSession();
        if (error) throw error;
        setResults(prev => ({ ...prev, authService: { status: 'success', detail: 'Auth getSession() succeeded.' } }));
      } catch (e) {
        setResults(prev => ({ ...prev, authService: { status: 'error', detail: e.message || 'Auth service error' } }));
      }
    }

    // 3. Check DB Connection
    if (clientOk) {
      try {
        const { error } = await supabase.from('users').select('id').limit(1);
        if (error) {
          // If RLS blocks it, it's still a successful connection, just unauthorized.
          if (error.code === 'PGRST301' || error.code === '42P01') {
            setResults(prev => ({ ...prev, dbConnection: { status: 'warning', detail: `Connected, but query failed: ${error.message}` } }));
          } else {
            throw error;
          }
        } else {
          setResults(prev => ({ ...prev, dbConnection: { status: 'success', detail: 'Database query executed successfully.' } }));
        }
      } catch (e) {
        setResults(prev => ({ ...prev, dbConnection: { status: 'error', detail: e.message || 'Database connection error' } }));
      }
    }

    setIsRunning(false);
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  const getStatusIcon = (status) => {
    if (status === 'pending') return <Loader2 className="animate-spin text-slate-400" size={24} />;
    if (status === 'success') return <CheckCircle className="text-green-500" size={24} />;
    if (status === 'error') return <XCircle className="text-red-500" size={24} />;
    if (status === 'warning') return <AlertTriangle className="text-yellow-500" size={24} />;
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link to="/login" className="inline-flex items-center text-sm text-slate-600 hover:text-primary mb-4">
            <ArrowLeft size={16} className="mr-2" /> Voltar para Login
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Diagnóstico do Sistema</h1>
          <p className="text-slate-600 mt-2">Verificação de integridade dos serviços do Supabase.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="font-semibold text-slate-800">Resultados</h2>
            <Button onClick={runDiagnostics} disabled={isRunning} variant="outline" size="sm">
              {isRunning ? 'Executando...' : 'Re-executar Testes'}
            </Button>
          </div>
          
          <div className="divide-y divide-slate-100">
            {Object.entries({
              clientInit: '1. Inicialização do Cliente',
              authService: '2. Serviço de Autenticação',
              dbConnection: '3. Conexão com Banco de Dados'
            }).map(([key, label]) => (
              <div key={key} className="p-6 flex items-start gap-4">
                <div className="mt-1">{getStatusIcon(results[key].status)}</div>
                <div className="flex-1">
                  <h3 className="font-medium text-slate-900">{label}</h3>
                  <p className={`text-sm mt-1 ${results[key].status === 'error' ? 'text-red-600 font-mono' : 'text-slate-500'}`}>
                    {results[key].detail || (results[key].status === 'pending' ? 'Aguardando execução...' : 'Sem detalhes')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-6 text-sm text-blue-800">
          <h4 className="font-semibold mb-2">Informações de Ambiente</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>URL do Supabase configurada: {import.meta.env.VITE_SUPABASE_URL ? 'Sim' : 'Não'}</li>
            <li>Anon Key do Supabase configurada: {import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Sim' : 'Não'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
