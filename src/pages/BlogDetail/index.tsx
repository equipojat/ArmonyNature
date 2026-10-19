import React, { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Clock, ArrowLeft, User, Leaf } from 'lucide-react';
import { blogArticles } from '../../data/blog';

export const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const article = useMemo(() => blogArticles.find((art) => art.id === id), [id]);

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-6 animate-fade-in">
        <h2 className="text-2xl font-serif font-bold text-stone-700">Artículo no encontrado</h2>
        <p className="text-stone-500 max-w-sm mx-auto">El artículo del Diario solicitado no existe.</p>
        <button onClick={() => navigate('/blog')} className="btn-primary mx-auto">
          Volver al Diario
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 animate-slide-up">
      
      {/* Back Button */}
      <Link
        to="/blog"
        className="flex items-center gap-2 text-stone-500 hover:text-forest transition-colors text-sm font-semibold w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al Diario
      </Link>

      {/* Main Container */}
      <article className="bg-white border border-stone-100 rounded-[2.5rem] overflow-hidden shadow-lg flex flex-col">
        
        {/* Banner Image */}
        <div className="relative aspect-[21/9] sm:aspect-[2.39/1] bg-stone-50 overflow-hidden">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-12 space-y-8">
          
          {/* Header Metadata */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs text-stone-400 font-semibold uppercase tracking-wider">
              <span className="text-forest font-bold">{article.category}</span>
              <span>•</span>
              <span>{article.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {article.readTime} de lectura
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-forest-dark leading-tight tracking-tight">
              {article.title}
            </h1>
            
            {/* Author */}
            <div className="flex items-center gap-2 text-stone-400 text-xs py-2 border-y border-stone-100">
              <User className="w-4 h-4 text-stone-300" />
              <span>Escrito por: <strong className="font-semibold text-stone-600">Redacción Armony</strong></span>
            </div>
          </div>

          {/* Body Paragraphs */}
          <div className="text-stone-600 font-light leading-relaxed text-sm sm:text-base space-y-5">
            {article.content.split('\n\n').map((paragraph, index) => {
              const text = paragraph.trim();
              if (!text) return null;
              
              // Si el párrafo empieza con número, es una lista
              if (/^[0-9]\./.test(text)) {
                return (
                  <div key={index} className="pl-4 border-l-2 border-forest/30 py-1 bg-forest/5 rounded-r-xl px-3 my-4">
                    <p className="font-medium text-forest-dark">{text}</p>
                  </div>
                );
              }
              
              return (
                <p key={index} className="indent-0">
                  {text}
                </p>
              );
            })}
          </div>

          {/* Footer Zen Box */}
          <div className="mt-12 p-6 bg-cream border border-forest/10 rounded-3xl flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-forest text-white flex items-center justify-center flex-shrink-0 mt-0.5">
              <Leaf className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs uppercase tracking-widest font-bold text-forest-dark">Sintonía con la Naturaleza</h4>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                Aprender los ritmos vegetales no solo cuida de tus plantas, sino que te ofrece valiosos momentos de desconexión y arraigo natural en tu día a día.
              </p>
            </div>
          </div>

        </div>

      </article>

      {/* Close button if opened in new window */}
      <div className="text-center pt-4">
        <button
          onClick={() => window.close()}
          className="text-xs text-stone-400 hover:text-forest transition-colors py-2 px-4 border border-stone-200 rounded-full hover:bg-stone-50"
        >
          Cerrar Pestaña
        </button>
      </div>

    </div>
  );
};
