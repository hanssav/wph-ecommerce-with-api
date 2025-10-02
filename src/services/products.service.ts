import { api } from '@/api';
import { ParamsProduct, ProductApiResponse } from '@/types/product.types';

export const productsService = {
  getAll: async (params?: ParamsProduct): Promise<ProductApiResponse> => {
    const res = await api.get('/products', { params });
    return res.data;
  },
};
