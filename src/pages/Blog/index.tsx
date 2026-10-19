import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { blogArticles } from '../../data/blog';

export const Blog: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-widest text-forest font-bold">Bitácora Botánica</span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-forest-dark">Diario de Naturaleza</h1>
        <p className="text-xs sm:text-sm text-stone-500 font-light max-w-lg mx-auto">
          Explora reflexiones sobre el cuidado vegetal, tradiciones simbólicas y consejos prácticos para cultivar tu bienestar verde en casa.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogArticles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Image Banner */}
              <Link
                to={`/blog/${article.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-[16/10] bg-stone-50 overflow-hidden"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </Link>

              {/* Text details */}
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-[10px] text-stone-400 font-semibold uppercase tracking-wider">
                  <span className="bg-stone-50 text-stone-500 px-2 py-0.5 rounded border border-stone-200/50">
                    {article.category}
                  </span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>
                
                <Link
                  to={`/blog/${article.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <h3 className="text-lg font-serif font-bold text-forest-dark hover:text-forest transition-colors cursor-pointer line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                </Link>
                
                <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed font-light">
                  {article.summary}
                </p>
              </div>
            </div>

            {/* Read Button footer */}
            <div className="p-6 pt-0 border-t border-stone-50 flex items-center justify-between text-xs mt-4">
              <span className="text-stone-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime} de lectura
              </span>
              <Link
                to={`/blog/${article.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-forest font-bold hover:underline flex items-center gap-1 transition-all hover:translate-x-0.5"
              >
                Leer más
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
