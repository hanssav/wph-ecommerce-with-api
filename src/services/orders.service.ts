import { api } from '@/api';

export const orderService = {
  ordersCheckout: async (body: { address: string }) => {
    const res = await api.post('/orders/checkout', body);
    return res.data;
  },
};
