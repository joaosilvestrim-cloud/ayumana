
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Briefcase, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FeaturesSection() {
  return (
    <section id="funcionalidades" className="py-20 px-6 md:px-12 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Funcionalidades para Todos</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* PACIENTES */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 md:p-12 border border-slate-100 flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-secondary/10 p-4 rounded-2xl">
                <User size={40} className="text-secondary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Portal do Paciente</h3>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              {[
                "Buscar psicólogos por especialidade e abordagem",
                "Agendar sessões online com rapidez",
                "Acompanhar histórico de sessões e anotações",
                "Gerenciar e utilizar saldo de Ayucoins",
                "Acesso a recursos educativos e materiais de apoio"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="text-primary shrink-0 mt-1" size={20} />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            <Link to="/register?type=patient">
              <Button className="w-full sm:w-auto bg-primary hover:bg-[#5a8c39] text-white font-medium py-6 px-8 text-lg rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02]">
                Explorar como Paciente
              </Button>
            </Link>
          </div>

          {/* PSICÓLOGOS */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 md:p-12 border border-slate-100 flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-secondary/10 p-4 rounded-2xl">
                <Briefcase size={40} className="text-secondary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Painel do Psicólogo</h3>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              {[
                "Gerenciar agenda, disponibilidade e horários",
                "Acompanhar pacientes de forma integrada",
                "Receber pagamentos com segurança (Asaas)",
                "Criar serviços especializados e pacotes",
                "Acessar prontuário clínico digital e seguro"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="text-primary shrink-0 mt-1" size={20} />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            <Link to="/register?type=psychologist">
              <Button className="w-full sm:w-auto bg-primary hover:bg-[#5a8c39] text-white font-medium py-6 px-8 text-lg rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02]">
                Explorar como Psicólogo
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
