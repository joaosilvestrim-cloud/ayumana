
import React from 'react';
import { motion } from 'framer-motion';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Left side - Gradient */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#6BA644] to-[#1B4D5C] p-12 flex-col justify-center items-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-10 text-center max-w-md"
        >
          <div className="mb-8 flex justify-center">
            {/* Logo placeholder */}
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-4xl font-bold">A</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Ayumana</h1>
          <p className="text-lg text-white/90 leading-relaxed">
            Plataforma de saúde mental integrada. Transformando vidas através do cuidado e tecnologia.
          </p>
        </motion.div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100 relative">
          {/* Mobile Logo */}
          <div className="md:hidden flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#6BA644] to-[#1B4D5C] rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">A</span>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
