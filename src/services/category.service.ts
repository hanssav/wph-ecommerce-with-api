import { api } from '@/api';
import { CategoriesResponse, CategoryParams } from '@/types';

export const categoryServices = {
  get: async (params?: CategoryParams): Promise<CategoriesResponse> => {
    const res = await api.get('/categories', { params });
    return res.data;
  },
};
