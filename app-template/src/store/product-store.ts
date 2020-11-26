import { Product } from '../model/Product';
import productData from '../assets/products.json';

export function getProducts(): Product[] {
  return productData;
}
