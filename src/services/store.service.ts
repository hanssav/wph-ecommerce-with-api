import { api } from '@/api';

type StoreDataType = {
  name: string;
  slug?: string;
  logo?: string;
  address?: string;
};

type StoreParamsBySlug = { slug: string; page?: number; limit?: number };

export const storeService = {
  activate: async (store: StoreDataType) => {
    const res = await api.post('/seller/activate', store);
    return res.data;
  },
  getStoreBySlug: async (storeParams?: StoreParamsBySlug) => {
    const params = { page: 1, limit: 10, ...storeParams };
    const res = await api.get(`/stores/slug/${params.slug}`, { params });
    return res.data;
  },
};
