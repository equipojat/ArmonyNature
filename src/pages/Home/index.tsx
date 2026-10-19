import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HeartHandshake, Sparkles, Compass, Heart, ArrowRight, BookOpen, ChevronRight } from 'lucide-react';
import { products } from '../../data/products';
import { blogArticles } from '../../data/blog';
import { ProductCard } from '../../components/products/ProductCard';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const latestArticles = blogArticles.slice(0, 3);

  const affinities = [
    {
      id: 'Sanacion',
      name: 'Sanación',
      description: 'Plantas asociadas culturalmente con bienestar, calma y ambientes naturales purificadores.',
      icon: <HeartHandshake className="w-6 h-6 text-emerald-800" />,
      image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=600&auto=format&fit=crop',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-100/50'
    },
    {
      id: 'Energia',
      name: 'Energía',
      description: 'Plantas que tradicionalmente se relacionan con la vitalidad, armonía y renovación energética.',
      icon: <Sparkles className="w-6 h-6 text-amber-800" />,
      image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=600&auto=format&fit=crop',
      color: 'bg-amber-50 text-amber-800 border-amber-100/50'
    },
    {
      id: 'Compania',
      name: 'Compañía',
      description: 'Variedades ideales para espacios personales, creando una reconfortante sensación de conexión y vida.',
      icon: <Heart className="w-6 h-6 text-rose-800" />,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop',
      color: 'bg-rose-50 text-rose-800 border-rose-100/50'
    },
    {
      id: 'Espiritualidad',
      name: 'Espiritualidad',
      description: 'Especies vinculadas históricamente con antiguas tradiciones, simbolismos de quietud y prácticas espirituales.',
      icon: <Compass className="w-6 h-6 text-indigo-800" />,
      image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=600&auto=format&fit=crop',
      color: 'bg-indigo-50 text-indigo-800 border-indigo-100/50'
    }
  ];

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative bg-[#f4f1de]/45 rounded-b-[40px] md:rounded-b-[80px] overflow-hidden pt-12 pb-20 md:py-32">
        {/* Background shapes */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-forest/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-sage/10 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Text column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left animate-slide-up">
              <span className="text-xs uppercase tracking-widest text-forest font-bold bg-forest/5 px-3.5 py-1.5 rounded-full inline-block">
                🌿 Conecta con tu esencia verde
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-forest-dark leading-tight">
                Cultiva tu espacio.<br />
                <span className="text-forest">Cultiva tu bienestar.</span>
              </h1>
              <p className="text-base sm:text-lg text-stone-600 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Plantas seleccionadas con amor que transforman tus espacios cotidianos en lugares de conexión, calma, energía renovada y vida.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <button
                  onClick={() => navigate('/tienda')}
                  className="btn-primary"
                >
                  Explorar plantas
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('/encuentra-tu-planta')}
                  className="btn-secondary bg-[#faf9f6]/80"
                >
                  Descubrir cuál es para mí
                </button>
              </div>
            </div>

            {/* Image column */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-all duration-700">
                <img
                  src="https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=800&auto=format&fit=crop"
                  alt="Planta elegante en salón luminoso"
                  className="w-full h-full object-cover"
                />
                
                {/* Floating Card */}
                <div className="absolute bottom-6 left-6 right-6 glass p-4 rounded-2xl flex items-center gap-3 border border-white/20 shadow-lg">
                  <div className="w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center flex-shrink-0">
                    <LeafBadgeIcon />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold leading-none">Consejo de hoy</p>
                    <p className="text-xs text-stone-700 font-medium mt-1 leading-snug">
                      "Un riego consciente fomenta la calma mental."
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Brand Philosophy / Highlight Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
        <div className="max-w-3xl mx-auto space-y-6 py-6 border-y border-stone-200/50">
          <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">Nuestra Filosofía</span>
          <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl italic text-forest-dark leading-relaxed">
            "Una planta no solamente decora un espacio; puede convertirse en compañía, conexión con la naturaleza y un símbolo de bienestar."
          </blockquote>
          <p className="text-xs text-stone-400 max-w-lg mx-auto leading-relaxed">
            * Presentamos los beneficios energéticos y espirituales de nuestras plantas basados en tradiciones culturales y creencias simbólicas con fines de bienestar y relajación. No sustituyen consejos médicos oficiales.
          </p>
        </div>
      </section>

      {/* 3. Encuentra tu Conexión (Affinities) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-forest font-semibold">Colección por Afinidad</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-forest-dark">Encuentra tu conexión</h2>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            Elige plantas alineadas con tus propósitos personales o el ambiente que deseas manifestar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {affinities.map((aff) => (
            <div
              key={aff.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden bg-stone-50">
                  <img
                    src={aff.image}
                    alt={aff.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Details */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl border ${aff.color}`}>
                      {aff.icon}
                    </div>
                    <h3 className="text-lg font-serif font-bold text-forest-dark">
                      {aff.name}
                    </h3>
                  </div>
                  <p className="text-xs text-stone-500 font-light leading-relaxed">
                    {aff.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to={`/tienda?categoria=${aff.id === 'Sanacion' ? 'Orquídeas' : aff.id === 'Energia' ? 'Anturios' : aff.id === 'Compania' ? 'Suculentas' : 'Bonsáis'}`}
                  className="w-full btn-secondary py-2 text-xs flex items-center justify-center gap-1 group-hover:bg-forest group-hover:text-white transition-smooth"
                >
                  Explorar
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Featured Products (Nuestra Colección) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-2">
            <span className="text-xs uppercase tracking-widest text-forest font-semibold">Favoritas de la casa</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-forest-dark">Nuestra colección especial</h2>
          </div>
          <Link
            to="/tienda"
            className="flex items-center gap-1 text-sm font-semibold text-forest hover:text-forest-light transition-colors group"
          >
            Ver toda la colección
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Diario de Naturaleza (Blog Highlights) */}
      <section className="bg-stone-50 py-16 border-y border-stone-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-forest font-semibold">Consejos & Reflexión</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-forest-dark">Diario de naturaleza</h2>
            <p className="text-sm text-stone-500 max-w-md mx-auto">
              Aprende a sintonizar tu energía con la del mundo vegetal a través de nuestras lecturas esenciales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-3xl overflow-hidden border border-stone-200/40 shadow-sm hover:shadow-lg transition-smooth flex flex-col"
              >
                {/* Image */}
                <Link to={`/blog/${article.id}`} target="_blank" rel="noopener noreferrer" className="aspect-[16/10] block overflow-hidden bg-stone-50">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                {/* Info */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[10px] text-stone-400 font-semibold uppercase tracking-wider">
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                    <Link to={`/blog/${article.id}`} target="_blank" rel="noopener noreferrer">
                      <h3 className="text-base font-serif font-bold text-forest-dark hover:text-forest transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed font-light">
                      {article.summary}
                    </p>
                  </div>
                  
                  <div className="pt-2 border-t border-stone-50 flex items-center justify-between text-[11px]">
                    <span className="text-stone-400">Lectura: {article.readTime}</span>
                    <Link to={`/blog/${article.id}`} target="_blank" rel="noopener noreferrer" className="text-forest font-bold hover:underline flex items-center gap-1">
                      Leer artículo
                      <BookOpen className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => navigate('/blog')}
              className="btn-secondary py-3 px-8 font-semibold text-sm inline-flex items-center gap-2"
            >
              Visitar el Diario
              <BookOpen className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

// Simple embedded Icon inside component
const LeafBadgeIcon: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M12 2v20" />
      <path d="M12 10h6" />
      <path d="M6 14h6" />
    </svg>
  );
};
