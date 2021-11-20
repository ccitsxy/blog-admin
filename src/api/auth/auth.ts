import { api } from '@/utils/api';

interface User {
  username: string;
  password: string;
}

export async function login(user:User) {
  const response = await api.post('/auth/login',user);
}
