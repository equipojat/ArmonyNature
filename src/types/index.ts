export interface Product {
  id: string;
  name: string;
  category: 'Orquídeas' | 'Anturios' | 'Suculentas' | 'Bonsáis' | 'Materas';
  price: number;
  images: string[];
  description: string;
  shortDescription: string;
  stock: number;
  difficulty: 'Fácil' | 'Intermedio' | 'Avanzado';
  light: string;
  watering: string;
  humidity: string;
  temperature: string;
  careInstructions: {
    luz: string;
    agua: string;
    sustrato: string;
    humedad: string;
    temperatura: string;
    fertilizacion: string;
  };
  healing: string;
  energy: string;
  companionship: string;
  spirituality: string;
  featured: boolean;
  tag?: 'Más vendido' | 'Nuevo' | 'Especial';
  rating: number;
  reviewsCount: number;
  isPetSafe: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    department: string;
    city: string;
    address: string;
    additionalInfo?: string;
  };
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  status: 'Pendiente' | 'Pagado' | 'Enviado' | 'Entregado';
  date: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
}

export interface CareGuide {
  id: string;
  title: string;
  category: string;
  light: string;
  water: string;
  soil: string;
  temp: string;
  humidity: string;
  fertilizing: string;
  commonProblems: {
    problem: string;
    solution: string;
  }[];
}
