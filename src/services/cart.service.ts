import { api } from '@/api';
import { Product } from '@/types';
import { AddCartApiResponse, CartResponse } from '@/types/cart.types';

export const cartService = {
  get: async (): Promise<CartResponse> => {
    const res = await api.get('/cart');
    return res.data;
  },
  add: async (body: {
    productId: Product['id'];
    qty: number;
  }): Promise<AddCartApiResponse> => {
    const res = await api.post('/cart/items', body);
    return res.data;
  },
};
