import { api } from '@/api';
import {
  ParamsProduct,
  ParamsSellerProduct,
  ProducApitResponseId,
  ProductApiResponse,
} from '@/types';

export const productsService = {
  getAll: async (params?: ParamsProduct): Promise<ProductApiResponse> => {
    const res = await api.get('/products', { params });
    return res.data;
  },
  getById: async (id: string): Promise<ProducApitResponseId> => {
    const res = await api.get(`/products/${id}`);
    return res.data;
  },
  getAllBySeller: async (
    params?: ParamsSellerProduct
  ): Promise<ProductApiResponse> => {
    const res = await api.get('/seller/products', { params });
    return res.data;
  },
};
