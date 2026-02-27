
import React from 'react';
import { Linkedin, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contato" className="bg-secondary text-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12 border-b border-white/10 pb-12">
          
          {/* Logo & Desc */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-primary tracking-tight">Ayumana</h3>
            <p className="text-white/80 leading-relaxed">
              Conectando pacientes e psicólogos para uma saúde mental acessível, segura e de qualidade.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Links Úteis</h4>
            <ul className="space-y-3">
              <li><a href="#sobre" className="text-white/80 hover:text-primary transition-colors">Sobre</a></li>
              <li><a href="#funcionalidades" className="text-white/80 hover:text-primary transition-colors">Funcionalidades</a></li>
              <li><a href="#contato" className="text-white/80 hover:text-primary transition-colors">Contato</a></li>
              <li><a href="#" className="text-white/80 hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Redes Sociais</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-white transition-all">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-white transition-all">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Termos de Serviço</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Política de Cookies</a></li>
            </ul>
          </div>

        </div>

        <div className="text-center text-white/60 text-sm">
          <p>&copy; 2026 Ayumana. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
