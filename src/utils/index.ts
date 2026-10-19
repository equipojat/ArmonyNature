/**
 * Formatea un número como pesos colombianos (COP).
 * Ejemplo: 85000 -> "$ 85.000"
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);
};

/**
 * Retorna una clase condicional de dificultad de cuidado.
 */
export const getDifficultyColor = (difficulty: 'Fácil' | 'Intermedio' | 'Avanzado'): string => {
  switch (difficulty) {
    case 'Fácil':
      return 'bg-emerald-50 text-emerald-800 border-emerald-100';
    case 'Intermedio':
      return 'bg-amber-50 text-amber-800 border-amber-100';
    case 'Avanzado':
      return 'bg-rose-50 text-rose-800 border-rose-100';
    default:
      return 'bg-gray-50 text-gray-800 border-gray-100';
  }
};
