import { api } from '@/api';

type StoreDataType = {};

export const storeService = {
  activate: async (store: StoreDataType) => {
    const res = await api.post('/seller/activate', store);
    return res.data;
  },
};
