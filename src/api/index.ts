import { APIConfiguration } from '@/constants/api.config';
import axios from 'axios';

export const api = axios.create({
  baseURL: APIConfiguration.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
