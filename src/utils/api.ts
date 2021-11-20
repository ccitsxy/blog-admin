import axios from 'axios';

const api = axios.create({ baseURL: 'https://api.ccitsxy.vercel.app' });

export { api };
