import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import { ProductGrid } from '../../components/products/ProductGrid';

export const Favorites: React.FC = () => {
  const favorites = useFavoritesStore((state) => state.favorites);
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header & Back Button */}
      <div className="space-y-4 border-b border-stone-200/50 pb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-stone-500 hover:text-forest transition-colors text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver atrás
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center border border-rose-100">
            <Heart className="w-5 h-5 fill-rose-500" />
          </div>
          <h1 className="text-3xl font-serif font-black text-forest-dark">Tus plantas favoritas</h1>
        </div>
        <p className="text-xs sm:text-sm text-stone-500 font-light">
          Aquí guardamos las plantas, macetas y productos que han resonado especialmente contigo.
        </p>
      </div>

      {/* Grid Display */}
      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-white border border-stone-100 p-8 sm:p-16 rounded-[2.5rem] shadow-sm max-w-md mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-serif font-bold text-stone-700">Aún no tienes favoritos</h3>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Mientras exploras nuestra tienda, puedes marcar las plantas que llamen tu atención para guardarlas en este rincón.
            </p>
          </div>
          <button
            onClick={() => navigate('/tienda')}
            className="btn-primary px-8 py-2.5 rounded-full text-xs font-semibold mx-auto"
          >
            Explorar Tienda
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-xs text-stone-400 font-semibold uppercase tracking-wider pl-1">
            Mostrando {favorites.length} {favorites.length === 1 ? 'producto guardado' : 'productos guardados'}
          </div>
          <ProductGrid products={favorites} />
        </div>
      )}

    </div>
  );
};
