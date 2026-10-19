import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Sun, Droplet, Thermometer, ShieldCheck, ShieldAlert, ArrowLeft, Plus, Minus, HeartHandshake, Sparkles, Compass } from 'lucide-react';
import { products } from '../../data/products';
import { useCartStore } from '../../store/useCartStore';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import { formatPrice, getDifficultyColor } from '../../utils';
import { ProductCard } from '../../components/products/ProductCard';

export const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const product = useMemo(() => products.find((p) => p.id === id), [id]);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'cuidados' | 'sanacion' | 'energia' | 'compania' | 'espiritualidad'>('cuidados');

  const addItem = useCartStore((state) => state.addItem);
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-6">
        <h2 className="text-2xl font-serif font-bold text-stone-700">Ups, esta planta no está en nuestro jardín</h2>
        <p className="text-stone-500 max-w-sm mx-auto">No logramos encontrar el producto solicitado.</p>
        <button onClick={() => navigate('/tienda')} className="btn-primary">
          Volver a la Tienda
        </button>
      </div>
    );
  }

  const isFav = isFavorite(product.id);

  // Incrementar/Decrementar cantidad
  const handleQuantityChange = (val: number) => {
    if (val < 1) return;
    if (val > product.stock) return;
    setQuantity(val);
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  // Buscar 4 productos relacionados de la misma categoría, excluyendo el actual
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-stone-500 hover:text-forest transition-colors text-sm font-semibold w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver atrás
      </button>

      {/* Main product display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Photo Gallery */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Large Image */}
          <div className="aspect-[4/5] rounded-[2.5rem] bg-stone-50 overflow-hidden border border-stone-100 shadow-sm relative">
            <img
              src={product.images[activeImageIdx]}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            {product.tag && (
              <span className="absolute top-6 left-6 bg-forest text-white text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow-md z-10">
                {product.tag}
              </span>
            )}
          </div>

          {/* Thumbnails Row */}
          {product.images.length > 1 && (
            <div className="flex gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 bg-stone-50 flex-shrink-0 transition-smooth ${
                    activeImageIdx === idx ? 'border-forest ring-2 ring-forest/10' : 'border-transparent hover:border-stone-300'
                  }`}
                >
                  <img src={img} alt={`${product.name} miniatura ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Essential Actions & Text */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-400">
              {product.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-black text-forest-dark tracking-tight">
              {product.name}
            </h1>
            
            {/* Rating & Stock */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-stone-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-stone-700 ml-1">
                  {product.rating} ({product.reviewsCount} reseñas)
                </span>
              </div>
              <span className="text-stone-300">|</span>
              <span className={`font-semibold ${product.stock > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                {product.stock > 0 ? `En Stock (${product.stock} unidades)` : 'Agotado'}
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="text-2xl font-bold text-forest">
            {formatPrice(product.price)}
          </div>

          {/* Short Description */}
          <p className="text-stone-600 font-light leading-relaxed text-sm">
            {product.description}
          </p>

          {/* Specs Micro-cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-100 flex flex-col items-center text-center space-y-1">
              <Sun className="w-4 h-4 text-amber-600" />
              <span className="text-[10px] uppercase font-semibold text-stone-400">Iluminación</span>
              <span className="text-xs font-medium text-stone-700 line-clamp-1" title={product.light}>
                {product.light.split(',')[0]}
              </span>
            </div>
            
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-100 flex flex-col items-center text-center space-y-1">
              <Droplet className="w-4 h-4 text-sky-600" />
              <span className="text-[10px] uppercase font-semibold text-stone-400">Riego</span>
              <span className="text-xs font-medium text-stone-700 line-clamp-1" title={product.watering}>
                {product.watering.split('(')[0]}
              </span>
            </div>

            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-100 flex flex-col items-center text-center space-y-1">
              <Thermometer className="w-4 h-4 text-emerald-600" />
              <span className="text-[10px] uppercase font-semibold text-stone-400">Temperatura</span>
              <span className="text-xs font-medium text-stone-700 line-clamp-1" title={product.temperature}>
                {product.temperature}
              </span>
            </div>

            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-100 flex flex-col items-center text-center space-y-1">
              {product.isPetSafe ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-[10px] uppercase font-semibold text-stone-400">Mascotas</span>
                  <span className="text-xs font-medium text-emerald-700">Seguro (Pet Safe)</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4 text-rose-500" />
                  <span className="text-[10px] uppercase font-semibold text-stone-400">Mascotas</span>
                  <span className="text-xs font-medium text-rose-700">Tóxico / Precaución</span>
                </>
              )}
            </div>
          </div>

          {/* Difficulty & Category Detail */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="text-stone-400">Nivel de dificultad:</span>
            <span className={`px-3 py-1 rounded-full font-bold border ${getDifficultyColor(product.difficulty)}`}>
              {product.difficulty}
            </span>
          </div>

          {/* Action Row: Quantity + Cart + Fav */}
          {product.stock > 0 && (
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-stone-100">
              
              {/* Quantity select */}
              <div className="flex items-center border border-stone-200 bg-stone-50 rounded-2xl p-1">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-stone-500 hover:bg-white transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-stone-700">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-stone-500 hover:bg-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-primary py-3 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-md shadow-forest/20 hover:shadow-lg active:scale-95"
              >
                <ShoppingCart className="w-4 h-4" />
                Agregar al carrito
              </button>

              {/* Favorite Toggle Button */}
              <button
                onClick={() => toggleFavorite(product)}
                className={`w-12 h-12 rounded-2xl border flex items-center justify-center hover:bg-stone-50 transition-smooth active:scale-95 ${
                  isFav ? 'border-rose-100 text-rose-500 bg-rose-50/30' : 'border-stone-200 text-stone-400 hover:text-stone-700'
                }`}
                title="Favoritos"
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>

            </div>
          )}

        </div>

      </div>

      {/* "Conoce tu planta" Section (Tabbed view) */}
      <section className="bg-white border border-stone-100 rounded-[2.5rem] p-6 sm:p-10 shadow-sm space-y-8">
        <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-forest-dark text-center">Conoce tu planta</h2>
        
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 border-b border-stone-100 pb-2 scrollbar-none justify-start sm:justify-center">
          {[
            { id: 'cuidados', label: '🌱 Propiedades y cuidados' },
            { id: 'sanacion', label: '🌿 Sanación' },
            { id: 'energia', label: '✨ Energía' },
            { id: 'compania', label: '🤍 Compañía' },
            { id: 'espiritualidad', label: '🔮 Espiritualidad' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-smooth whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-forest border-forest text-white shadow-sm'
                  : 'bg-transparent border-transparent text-stone-500 hover:text-forest hover:bg-stone-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tabs Content */}
        <div className="min-h-[220px] animate-fade-in">
          
          {/* TAB 1: Cuidados */}
          {activeTab === 'cuidados' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-4">
                <h3 className="text-base font-bold text-forest-dark flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-forest rounded-full" />
                  Instrucciones Básicas de Cultivo
                </h3>
                <ul className="space-y-3 font-light text-stone-600">
                  <li><strong className="font-semibold text-stone-700">Luz ☀️:</strong> {product.careInstructions.luz}</li>
                  <li><strong className="font-semibold text-stone-700">Agua 💧:</strong> {product.careInstructions.agua}</li>
                  <li><strong className="font-semibold text-stone-700">Sustrato 🌱:</strong> {product.careInstructions.sustrato}</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-base font-bold text-forest-dark flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-forest rounded-full" />
                  Clima y Fertilización
                </h3>
                <ul className="space-y-3 font-light text-stone-600">
                  <li><strong className="font-semibold text-stone-700">Temperatura 🌡️:</strong> {product.careInstructions.temperatura}</li>
                  <li><strong className="font-semibold text-stone-700">Humedad:</strong> {product.careInstructions.humedad}</li>
                  <li><strong className="font-semibold text-stone-700">Fertilización:</strong> {product.careInstructions.fertilizacion}</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: Sanación */}
          {activeTab === 'sanacion' && (
            <div className="max-w-3xl mx-auto space-y-4 text-center text-sm md:text-base leading-relaxed text-stone-600 font-light">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-forest-dark">Tradición de Sanación</h3>
              <p>{product.healing}</p>
              <p className="text-[10px] text-stone-400 pt-4">
                * Las propiedades se asocian con el bienestar psicológico y la relajación ambiental, según tradiciones populares. No constituyen afirmaciones médicas.
              </p>
            </div>
          )}

          {/* TAB 3: Energía */}
          {activeTab === 'energia' && (
            <div className="max-w-3xl mx-auto space-y-4 text-center text-sm md:text-base leading-relaxed text-stone-600 font-light">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mx-auto mb-4 border border-amber-100">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-forest-dark">Simbolismo de Energía y Renovación</h3>
              <p>{product.energy}</p>
            </div>
          )}

          {/* TAB 4: Compañía */}
          {activeTab === 'compania' && (
            <div className="max-w-3xl mx-auto space-y-4 text-center text-sm md:text-base leading-relaxed text-stone-600 font-light">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-800 flex items-center justify-center mx-auto mb-4 border border-rose-100">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-forest-dark">Conexión y Acompañamiento</h3>
              <p>{product.companionship}</p>
            </div>
          )}

          {/* TAB 5: Espiritualidad */}
          {activeTab === 'espiritualidad' && (
            <div className="max-w-3xl mx-auto space-y-4 text-center text-sm md:text-base leading-relaxed text-stone-600 font-light">
              <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-800 flex items-center justify-center mx-auto mb-4 border border-indigo-100">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-forest-dark">Simbolismo Cultural y Espiritual</h3>
              <p>{product.spirituality}</p>
            </div>
          )}

        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-forest-dark">Productos relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
