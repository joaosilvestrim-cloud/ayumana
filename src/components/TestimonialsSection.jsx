
import React from 'react';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Maria Silva",
      profession: "Paciente",
      quote: "Ayumana mudou minha vida. Encontrei um psicólogo excelente, o agendamento é super prático e agora cuido melhor da minha saúde mental.",
      initials: "MS"
    },
    {
      name: "Dr. João Santos",
      profession: "Psicólogo",
      quote: "Plataforma intuitiva e segura. A gestão da agenda e pagamentos centralizada facilita muito meu dia a dia. Meus pacientes adoram.",
      initials: "JS"
    },
    {
      name: "Ana Costa",
      profession: "Paciente",
      quote: "Preços justos, plataforma estável para as videochamadas e profissionais incrivelmente qualificados. Recomendo fortemente para todos!",
      initials: "AC"
    }
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">O que dizem sobre nós</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 hover:shadow-xl transition-shadow flex flex-col"
            >
              <div className="flex items-center gap-1 mb-6 text-[#FFD700]">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <p className="text-slate-700 italic mb-8 flex-1 leading-relaxed">"{item.quote}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-lg shrink-0">
                  {item.initials}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{item.name}</h4>
                  <p className="text-sm text-slate-500">{item.profession}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
