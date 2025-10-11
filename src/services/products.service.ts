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
    const formData = new FormData();

    if (product.title) formData.append('title', product.title);
    if (product.description)
      formData.append('description', product.description);
    if (product.price) formData.append('price', product.price);
    if (product.stock) formData.append('stock', product.stock);
    if (product.categoryId !== undefined) {
      formData.append('categoryId', String(product.categoryId));
    }
    if (product.isActive !== undefined) {
      formData.append('isActive', product.isActive ? '1' : '0');
    }
    if (product.images && Array.isArray(product.images)) {
      product.images.forEach((image: unknown) => {
        if (typeof image === 'string') {
          formData.append('imagesUrl[]', image);
        } else if (image instanceof File) {
          formData.append('images', image);
        }
      });
    }

    const res = await api.put(`/seller/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  },
  deleteProduct: async (id: number | string) => {
    const res = await api.delete(`/seller/products/${id}`);
    return res.data;
  },
};
