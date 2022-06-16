import { api } from '@/utils/api';

export interface Tag {
  _id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export function getTags() {
  return api.get('/tags');
}
