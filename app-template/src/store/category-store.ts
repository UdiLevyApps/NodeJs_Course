import { Category } from '../model/Category';
import categoryData from '../assets/categories.json';

export function getCategories(): Category[] {
  return categoryData;
}
