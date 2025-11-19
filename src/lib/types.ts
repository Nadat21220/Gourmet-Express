export interface Category {
  id: string;
  name: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface ProductSize {
  name: 'Chico' | 'Mediano' | 'Grande';
  price: number;
  available: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  imageId: string;
  sizes: ProductSize[];
  available: boolean;
  promotion2x1: boolean;
}

export interface CartItem {
  id: string; // combination of productId and size
  productId: string;
  productName: string;
  productImageId: string;
  size: string;
  quantity: number;
  unitPrice: number;
  promotion2x1: boolean;
}

export type OrderStatus = 'recibido' | 'en_preparacion' | 'listo' | 'entregado';

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  subtotal: number;
  discounts: number;
  total: number;
  paymentMethod: 'tarjeta';
  status: OrderStatus;
  notes?: string;
  estimatedTime: number; // in seconds
  timestamps: {
    [key in OrderStatus]?: number;
  };
}

export interface User {
  uid: string;
  email: string;
  name: string;
  phone: string;
  role: 'cliente' | 'admin';
}
