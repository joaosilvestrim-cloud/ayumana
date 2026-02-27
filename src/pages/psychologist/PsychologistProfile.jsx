
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

const SPECIALTIES = ['Ansiedade', 'Depressão', 'Relacionamentos', 'Carreira', 'Luto', 'Estresse'];
const AUDIENCES = ['Adolescentes', 'Adultos', 'Casais', 'Famílias'];

export default function PsychologistProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '', crp_number: '', bio: '', therapeutic_approach: '', 
    specialties: [], is_vitrine_active: false
  });

  useEffect(() => {
    if (user) {
      supabase.from('psychologists').select('*').eq('user_id', user.id).maybeSingle()
        .then(({ data }) => {
          if (data) {
            setProfile({
              full_name: data.full_name || '',
              crp_number: data.crp_number || '',
              bio: data.bio || '',
              therapeutic_approach: data.therapeutic_approach || '',
              specialties: data.specialties || [],
              is_vitrine_active: data.is_vitrine_active || false
            });
          }
        });
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('psychologists').update({
        full_name: profile.full_name,
        crp_number: profile.crp_number,
        bio: profile.bio,
        therapeutic_approach: profile.therapeutic_approach,
        specialties: profile.specialties,
        is_vitrine_active: profile.is_vitrine_active
      }).eq('user_id', user.id);

      if (error) throw error;
      
      // Audit log mockup
      await supabase.from('audit_logs').insert({
        user_id: user.id, action: 'update_profile', entity_type: 'psychologist', changes: profile
      });

      toast({ title: 'Perfil atualizado com sucesso!' });
    } catch (err) {
      toast({ variant: 'destructive', title: 'Erro ao salvar', description: err.message });
    } finally {
      setLoading(false);
    }
  };

  const toggleSpecialty = (sp) => {
    setProfile(p => ({
      ...p, specialties: p.specialties.includes(sp) ? p.specialties.filter(x => x !== sp) : [...p.specialties, sp]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Meu Perfil Profissional</h1>
        <Button onClick={handleSave} disabled={loading}>{loading ? 'Salvando...' : 'Salvar Alterações'}</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Status da Vitrine</CardTitle>
          <CardDescription>Determine se o seu perfil é visível publicamente para pacientes.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <Switch 
            checked={profile.is_vitrine_active} 
            onCheckedChange={(c) => setProfile(p => ({...p, is_vitrine_active: c}))} 
          />
          <span className={`font-medium ${profile.is_vitrine_active ? 'text-green-600' : 'text-slate-500'}`}>
            {profile.is_vitrine_active ? '🟢 Perfil Público (Visível)' : '🔴 Perfil Privado (Oculto)'}
          </span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Dados Básicos</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Nome Completo</label>
              <Input value={profile.full_name} onChange={e => setProfile(p => ({...p, full_name: e.target.value}))} />
            </div>
            <div>
              <label className="text-sm font-medium">Número CRP</label>
              <Input value={profile.crp_number} onChange={e => setProfile(p => ({...p, crp_number: e.target.value}))} placeholder="00/00000" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Bio Estratégica (Máx 500 carac.)</label>
            <textarea 
              className="flex min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900" 
              value={profile.bio} 
              onChange={e => setProfile(p => ({...p, bio: e.target.value}))}
              maxLength={500}
            />
            <p className="text-xs text-slate-500 text-right mt-1">{profile.bio.length}/500</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Especialidades e Abordagem</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium block mb-2">Especialidades</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SPECIALTIES.map(sp => (
                <div key={sp} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`sp-${sp}`} 
                    checked={profile.specialties.includes(sp)}
                    onCheckedChange={() => toggleSpecialty(sp)}
                  />
                  <label htmlFor={`sp-${sp}`} className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {sp}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Abordagem Terapêutica</label>
            <Input 
              placeholder="Ex: Terapia Cognitivo-Comportamental (TCC)" 
              value={profile.therapeutic_approach} 
              onChange={e => setProfile(p => ({...p, therapeutic_approach: e.target.value}))}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
