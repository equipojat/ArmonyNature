import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useCartStore } from '../../store/useCartStore';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import { formatPrice, getDifficultyColor } from '../../utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  const isFav = isFavorite(product.id);

  return (
    <div className="group relative bg-white rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden h-full">
      
      {/* Product Image & Badges */}
      <Link to={`/producto/${product.id}`} className="relative block aspect-[4/5] bg-stone-50 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Floating Heart Button */}
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-stone-400 hover:text-rose-500 hover:bg-white active:scale-90 transition-smooth"
          title={isFav ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
        >
          <Heart className={`w-4 h-4 transition-colors ${isFav ? 'fill-rose-500 text-rose-500' : 'text-stone-500'}`} />
        </button>

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.tag && (
            <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full shadow-sm ${
              product.tag === 'Más vendido'
                ? 'bg-gold text-white'
                : product.tag === 'Nuevo'
                ? 'bg-forest text-white'
                : 'bg-sage-dark text-white'
            }`}>
              {product.tag}
            </span>
          )}
          <span className={`text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full border shadow-sm ${getDifficultyColor(product.difficulty)}`}>
            {product.difficulty}
          </span>
        </div>
      </Link>

      {/* Info Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            {product.category}
          </span>
          <Link to={`/producto/${product.id}`}>
            <h3 className="text-lg font-serif font-bold text-forest-dark hover:text-forest transition-colors leading-tight line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-stone-500 line-clamp-2 font-light leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 pt-1">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-stone-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] font-semibold text-stone-500">
              {product.rating} ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-50">
          <div className="flex flex-col">
            <span className="text-[10px] text-stone-400 uppercase tracking-widest leading-none font-medium">
              Precio
            </span>
            <span className="text-base font-bold text-forest mt-1">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center shadow-md hover:bg-forest-light hover:shadow-lg active:scale-95 transition-smooth"
            title="Agregar al carrito"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
