import React from 'react';
import { Leaf, Heart, Sparkles, ShieldCheck, HelpCircle } from 'lucide-react';

export const About: React.FC = () => {
  const values = [
    {
      icon: <Leaf className="w-5 h-5 text-emerald-800" />,
      title: 'Respeto Natural',
      description: 'Honramos el ciclo biológico de cada planta, fomentando un cultivo paciente y libre de químicos agresivos.'
    },
    {
      icon: <Heart className="w-5 h-5 text-rose-800" />,
      title: 'Bienestar y Compañía',
      description: 'Promovemos el cuidado vegetal como una vía activa para canalizar calma, reducir la ansiedad y adornar con afecto.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-800" />,
      title: 'Espiritualidad Consciente',
      description: 'Compartimos tradiciones y simbolismos energéticos de forma honesta, respetando las creencias de cada hogar.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-indigo-800" />,
      title: 'Calidad Premium',
      description: 'Seleccionamos a mano cada espécimen, asegurando raíces fuertes y hojas vigorosas preparadas para su nuevo hogar.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-20">
      
      {/* Hero section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-forest font-bold bg-forest/5 px-3.5 py-1.5 rounded-full inline-block">
          🌱 Cultivando Conciencia
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-black text-forest-dark leading-tight">
          Nuestra Historia & Filosofía
        </h1>
        <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed">
          "Creemos que cuidar una planta también puede ser una forma de cuidar nuestro espacio y crear pequeños momentos de conexión con la naturaleza."
        </p>
      </section>

      {/* Split Block: History and Photo */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-6 space-y-4">
          <h2 className="text-2xl font-serif font-bold text-forest-dark">¿Cómo nació Armony?</h2>
          <div className="text-stone-600 font-light leading-relaxed text-sm space-y-4">
            <p>
              Armony nació del deseo de redefinir la relación que mantenemos con el reino vegetal en las ciudades. En un mundo acelerado y dominado por las pantallas digitales, a menudo perdemos el anclaje con lo orgánico y lo terrestre.
            </p>
            <p>
              Comenzamos como un pequeño vivero de orquídeas en el que notamos que los clientes no buscaban solo un adorno, sino una presencia constante, un color que alegrara su espacio personal o una guía para calmar su mente a través de la jardinería.
            </p>
            <p>
              Hoy, somos un portal de bienestar integral que combina la botánica premium con las tradiciones culturales de sanación, energía positiva y espiritualidad. Presentamos estos simbolismos con absoluta honestidad, valorándolos como herramientas de mindfulness para enriquecer tu hogar.
            </p>
          </div>
        </div>

        <div className="md:col-span-6 relative flex justify-center">
          <div className="w-full aspect-[4/3] sm:aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white transform -rotate-1">
            <img
              src="https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=800&auto=format&fit=crop"
              alt="Nuestras plantas en vivero local"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-forest font-bold">Pilares Fundamentales</span>
          <h2 className="text-3xl font-serif font-bold text-forest-dark">Valores que nos guían</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-100 p-6 rounded-3xl shadow-sm flex items-start gap-4 hover:shadow-md transition-smooth"
            >
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-100 flex-shrink-0">
                {val.icon}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-serif font-bold text-forest-dark">{val.title}</h3>
                <p className="text-xs text-stone-500 font-light leading-relaxed">{val.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Proceso y Compromiso block */}
      <section className="bg-stone-50 border border-stone-100 rounded-[2.5rem] p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        <div className="space-y-4">
          <h3 className="text-lg font-serif font-bold text-forest-dark flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-forest rounded-full" />
            Proceso de selección local
          </h3>
          <p className="text-xs text-stone-600 font-light leading-relaxed">
            Trabajamos mano a mano con cultivadores locales y expertos horticultores. Cada orquídea, bonsái o suculenta que llega a nuestra colección es aclimatada progresivamente en nuestro vivero de bienestar para garantizar que la transición a tu hogar sea exitosa. Además, priorizamos el uso de fertilizantes orgánicos y sustratos sostenibles como el coco y el pino.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-serif font-bold text-forest-dark flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-forest rounded-full" />
            Nuestro compromiso de compañía
          </h3>
          <p className="text-xs text-stone-600 font-light leading-relaxed">
            Creemos que la venta de una planta no es el final de una transacción, sino el inicio de una compañía viva. Por eso, te proporcionamos guías de cuidado detalladas, diagnóstico de problemas comunes y un recomendador inteligente para que tomes decisiones informadas y sientas el respaldo constante en el camino de la jardinería consciente.
          </p>
        </div>

      </section>

    </div>
  );
};
