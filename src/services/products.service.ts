import { api } from '@/api';
import { ProductFormInput } from '@/lib/validation/product.validation';
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
  addProduct: async (product: ProductFormInput) => {
    const res = await api.post('/seller/products', product);
    return res.data;
  },
  updateProduct: async (
    id: number | string,
    product: Partial<ProductFormInput>
  ) => {
    const res = await api.put(`/seller/products/${id}`, product);
    return res.data;
  },
  deleteProduct: async (id: number | string) => {
    const res = await api.delete(`/seller/products/${id}`);
    return res.data;
  },
};
