import { ProductModel } from '../../../models/Product.model';
import { listCategory } from '../category';

export const initialProduct: ProductModel = {
  category: listCategory[0].value.toString(),
  description: '',
  longDescription: '',
  price: '',
  title: '',
  quantity: 1
};