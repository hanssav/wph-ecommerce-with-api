import { api } from '@/api';
import { GetOrdersMyParam, OrdersResponse } from '@/types';

export const orderService = {
  ordersCheckout: async (body: { address: string }) => {
    const res = await api.post('/orders/checkout', body);
    return res.data;
  },
  getOrdersMy: async (
    orderParams?: GetOrdersMyParam
  ): Promise<OrdersResponse> => {
    const params = { page: 1, limit: 10, ...orderParams };
    const res = await api.get('/orders/my', { params });
    return res.data;
  },
};
