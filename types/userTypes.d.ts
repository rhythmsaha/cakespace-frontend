import { Product } from "./product";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
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

export interface CartType {
  user?: string;
  items: {
    product: Product;
    quantity: number;
    totalPrice: number;
  }[];

  totalAmount: number;
  totalQuantity: number;
}
