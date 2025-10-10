import { api } from '@/api';
import { SellerFormInput } from '@/lib/validation/seller-admin.validation';
import {
  GetAllOrderSellerParams,
  GetAllOrderSellerResponse,
  OrderItemBySeller,
  SellerResponse,
} from '@/types';

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
  getSeller: async (): Promise<SellerResponse> => {
    const res = await api.get('seller/shop');
    return res.data;
  },
  updateSeller: async (store: Partial<SellerFormInput>) => {
    const formData = new FormData();

    Object.entries(store).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const res = await api.patch('/seller/shop', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return res.data;
  },
  getAllOrderBySeller: async (
    params: GetAllOrderSellerParams
  ): Promise<GetAllOrderSellerResponse> => {
    const res = await api.get('/seller/order-items', { params });
    return res.data;
  },
  updateOrderItemsStatus: async (
    id: number | string,
    data: { status: OrderItemBySeller['status'] }
  ) => {
    const res = await api.patch(`/seller/order-items/${id}/status`, data);
    return res.data;
  },
};
