import { cartService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const useGetCart = () => {
  const query = useQuery({
    queryKey: ['cart'],
    queryFn: () => cartService.get(),
  });

  return {
    cart: query.data?.data,
    isLoading: query.isLoading,
  };
};
