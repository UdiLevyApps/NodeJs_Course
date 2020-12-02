import { createHttpClient } from '../utils/http-client';
import { Category } from '../model/Category';

let categories: Category[];

export async function getCategories(): Promise<Category[]> {
  return new Promise(async (res, rej) => {
    try {
      if (!categories) {
        const productsClient = createHttpClient(`${'http://localhost:8000'}/assets`);
        categories = await productsClient('/staticCategories.txt').then((r) => r.json());
      }
      res(categories);
    } catch (error) {
      rej(error);
    }
  });
}

export function getCategoriesAsync(): Promise<Category[]> {
  return new Promise((res, rej) => {
    try {
      res(getCategories());
    } catch (error) {
      rej(error);
    }
  });
}
