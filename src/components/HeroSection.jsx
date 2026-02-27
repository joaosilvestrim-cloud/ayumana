
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="min-h-screen pt-20 flex items-center bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-black/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-12 items-center z-10 py-12">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center md:text-left space-y-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Saúde Mental <br className="hidden md:block"/> Integrada
          </h1>
          <p className="text-xl text-white/90 font-medium max-w-lg mx-auto md:mx-0">
            Conecte-se com psicólogos qualificados e cuide da sua saúde mental
          </p>
          <p className="text-lg text-white/80 max-w-lg mx-auto md:mx-0">
            Ayumana é a plataforma que une pacientes e profissionais de psicologia em um espaço seguro e acessível.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
            <Link to="/register?type=patient" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-primary hover:bg-[#5a8c39] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg py-6 px-8 rounded-xl">
                Começar como Paciente
              </Button>
            </Link>
            <Link to="/register?type=psychologist" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg py-6 px-8 rounded-xl">
                Sou Psicólogo
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="hidden md:block relative"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-secondary/20 z-10 mix-blend-multiply"></div>
            <img 
              src="https://images.unsplash.com/photo-1675270714610-11a5cadcc7b3" 
              alt="Pessoa sorrindo usando notebook, representando cuidado com a saúde mental"
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
