import { api } from '@/api';
import {
  ParamsProduct,
  ProducApitResponseId,
  ProductApiResponse,
} from '@/types/product.types';

export const productsService = {
  getAll: async (params?: ParamsProduct): Promise<ProductApiResponse> => {
    const res = await api.get('/products', { params });
    return res.data;
  },
  getById: async (id: string): Promise<ProducApitResponseId> => {
    const res = await api.get(`/products/${id}`);
    return res.data;
  },
};
