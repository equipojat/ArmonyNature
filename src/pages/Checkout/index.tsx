import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShoppingBag, Lock, Info, ArrowLeft, CreditCard } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { formatPrice } from '../../utils';
import { Order } from '../../types';

// Esquema de validación con Zod
const checkoutSchema = z.object({
  firstName: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  lastName: z.string().min(2, { message: 'El apellido debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Escribe un correo electrónico válido.' }),
  phone: z.string().regex(/^\+?[0-9]{7,15}$/, {
    message: 'Escribe un teléfono válido (de 7 a 15 números, puede incluir indicativo).',
  }),
  department: z.string().min(3, { message: 'El departamento es obligatorio.' }),
  city: z.string().min(3, { message: 'La ciudad es obligatoria.' }),
  address: z.string().min(5, { message: 'Escribe una dirección de envío completa.' }),
  additionalInfo: z.string().optional(),
  paymentMethod: z.enum(['mercado-pago', 'stripe', 'wompi-payu'], {
    message: 'Selecciona un método de pago.',
  }),
});

type CheckoutFormInputs = z.infer<typeof checkoutSchema>;

export const Checkout: React.FC = () => {
  const { items, getSubtotal, getShippingCost, getTotal, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormInputs>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'mercado-pago',
    },
  });

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-serif font-bold text-stone-700">Tu carrito está vacío</h2>
        <p className="text-stone-500 max-w-sm mx-auto">
          Necesitas agregar productos al carrito antes de proceder con el checkout.
        </p>
        <button onClick={() => navigate('/tienda')} className="btn-primary mx-auto">
          Ir a la Tienda
        </button>
      </div>
    );
  }

  const onSubmit = (data: CheckoutFormInputs) => {
    setIsSubmitting(true);
    
    // Simular retraso de procesamiento y comunicación con Backend API
    setTimeout(() => {
      const orderId = `PED-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const newOrder: Order = {
        id: orderId,
        customerInfo: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
        },
        shippingAddress: {
          department: data.department,
          city: data.city,
          address: data.address,
          additionalInfo: data.additionalInfo,
        },
        paymentMethod: data.paymentMethod,
        items: items,
        subtotal: getSubtotal(),
        shippingCost: getShippingCost(),
        total: getTotal(),
        status: 'Pendiente', // Pendiente de pago real
        date: new Date().toLocaleDateString('es-CO', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      };

      // Guardar el pedido en localStorage para que la página de confirmación lo cargue
      window.localStorage.setItem(`armony-plantas-order-${orderId}`, JSON.stringify(newOrder));
      
      // Limpiar el carrito de compras
      clearCart();
      setIsSubmitting(false);

      // Redirigir a la página de confirmación de pedido
      navigate(`/pedido/${orderId}`);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2 border-b border-stone-200/50 pb-4">
        <Link to="/tienda" className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-forest transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver a la tienda
        </Link>
        <h1 className="text-3xl font-serif font-black text-forest-dark">Finalizar Compra</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Checkout Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-7 space-y-8">
          
          {/* Section 1: Customer Info */}
          <div className="bg-white border border-stone-100 p-6 rounded-3xl shadow-sm space-y-4">
            <h2 className="text-lg font-serif font-bold text-forest-dark flex items-center gap-2">
              <span className="w-5 h-5 bg-forest/5 text-forest rounded-full flex items-center justify-center text-xs">1</span>
              Información del Cliente
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-600 block">Nombre</label>
                <input
                  type="text"
                  {...register('firstName')}
                  className={`w-full bg-stone-50 border rounded-xl px-4 py-2.5 text-sm text-stone-700 outline-none focus:ring-1 focus:ring-forest ${
                    errors.firstName ? 'border-rose-300 focus:ring-rose-400' : 'border-stone-200 focus:border-forest/50'
                  }`}
                />
                {errors.firstName && <p className="text-[10px] text-rose-500 font-medium">{errors.firstName.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-600 block">Apellido</label>
                <input
                  type="text"
                  {...register('lastName')}
                  className={`w-full bg-stone-50 border rounded-xl px-4 py-2.5 text-sm text-stone-700 outline-none focus:ring-1 focus:ring-forest ${
                    errors.lastName ? 'border-rose-300 focus:ring-rose-400' : 'border-stone-200 focus:border-forest/50'
                  }`}
                />
                {errors.lastName && <p className="text-[10px] text-rose-500 font-medium">{errors.lastName.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-600 block">Correo Electrónico</label>
                <input
                  type="email"
                  {...register('email')}
                  className={`w-full bg-stone-50 border rounded-xl px-4 py-2.5 text-sm text-stone-700 outline-none focus:ring-1 focus:ring-forest ${
                    errors.email ? 'border-rose-300 focus:ring-rose-400' : 'border-stone-200 focus:border-forest/50'
                  }`}
                />
                {errors.email && <p className="text-[10px] text-rose-500 font-medium">{errors.email.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-600 block">Teléfono Móvil</label>
                <input
                  type="text"
                  placeholder="Ej: 3001234567"
                  {...register('phone')}
                  className={`w-full bg-stone-50 border rounded-xl px-4 py-2.5 text-sm text-stone-700 outline-none focus:ring-1 focus:ring-forest ${
                    errors.phone ? 'border-rose-300 focus:ring-rose-400' : 'border-stone-200 focus:border-forest/50'
                  }`}
                />
                {errors.phone && <p className="text-[10px] text-rose-500 font-medium">{errors.phone.message}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Shipping Address */}
          <div className="bg-white border border-stone-100 p-6 rounded-3xl shadow-sm space-y-4">
            <h2 className="text-lg font-serif font-bold text-forest-dark flex items-center gap-2">
              <span className="w-5 h-5 bg-forest/5 text-forest rounded-full flex items-center justify-center text-xs">2</span>
              Dirección de Envío
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-600 block">Departamento</label>
                <input
                  type="text"
                  placeholder="Ej: Cundinamarca"
                  {...register('department')}
                  className={`w-full bg-stone-50 border rounded-xl px-4 py-2.5 text-sm text-stone-700 outline-none focus:ring-1 focus:ring-forest ${
                    errors.department ? 'border-rose-300 focus:ring-rose-400' : 'border-stone-200 focus:border-forest/50'
                  }`}
                />
                {errors.department && <p className="text-[10px] text-rose-500 font-medium">{errors.department.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-600 block">Ciudad</label>
                <input
                  type="text"
                  placeholder="Ej: Bogotá"
                  {...register('city')}
                  className={`w-full bg-stone-50 border rounded-xl px-4 py-2.5 text-sm text-stone-700 outline-none focus:ring-1 focus:ring-forest ${
                    errors.city ? 'border-rose-300 focus:ring-rose-400' : 'border-stone-200 focus:border-forest/50'
                  }`}
                />
                {errors.city && <p className="text-[10px] text-rose-500 font-medium">{errors.city.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-600 block">Dirección de Entrega</label>
              <input
                type="text"
                placeholder="Ej: Calle 123 # 45-67, Apto 401"
                {...register('address')}
                className={`w-full bg-stone-50 border rounded-xl px-4 py-2.5 text-sm text-stone-700 outline-none focus:ring-1 focus:ring-forest ${
                  errors.address ? 'border-rose-300 focus:ring-rose-400' : 'border-stone-200 focus:border-forest/50'
                }`}
              />
              {errors.address && <p className="text-[10px] text-rose-500 font-medium">{errors.address.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-600 block">Información Adicional (Opcional)</label>
              <input
                type="text"
                placeholder="Ej: Conjunto residencial, indicaciones específicas..."
                {...register('additionalInfo')}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-forest/50 focus:ring-1 focus:ring-forest"
              />
            </div>
          </div>

          {/* Section 3: Payment Method Setup */}
          <div className="bg-white border border-stone-100 p-6 rounded-3xl shadow-sm space-y-4">
            <h2 className="text-lg font-serif font-bold text-forest-dark flex items-center gap-2">
              <span className="w-5 h-5 bg-forest/5 text-forest rounded-full flex items-center justify-center text-xs">3</span>
              Método de Pago
            </h2>

            <p className="text-xs text-stone-500 leading-relaxed font-light">
              Selecciona tu pasarela de pagos preferida. El sistema redirigirá al portal seguro correspondiente para procesar la transacción bancaria.
            </p>

            <div className="flex flex-col gap-3">
              {/* Mercado Pago */}
              <label className="flex items-center justify-between p-4 border border-stone-200 rounded-2xl cursor-pointer hover:border-forest/40 hover:bg-stone-50/50 select-none">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    value="mercado-pago"
                    {...register('paymentMethod')}
                    className="text-forest focus:ring-forest"
                  />
                  <div>
                    <span className="text-sm font-bold text-stone-800">Mercado Pago</span>
                    <span className="text-[10px] text-stone-400 block font-light">Tarjetas, PSE, Efecty, Mercado Crédito</span>
                  </div>
                </div>
                <div className="text-[10px] uppercase bg-sky-50 text-sky-700 border border-sky-100 px-2.5 py-0.5 rounded font-extrabold">MP</div>
              </label>

              {/* Stripe */}
              <label className="flex items-center justify-between p-4 border border-stone-200 rounded-2xl cursor-pointer hover:border-forest/40 hover:bg-stone-50/50 select-none">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    value="stripe"
                    {...register('paymentMethod')}
                    className="text-forest focus:ring-forest"
                  />
                  <div>
                    <span className="text-sm font-bold text-stone-800">Stripe (Pasarela Internacional)</span>
                    <span className="text-[10px] text-stone-400 block font-light">Tarjetas de Crédito Internacionales</span>
                  </div>
                </div>
                <div className="text-[10px] uppercase bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-0.5 rounded font-extrabold">Stripe</div>
              </label>

              {/* Wompi / PayU */}
              <label className="flex items-center justify-between p-4 border border-stone-200 rounded-2xl cursor-pointer hover:border-forest/40 hover:bg-stone-50/50 select-none">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    value="wompi-payu"
                    {...register('paymentMethod')}
                    className="text-forest focus:ring-forest"
                  />
                  <div>
                    <span className="text-sm font-bold text-stone-800">Wompi / PayU</span>
                    <span className="text-[10px] text-stone-400 block font-light">Débitos bancarios directos y corresponsales locales</span>
                  </div>
                </div>
                <div className="text-[10px] uppercase bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-0.5 rounded font-extrabold">Wompi</div>
              </label>
            </div>
            {errors.paymentMethod && <p className="text-[10px] text-rose-500 font-medium">{errors.paymentMethod.message}</p>}

            {/* Architecture Reminder Warning */}
            <div className="flex gap-2.5 p-4 bg-amber-50/40 border border-amber-100/50 rounded-2xl text-[11px] text-stone-500 leading-relaxed font-light">
              <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-amber-800">Nota de Integración:</strong> El frontend está preparado para comunicarse con un endpoint de backend seguro para generar el Token de Sesión de pago. Al confirmar, simulamos este proceso de comunicación en la consola.
              </div>
            </div>
          </div>

          {/* Action button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary py-3.5 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-md shadow-forest/20 hover:shadow-lg disabled:bg-stone-400 disabled:shadow-none"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin text-sm">🌿</span>
                Conectando con la pasarela segura...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Continuar con el pago seguro ({formatPrice(getTotal())})
              </>
            )}
          </button>
        </form>

        {/* Right Side: Order Summary */}
        <aside className="lg:col-span-5 bg-white border border-stone-100 p-6 rounded-3xl shadow-sm space-y-6">
          <h2 className="text-lg font-serif font-bold text-forest-dark border-b border-stone-100 pb-4 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-forest" />
            Resumen de tu Pedido
          </h2>

          {/* Cart Products List */}
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-3 text-xs border-b border-stone-50 pb-3 last:border-none last:pb-0">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-50 flex-shrink-0">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-stone-800 line-clamp-1">{item.product.name}</h4>
                  <p className="text-stone-400 font-light mt-0.5">Cant: {item.quantity}</p>
                </div>
                <span className="font-bold text-forest">{formatPrice(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          {/* Financial calculations summary */}
          <div className="space-y-2 border-t border-stone-100 pt-4 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-stone-800">{formatPrice(getSubtotal())}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Envío</span>
              {getShippingCost() === 0 ? (
                <span className="text-emerald-600 font-semibold text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  Gratis
                </span>
              ) : (
                <span className="font-semibold text-stone-800">{formatPrice(getShippingCost())}</span>
              )}
            </div>
            <div className="border-t border-stone-100 pt-3 flex justify-between text-sm font-bold text-forest-dark">
              <span>Total a pagar</span>
              <span>{formatPrice(getTotal())}</span>
            </div>
          </div>

          {/* Guaranteed Security Badge */}
          <div className="flex items-center justify-center gap-2 p-3 bg-stone-50 rounded-2xl text-[10px] text-stone-400 font-medium border border-stone-100">
            <Lock className="w-3.5 h-3.5 text-stone-300" />
            <span>Encriptación SSL de 256 bits activa</span>
          </div>

        </aside>

      </div>
    </div>
  );
};
