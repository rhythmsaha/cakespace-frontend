import { Product } from "./product";

export interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
}

export interface RegistrationFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFields {
  email: string;
  password: string;
  remember: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  totalPrice: number;
}

export interface CartType {
  user?: string;
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
}

export interface ProfileFields {
  firstName?: string;
  lastName?: string;
  gender?: string;
}
