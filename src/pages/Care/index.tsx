import React, { useState } from 'react';
import { Sun, Droplet, Leaf, Thermometer, ShieldAlert, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { careGuides } from '../../data/care';

export const Care: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'Orquídeas' | 'Anturios' | 'Suculentas' | 'Bonsáis'>('Orquídeas');
  const [openProblemIdx, setOpenProblemIdx] = useState<number | null>(null);

  const currentGuide = careGuides.find((guide) => guide.category === activeCategory);

  const categories: ('Orquídeas' | 'Anturios' | 'Suculentas' | 'Bonsáis')[] = [
    'Orquídeas',
    'Anturios',
    'Suculentas',
    'Bonsáis'
  ];

  const handleToggleProblem = (idx: number) => {
    setOpenProblemIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-widest text-forest font-bold">Manual de Horticultura</span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-forest-dark">Aprende a cuidar tu planta</h1>
        <p className="text-xs sm:text-sm text-stone-500 font-light max-w-md mx-auto">
          El secreto de una planta feliz radica en comprender sus necesidades biológicas. Selecciona un grupo para guías de experto.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-stone-200 pb-2 scrollbar-none justify-start md:justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setOpenProblemIdx(null);
            }}
            className={`px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-full border transition-smooth whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-forest border-forest text-white shadow-md'
                : 'bg-transparent border-transparent text-stone-500 hover:text-forest hover:bg-stone-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Guide Content Display */}
      {currentGuide && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
          
          {/* Left Block: Care parameters cards */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl font-serif font-bold text-forest-dark border-b border-stone-100 pb-2">
              Requisitos de Cultivo: {currentGuide.category}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Luz */}
              <div className="p-5 bg-white border border-stone-100 rounded-3xl shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-amber-600">
                  <Sun className="w-5 h-5" />
                  <h3 className="text-xs uppercase tracking-wider font-bold">Luz ☀️</h3>
                </div>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  {currentGuide.light}
                </p>
              </div>

              {/* Agua */}
              <div className="p-5 bg-white border border-stone-100 rounded-3xl shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-sky-600">
                  <Droplet className="w-5 h-5" />
                  <h3 className="text-xs uppercase tracking-wider font-bold">Agua 💧</h3>
                </div>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  {currentGuide.water}
                </p>
              </div>

              {/* Tierra */}
              <div className="p-5 bg-white border border-stone-100 rounded-3xl shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-emerald-700">
                  <Leaf className="w-5 h-5" />
                  <h3 className="text-xs uppercase tracking-wider font-bold">Tierra / Sustrato 🌱</h3>
                </div>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  {currentGuide.soil}
                </p>
              </div>

              {/* Clima */}
              <div className="p-5 bg-white border border-stone-100 rounded-3xl shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-rose-600">
                  <Thermometer className="w-5 h-5" />
                  <h3 className="text-xs uppercase tracking-wider font-bold">Temperatura y Humedad 🌡️</h3>
                </div>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  {currentGuide.temp} Humedad recomendada: {currentGuide.humidity}
                </p>
              </div>
            </div>

            {/* Fertilización */}
            <div className="p-5 bg-stone-50 border border-stone-100 rounded-3xl space-y-2">
              <h3 className="text-xs uppercase tracking-wider text-forest font-bold">Fertilización de Temporada</h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                {currentGuide.fertilizing}
              </p>
            </div>
          </div>

          {/* Right Block: Accordion of Common Problems */}
          <div className="lg:col-span-5 bg-white border border-stone-100 p-6 rounded-3xl shadow-sm space-y-6">
            <div className="flex items-center gap-2 font-bold text-forest-dark text-sm border-b border-stone-100 pb-4">
              <ShieldAlert className="w-5 h-5 text-rose-500" />
              <span>Problemas comunes y Diagnóstico</span>
            </div>

            <div className="space-y-3">
              {currentGuide.commonProblems.map((prob, idx) => {
                const isOpen = openProblemIdx === idx;
                return (
                  <div
                    key={idx}
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                      isOpen ? 'border-rose-100 bg-rose-50/10' : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <button
                      onClick={() => handleToggleProblem(idx)}
                      className="w-full flex items-center justify-between p-4 text-left font-bold text-xs text-stone-800"
                    >
                      <div className="flex items-center gap-2 text-rose-700">
                        <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{prob.problem}</span>
                      </div>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-stone-600 font-light leading-relaxed border-t border-rose-50/50 animate-fade-in">
                        <strong className="font-semibold text-forest block mb-1">Diagnóstico & Solución:</strong>
                        {prob.solution}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Reminder disclaimer */}
            <div className="p-4 bg-emerald-50/30 border border-emerald-100/50 rounded-2xl text-[11px] text-stone-500 leading-relaxed font-light">
              <strong className="font-semibold text-emerald-800 block mb-0.5">💡 Consejo de oro:</strong>
              En el cultivo doméstico, "menos es más" para la hidratación. Es mucho más sencillo revivir una planta deshidratada que salvar una con raíces podridas por encharcamiento.
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
