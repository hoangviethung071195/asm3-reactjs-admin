import { PLURAL, PRODUCT_PATH } from '../utils/constant/ApiPath';
import { RequestMethod } from '../utils/constant/RequestMethod';
import { DEFAULT_PAGINATION } from '../utils/constant/Pagination';
import { requestJson } from '../utils/helpers/api';
import { ProductModel } from '../models/Product.model';
import { PagingData } from '../models/Pagination.model';

export function createProduct(body: ProductModel) {
  return requestJson<ProductModel>(PRODUCT_PATH, RequestMethod.Post, body);
}

export async function getProducts(page?: number, keyword?: string, limit = DEFAULT_PAGINATION.limit) {
  return requestJson<PagingData<ProductModel>>(PRODUCT_PATH + PLURAL + (page ? `?page=${page}` : '') + (limit ? `&limit=${limit}` : '') + (keyword ? `&keyword=${keyword}` : ''));
}

export async function getProduct(id: string) {
  return requestJson<ProductModel>(PRODUCT_PATH + '/' + id);
}

export async function deleteProduct(id: string) {
  return requestJson<boolean>(PRODUCT_PATH + '/' + id, RequestMethod.Delete);
}

export async function updateProduct(body: ProductModel) {
  return requestJson<boolean>(PRODUCT_PATH + '/' + body._id, RequestMethod.Put, body);
}
