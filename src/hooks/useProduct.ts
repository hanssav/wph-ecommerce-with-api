import { productsService } from '@/services';
import { ParamsProduct } from '@/types/product.types';
import { useQuery } from '@tanstack/react-query';

export const useProduct = (params?: ParamsProduct) => {
  const query = useQuery({
    queryKey: ['product'],
    queryFn: () => {
      return productsService.getAll(params);
    },
    staleTime: 1000 * 60,
  });

  return {
    products: query.data?.data,
    isLoading: query.isLoading,
  };
};

export const useProductById = (id: string) => {
  const query = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsService.getById(id),
    staleTime: 1000 * 60,
    enabled: !!id,
  });

  return {
    product: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
