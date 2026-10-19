import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { formatPrice } from '../../utils';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, setOpen, updateQuantity, removeItem, getSubtotal, getShippingCost, getTotal } = useCartStore();
  const navigate = useNavigate();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Cerrar al presionar la tecla Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, setOpen]);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setOpen(false);
    navigate('/checkout');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        {/* Drawer Panel */}
        <div
          ref={drawerRef}
          className="w-screen max-w-md bg-[#faf9f6] shadow-2xl flex flex-col animate-slide-left border-l border-stone-100"
        >
          {/* Header */}
          <div className="p-6 border-b border-stone-200/80 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-forest" />
              <h2 className="text-xl font-serif font-semibold text-forest-dark">Tu Carrito</h2>
              {totalItems > 0 && (
                <span className="bg-forest-light/10 text-forest text-xs font-semibold px-2 py-0.5 rounded-full">
                  {totalItems} {totalItems === 1 ? 'ítem' : 'ítems'}
                </span>
              )}
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-smooth"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-medium text-stone-700">Tu carrito está vacío</h3>
                  <p className="text-sm text-stone-400 mt-1 max-w-xs mx-auto">
                    ¿Qué tal si exploras nuestra tienda y encuentras la planta perfecta para ti?
                  </p>
                </div>
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate('/tienda');
                  }}
                  className="btn-primary py-2 px-6 text-sm"
                >
                  Explorar Tienda
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-smooth"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-50 flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium text-stone-800 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-stone-300 hover:text-rose-500 p-0.5 rounded transition-colors"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-stone-400">{item.product.category}</p>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-stone-200 rounded-full p-0.5 bg-stone-50">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 rounded-full text-stone-500 hover:bg-white hover:text-stone-800 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-medium text-stone-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 rounded-full text-stone-500 hover:bg-white hover:text-stone-800 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      {/* Price */}
                      <span className="text-sm font-semibold text-forest">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-stone-200/80 space-y-4">
              <div className="space-y-2 text-sm text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-800">{formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Envío</span>
                  {getShippingCost() === 0 ? (
                    <span className="text-emerald-600 font-semibold text-xs bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      Gratis
                    </span>
                  ) : (
                    <span className="font-semibold text-stone-800">{formatPrice(getShippingCost())}</span>
                  )}
                </div>
                {getShippingCost() > 0 && (
                  <p className="text-[10px] text-stone-400 text-right">
                    ¡Envío gratis por compras superiores a {formatPrice(150000)}!
                  </p>
                )}
                <div className="border-t border-stone-100 pt-2 flex justify-between text-base font-serif font-bold text-forest-dark">
                  <span>Total</span>
                  <span>{formatPrice(getTotal())}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full btn-primary py-3 rounded-xl flex items-center justify-center gap-2 mt-4 font-semibold text-sm shadow-md hover:shadow-lg"
              >
                Continuar con el pago
              </button>
              
              <button
                onClick={() => setOpen(false)}
                className="w-full text-center text-xs text-stone-400 hover:text-stone-600 transition-colors py-1"
              >
                Seguir comprando
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
