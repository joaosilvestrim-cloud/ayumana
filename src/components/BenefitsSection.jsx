
import React from 'react';
import { CheckCircle, Calendar, Lock, DollarSign } from 'lucide-react';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Psicólogos Qualificados",
      description: "Todos os profissionais são verificados e possuem CRP ativo."
    },
    {
      icon: Calendar,
      title: "Agendamento Fácil",
      description: "Agende sessões em minutos, sem burocracia e com total flexibilidade."
    },
    {
      icon: Lock,
      title: "Segurança e Privacidade",
      description: "Seus dados são protegidos com criptografia de ponta a ponta em um ambiente seguro."
    },
    {
      icon: DollarSign,
      title: "Preços Acessíveis",
      description: "Sessões com preços justos e nosso exclusivo sistema de recompensas Ayucoins."
    }
  ];

  return (
    <section id="sobre" className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Por que escolher Ayumana?</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-8 border border-slate-50 flex flex-col items-center text-center sm:items-start sm:text-left sm:flex-row gap-6 group"
              >
                <div className="bg-primary/10 p-4 rounded-full group-hover:bg-primary/20 transition-colors shrink-0">
                  <Icon size={48} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{benefit.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
