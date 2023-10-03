import { ProductModel } from './Product.model';
import { UserModel } from './User.model';

export interface OrderModel {
  _id: string;
  products: {
    _id: string;
    product: ProductModel;
    quantity: number;
  }[];
  user: UserModel;
  delivery?: string;
  status?: string;
  createdAt: string;
}

export interface OrderTableDataModel {
  _id: string;
  productName: string;
  userName: string;
  address: string;
  total: number;
  delivery: string;
  status: string;
}