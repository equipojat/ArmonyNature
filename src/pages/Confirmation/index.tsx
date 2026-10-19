import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Leaf, Truck, CreditCard, ShoppingBag, BookOpen } from 'lucide-react';
import { Order } from '../../types';
import { formatPrice } from '../../utils';

export const Confirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Cargar pedido desde localStorage
  const order: Order | null = useMemo(() => {
    if (!id) return null;
    const rawOrder = window.localStorage.getItem(`armony-plantas-order-${id}`);
    if (rawOrder) {
      try {
        return JSON.parse(rawOrder) as Order;
      } catch (e) {
        console.error('Error parsing order data', e);
      }
    }
    return null;
  }, [id]);

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-6 animate-fade-in">
        <h2 className="text-2xl font-serif font-bold text-stone-700">Pedido no encontrado</h2>
        <p className="text-stone-500 max-w-sm mx-auto">
          No pudimos localizar la información del pedido solicitado. Revisa el código de seguimiento o vuelve a la tienda.
        </p>
        <button onClick={() => navigate('/tienda')} className="btn-primary mx-auto">
          Volver a la Tienda
        </button>
      </div>
    );
  }

  // Capitalización de los nombres de métodos de pago
  const formatPaymentMethod = (method: string) => {
    switch (method) {
      case 'mercado-pago':
        return 'Mercado Pago (PSE / Tarjeta)';
      case 'stripe':
        return 'Stripe';
      case 'wompi-payu':
        return 'Wompi / PayU';
      default:
        return method;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-10 animate-slide-up">
      
      {/* Visual confirmation success badge */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100 shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-forest-dark">¡Gracias por tu compra! 🌱</h1>
          <p className="text-xs sm:text-sm text-stone-500 font-light max-w-md mx-auto leading-relaxed">
            Hemos recibido los detalles de tu pedido. Tu nueva planta está a punto de comenzar una nueva etapa contigo.
          </p>
        </div>
      </div>

      {/* Main Order Details Card */}
      <div className="bg-white border border-stone-100 rounded-[2.5rem] p-6 sm:p-10 shadow-lg space-y-8">
        
        {/* Status columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-6 border-b border-stone-100 text-xs">
          <div>
            <span className="text-stone-400 font-medium uppercase tracking-wider block">Pedido Nro.</span>
            <span className="font-bold text-stone-800 mt-1 block">{order.id}</span>
          </div>
          <div>
            <span className="text-stone-400 font-medium uppercase tracking-wider block">Fecha</span>
            <span className="font-bold text-stone-800 mt-1 block">{order.date}</span>
          </div>
          <div>
            <span className="text-stone-400 font-medium uppercase tracking-wider block">Estado del Pago</span>
            <span className="inline-block mt-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
              Pendiente
            </span>
          </div>
          <div>
            <span className="text-stone-400 font-medium uppercase tracking-wider block">Estado de Envío</span>
            <span className="inline-block mt-1 font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
              Procesando
            </span>
          </div>
        </div>

        {/* Client & Address Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Customer */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-forest uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Información de Contacto
            </h3>
            <div className="text-xs space-y-1 font-light text-stone-600 leading-relaxed">
              <p><strong className="font-semibold text-stone-700">Nombre:</strong> {order.customerInfo.firstName} {order.customerInfo.lastName}</p>
              <p><strong className="font-semibold text-stone-700">Email:</strong> {order.customerInfo.email}</p>
              <p><strong className="font-semibold text-stone-700">Teléfono:</strong> {order.customerInfo.phone}</p>
            </div>
          </div>

          {/* Delivery address */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-forest uppercase tracking-wider flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5" />
              Dirección de Entrega
            </h3>
            <div className="text-xs space-y-1 font-light text-stone-600 leading-relaxed">
              <p><strong className="font-semibold text-stone-700">Departamento:</strong> {order.shippingAddress.department}</p>
              <p><strong className="font-semibold text-stone-700">Ciudad:</strong> {order.shippingAddress.city}</p>
              <p><strong className="font-semibold text-stone-700">Dirección:</strong> {order.shippingAddress.address}</p>
              {order.shippingAddress.additionalInfo && (
                <p><strong className="font-semibold text-stone-700">Indicaciones:</strong> {order.shippingAddress.additionalInfo}</p>
              )}
            </div>
          </div>
        </div>

        {/* Payment and items summary */}
        <div className="pt-6 border-t border-stone-100 space-y-4">
          <h3 className="text-xs font-bold text-forest uppercase tracking-wider flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5" />
            Método de Pago
          </h3>
          <p className="text-xs text-stone-600 font-light leading-relaxed">
            Registrado vía <strong className="font-semibold text-stone-700">{formatPaymentMethod(order.paymentMethod)}</strong>. Una vez completada la transacción en la pasarela, se despachará el pedido.
          </p>
        </div>

        {/* Ordered items listing */}
        <div className="pt-6 border-t border-stone-100 space-y-3">
          <h3 className="text-xs font-bold text-forest uppercase tracking-wider flex items-center gap-1.5 mb-3">
            <ShoppingBag className="w-3.5 h-3.5" />
            Detalle de Artículos
          </h3>
          
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.product.id} className="flex gap-4 items-center text-xs border-b border-stone-50 pb-3 last:border-none last:pb-0">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-stone-50 flex-shrink-0">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-stone-800">{item.product.name}</h4>
                  <p className="text-stone-400 font-light">Categoría: {item.product.category} • Cant: {item.quantity}</p>
                </div>
                <span className="font-bold text-forest">{formatPrice(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial calculations */}
        <div className="pt-6 border-t border-stone-100 space-y-2 text-xs text-stone-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-stone-800">{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Envío</span>
            {order.shippingCost === 0 ? (
              <span className="text-emerald-600 font-semibold text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                Gratis
              </span>
            ) : (
              <span className="font-semibold text-stone-800">{formatPrice(order.shippingCost)}</span>
            )}
          </div>
          <div className="border-t border-stone-100 pt-3 flex justify-between text-base font-bold text-forest-dark">
            <span>Total Pagado</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>

      </div>

      {/* Wellness advice and redirection */}
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center pt-2">
        <button
          onClick={() => navigate('/cuidados')}
          className="btn-secondary text-xs py-2.5 w-full sm:w-auto flex items-center justify-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          Aprende cómo cuidarlas
        </button>
        <button
          onClick={() => navigate('/')}
          className="btn-primary text-xs py-3 w-full sm:w-auto flex items-center justify-center gap-2"
        >
          <Leaf className="w-4 h-4" />
          Volver al Inicio
        </button>
      </div>

    </div>
  );
};
