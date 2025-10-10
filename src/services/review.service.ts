import { api } from '@/api';
import { ReviewApiResponse, ReviewParams } from '@/types';

export const reviewService = {
  getAll: async (params?: ReviewParams): Promise<ReviewApiResponse> => {
    const res = await api.get('/reviews/my', { params });
    return res.data;
  },
};
