import { api } from '@/utils/api';

interface Article {
  title: string;
  description: string;
  category: Category;
  tags: Tag[];
  content: string;
}

interface Category {
  name: string;
}

interface Tag {
  name: string;
}

export async function createArticle(article: Article) {
  const response = await api.post('/articles', article);
  console.log(response);
}

export async function findAllArticles() {
  const response = await api.get('/articles');
  console.log(response);
}

export async function findOneArticle(id: string) {
  const response = await api.get(`/articles/${id}`);
  console.log(response);
}
