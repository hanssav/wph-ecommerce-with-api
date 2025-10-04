import { api } from '@/api';

export const cartService = {
  get: async () => {
    const res = await api.get('/cart');
    return res.data;
  },
};
