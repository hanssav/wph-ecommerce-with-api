import { APIConfiguration } from '@/constants/api.config';
import axios from 'axios';

const api = axios.create({
  baseURL: APIConfiguration.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { api };
