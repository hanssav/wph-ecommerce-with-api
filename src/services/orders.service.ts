import { api } from '@/api';

export const orderService = {
  ordersCheckout: async (body: { address: string }) => {
    const res = await api.post('/orders/checkout', body);
    return res.data;
  },
  getOrdersMy: async (orderParams?: {
    page?: number;
    limit?: number;
    paymentStatus?: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  }) => {
    const params = { page: 1, limit: 10, ...orderParams };
    const res = await api.get('/api/orders/my', { params });
    return res.data;
  },
};
