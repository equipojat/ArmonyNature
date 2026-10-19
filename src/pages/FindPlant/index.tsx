import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Sparkles, Heart, Sun, HeartHandshake, Smile, RefreshCw, Eye, ShoppingCart } from 'lucide-react';
import { products } from '../../data/products';
import { useCartStore } from '../../store/useCartStore';
import { formatPrice } from '../../utils';

interface QuestionOption {
  id: 'calma' | 'conexion' | 'compania' | 'simbolismo' | 'decorar' | 'facil';
  text: string;
  subtext: string;
  icon: React.ReactNode;
}

export const FindPlant: React.FC = () => {
  const [step, setStep] = useState<'welcome' | 'quiz' | 'loading' | 'result'>('welcome');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [recommendedPlantId, setRecommendedPlantId] = useState<string>('');
  const [recommendationReason, setRecommendationReason] = useState<string>('');

  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const options: QuestionOption[] = [
    {
      id: 'calma',
      text: 'Quiero traer calma a mi espacio',
      subtext: 'Busco ambientes relajantes que reduzcan el estrés del día a día.',
      icon: <HeartHandshake className="w-5 h-5 text-emerald-700" />
    },
    {
      id: 'conexion',
      text: 'Quiero sentir más conexión con la naturaleza',
      subtext: 'Deseo aprender a sintonizar con los ritmos biológicos y naturales.',
      icon: <Compass className="w-5 h-5 text-amber-700" />
    },
    {
      id: 'compania',
      text: 'Busco una planta que me acompañe',
      subtext: 'Ideal para espacios personales donde estudio, trabajo o descanso solo.',
      icon: <Heart className="w-5 h-5 text-rose-700" />
    },
    {
      id: 'simbolismo',
      text: 'Me interesa su simbolismo espiritual',
      subtext: 'Quiero plantas asociadas con prosperidad, protección y tradiciones.',
      icon: <Sparkles className="w-5 h-5 text-indigo-700" />
    },
    {
      id: 'decorar',
      text: 'Quiero decorar mi espacio',
      subtext: 'Busco formas escultóricas y colores vibrantes de alto impacto visual.',
      icon: <Sun className="w-5 h-5 text-orange-700" />
    },
    {
      id: 'facil',
      text: 'Quiero una planta fácil de cuidar',
      subtext: 'Tengo poco tiempo o soy principiante en el mundo de la jardinería.',
      icon: <Smile className="w-5 h-5 text-teal-700" />
    }
  ];

  const handleOptionSelect = (optionId: QuestionOption['id']) => {
    setSelectedOption(optionId);
    setStep('loading');

    // Mapear opciones a plantas reales y redactar razones personalizadas
    setTimeout(() => {
      let plantId = 'suculenta-echeveria';
      let reason = '';

      switch (optionId) {
        case 'calma':
          plantId = 'orquidea-phalaenopsis';
          reason = 'La Orquídea Phalaenopsis es sinónimo de serenidad. Su floración duradera y contemplación visual reducen significativamente el estrés, infundiendo un aura de paz interior ideal para tus áreas de descanso.';
          break;
        case 'conexion':
          plantId = 'bonsai-ficus';
          reason = 'El Bonsái Ficus es la mejor herramienta de conexión vegetal. Su modelado diario actúa como una meditación activa sobre el tiempo y la constancia, recordándote que la vida se cultiva con cuidado paso a paso.';
          break;
        case 'compania':
          plantId = 'anturio-blanco';
          reason = 'El Anturio Blanco, con su follaje abundante y hojas en forma de corazón, ofrece una reconfortante presencia silenciosa. Es una compañera excelente que purifica tu aire mientras lees, trabajas o descansas.';
          break;
        case 'simbolismo':
          plantId = 'suculenta-crassula';
          reason = 'El Árbol de Jade (Crassula Ovata) es muy apreciado en la tradición del Feng Shui. Sus hojas en forma de monedas simbolizan el flujo de la abundancia, la prosperidad y la renovación constante en el hogar.';
          break;
        case 'decorar':
          plantId = 'anturio-rojo';
          reason = 'El Anturio Rojo brinda una explosión estética inigualable. Sus espatas rojas y brillantes contrastan con el verde oscuro del follaje, convirtiéndose en el centro de atención decorativo de tu salón.';
          break;
        case 'facil':
          plantId = 'suculenta-haworthia';
          reason = 'La Haworthia Fasciata (Planta Cebra) es sumamente resistente y compacta. Almacena agua en sus hojas, tolera luz indirecta media y solo requiere riego cada 20 días, ideal si estás iniciando tu selva urbana.';
          break;
      }

      setRecommendedPlantId(plantId);
      setRecommendationReason(reason);
      setStep('result');
    }, 2000); // Simulación de carga espiritual/botánica
  };

  const recommendedPlant = products.find((p) => p.id === recommendedPlantId);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      
      {/* 1. WELCOME SCREEN */}
      {step === 'welcome' && (
        <div className="text-center space-y-8 bg-white border border-stone-100 p-8 sm:p-16 rounded-[3rem] shadow-sm max-w-2xl mx-auto animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-forest/5 text-forest flex items-center justify-center mx-auto">
            <Compass className="w-8 h-8" />
          </div>
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-forest font-bold">Experiencia Interactiva</span>
            <h1 className="text-3xl sm:text-4xl font-serif font-black text-forest-dark">Encuentra tu planta ideal</h1>
            <p className="text-sm text-stone-500 font-light leading-relaxed max-w-md mx-auto">
              Cuidar una planta es el inicio de una hermosa relación. Responde a nuestra pregunta para sintonizar tu vibración con la de tu compañera botánica.
            </p>
          </div>
          <button
            onClick={() => setStep('quiz')}
            className="btn-primary px-8 py-3 rounded-full text-sm font-semibold mx-auto"
          >
            Iniciar Cuestionario
          </button>
        </div>
      )}

      {/* 2. QUIZ SCREEN */}
      {step === 'quiz' && (
        <div className="space-y-10 animate-slide-up">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-forest font-bold">Pregunta 1 de 1</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-forest-dark">¿Qué buscas en una planta?</h2>
            <p className="text-xs sm:text-sm text-stone-400 font-light max-w-sm mx-auto">
              Selecciona la opción que mejor describa tu intención principal hoy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleOptionSelect(opt.id)}
                className="bg-white border border-stone-200 hover:border-forest/50 hover:bg-forest/5 text-left p-5 rounded-2xl flex items-start gap-4 transition-all duration-300 shadow-sm group hover:-translate-y-0.5"
              >
                <div className="p-2.5 bg-stone-50 rounded-xl group-hover:bg-white transition-colors border border-stone-100 flex-shrink-0">
                  {opt.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-800 group-hover:text-forest transition-colors leading-tight">
                    {opt.text}
                  </h4>
                  <p className="text-xs text-stone-400 font-light mt-1 leading-snug">
                    {opt.subtext}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. LOADING SCREEN */}
      {step === 'loading' && (
        <div className="text-center space-y-6 py-20 max-w-md mx-auto animate-pulse">
          <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center mx-auto text-forest animate-spin">
            🌿
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-serif font-bold text-forest-dark">Sintonizando tu energía...</h3>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Buscando en nuestro vivero de bienestar las variedades botánicas que mejor resuenan con tus intenciones.
            </p>
          </div>
        </div>
      )}

      {/* 4. RESULT SCREEN */}
      {step === 'result' && recommendedPlant && (
        <div className="space-y-10 animate-slide-up max-w-2xl mx-auto">
          
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-forest font-bold">¡Recomendación lista!</span>
            <h2 className="text-3xl font-serif font-black text-forest-dark">Creemos que te encantará esta planta</h2>
          </div>

          <div className="bg-white border border-stone-100 rounded-[2.5rem] overflow-hidden shadow-xl flex flex-col md:flex-row items-stretch">
            {/* Image */}
            <div className="md:w-1/2 aspect-[4/5] md:aspect-auto bg-stone-50 overflow-hidden relative">
              <img
                src={recommendedPlant.images[0]}
                alt={recommendedPlant.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-gold text-white text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full shadow-sm">
                Afinidad Recomendada
              </span>
            </div>

            {/* Content card info */}
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-stone-400 uppercase tracking-widest font-semibold">
                    {recommendedPlant.category}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-forest-dark mt-1">
                    {recommendedPlant.name}
                  </h3>
                  <span className="text-xs text-stone-500 font-medium">
                    Dificultad: <span className="font-bold">{recommendedPlant.difficulty}</span>
                  </span>
                </div>

                <div className="space-y-2 bg-[#faf9f6] p-4 rounded-2xl border border-stone-100">
                  <span className="text-[10px] font-bold text-forest uppercase tracking-widest">¿Por qué es para ti?</span>
                  <p className="text-xs text-stone-600 font-light leading-relaxed">
                    {recommendationReason}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-stone-100">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-stone-400">Precio</span>
                  <span className="text-lg font-bold text-forest">{formatPrice(recommendedPlant.price)}</span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/producto/${recommendedPlant.id}`)}
                    className="flex-1 btn-secondary py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-4 h-4" />
                    Ver detalles
                  </button>
                  <button
                    onClick={() => addItem(recommendedPlant)}
                    className="btn-primary py-2.5 rounded-xl text-xs font-bold px-4 flex items-center justify-center"
                    title="Agregar al carrito"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setSelectedOption(null);
                setStep('quiz');
              }}
              className="text-stone-400 hover:text-forest hover:underline text-xs flex items-center gap-1.5 mx-auto py-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Volver a realizar la prueba
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
