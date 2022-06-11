import { api } from '@/utils/api';
import type { Category } from './categories';
import type { Tag } from './tags';

export interface Article {
  _id: string;
  title: string;
  category: Category;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
}

export function getArticles() {
  return api.get('/articles');
}
