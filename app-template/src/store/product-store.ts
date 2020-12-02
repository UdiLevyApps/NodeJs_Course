import { Product } from '../model/Product';
import { createHttpClient } from '../utils/http-client';

let products: Product[];

export async function getProducts(): Promise<Product[]> {
  return new Promise(async (res, rej) => {
    try {
      if (!products) {
        const productsClient = createHttpClient(`${'http://localhost:8000'}/assets`);
        products = await productsClient('/staticProducts.json').then((r) => r.json());
      }
      res(products);
    } catch (error) {
      rej(error);
    }
  });
}

export function getProductsAsync(): Promise<Product[]> {
  return new Promise((res, rej) => {
    try {
      res(getProducts());
    } catch (error) {
      rej(error);
    }
  });
}
