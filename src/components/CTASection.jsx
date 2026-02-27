
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  return (
    <section className="min-h-[400px] flex items-center justify-center py-20 px-6 md:px-12 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="max-w-4xl mx-auto text-center z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          Pronto para dar o primeiro passo?
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Junte-se a milhares de pessoas cuidando da sua saúde mental e profissionais transformando vidas.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/register?type=patient" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-[#5a8c39] text-white py-6 px-8 text-lg font-medium shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-xl">
              Registrar como Paciente
            </Button>
          </Link>
          <Link to="/register?type=psychologist" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-2 border-white/50 text-white hover:bg-white hover:text-secondary py-6 px-8 text-lg font-medium shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-xl">
              Registrar como Psicólogo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
