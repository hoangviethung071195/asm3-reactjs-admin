import { ProductModel } from '../../../models/Product.model';
import { CATEGORIES } from '../Category';

export const initialProduct: ProductModel = {
  category: CATEGORIES[0].value.toString(),
  description: '',
  longDescription: '',
  price: '',
  title: '',
  quantity: 1
};