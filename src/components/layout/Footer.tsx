import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Send, ShieldCheck, CreditCard, Truck } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-forest-dark text-stone-300 pt-16 pb-8 border-t border-forest/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-sage group-hover:bg-sage group-hover:text-white transition-smooth">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white leading-none">
                Armony <span className="text-sage">Plantas</span>
              </span>
            </Link>
            <p className="text-sm text-stone-400 max-w-sm font-light leading-relaxed">
              "Una planta no solamente decora un espacio; puede convertirse en compañía, conexión con la naturaleza y un símbolo de bienestar."
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-sage hover:text-white transition-smooth text-stone-400"
                title="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-sage hover:text-white transition-smooth text-stone-400"
                title="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-sage hover:text-white transition-smooth text-stone-400"
                title="TikTok"
              >
                {/* TikTok Custom Icon (or Lucide alternative) */}
                <span className="text-[10px] font-bold">TT</span>
              </a>
            </div>
          </div>

          {/* Catalog Column */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-white font-bold">Tienda</h3>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link to="/tienda?categoria=Orquideas" className="hover:text-sage transition-colors">
                  Orquídeas
                </Link>
              </li>
              <li>
                <Link to="/tienda?categoria=Anturios" className="hover:text-sage transition-colors">
                  Anturios
                </Link>
              </li>
              <li>
                <Link to="/tienda?categoria=Suculentas" className="hover:text-sage transition-colors">
                  Suculentas
                </Link>
              </li>
              <li>
                <Link to="/tienda?categoria=Bonsais" className="hover:text-sage transition-colors">
                  Bonsáis
                </Link>
              </li>
              <li>
                <Link to="/tienda?categoria=Materas" className="hover:text-sage transition-colors">
                  Materas
                </Link>
              </li>
            </ul>
          </div>

          {/* Info Column */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-white font-bold">Información</h3>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link to="/nosotros" className="hover:text-sage transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/cuidados" className="hover:text-sage transition-colors">
                  Guía de Cuidados
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-sage transition-colors">
                  Diario de Naturaleza
                </Link>
              </li>
              <li>
                <Link to="/encuentra-tu-planta" className="hover:text-sage transition-colors">
                  Recomendador
                </Link>
              </li>
              <li>
                <a href="#contacto" className="hover:text-sage transition-colors">
                  Contacto / FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-white font-bold">Boletín</h3>
            <p className="text-sm text-stone-400 font-light leading-relaxed">
              Recibe consejos semanales para cuidar tus plantas y ofertas especiales de temporada.
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                required
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-sm text-white placeholder-stone-500 outline-none focus:border-sage focus:ring-1 focus:ring-sage"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 w-8 h-8 rounded-full bg-sage text-white flex items-center justify-center hover:bg-sage-dark transition-smooth"
                title="Suscribirse"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-sage animate-fade-in font-medium mt-1">
                ¡Gracias por suscribirte a nuestro boletín! 🌱
              </p>
            )}
          </div>

        </div>

        {/* Footer Bottom Perks & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Perks */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-sage" />
              <span>Envíos locales garantizados</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-sage" />
              <span>Pagos seguros online</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sage" />
              <span>Plantas sanas garantizadas</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-xs text-stone-500 text-center md:text-right">
            <p>© {new Date().getFullYear()} Armony Plantas S.A.S. Todos los derechos reservados.</p>
            <p className="mt-1 text-[10px] text-stone-600">
              Diseño premium de bienestar y conexión con la naturaleza.
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
};
