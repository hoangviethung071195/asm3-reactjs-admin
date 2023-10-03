export interface ProductModel {
  _id?: string;
  title: string;
  category: string;
  price: string;
  description: string;
  longDescription: string;
  quantity?: number;
  fileIds?: string[];
}