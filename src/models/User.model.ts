import { CartModel } from './Cart.model';

export interface UserModel {
  _id?: string;
  userId?: string;
  email?: string;
  password?: string;
  fullName?: string;
  role?: number;
  phone?: string;
  token?: string;
  address?: string;
  cart?: {
    items: CartModel[];
  };
}