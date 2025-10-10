import { reviewService } from '@/services';
import { ReviewParams } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useReview = (params?: ReviewParams) => {
  const query = useQuery({
    queryKey: ['reviews/my', params],
    queryFn: () => reviewService.getAll(params),
    staleTime: 60_000,
  });

  return {
    reviews: query.data?.data.reviews,
    pagination: query.data?.data.pagination,
    ...query,
  };
};
