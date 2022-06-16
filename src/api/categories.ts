import { api } from '@/utils/api';

export interface Category {
  _id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export function getCategories() {
  return api.get('/categories');
}
