import { api } from '@/api';

type StoreDataType = {
  name: string;
  slug?: string;
  logo?: string;
  address?: string;
};

export const storeService = {
  activate: async (store: StoreDataType) => {
    const res = await api.post('/seller/activate', store);
    return res.data;
  },
};
