import { productsService } from '@/services';
import { ParamsProduct } from '@/types/product.types';
import { useQuery } from '@tanstack/react-query';

export const useProduct = (params?: ParamsProduct) => {
  const query = useQuery({
    queryKey: ['product', params],
    queryFn: () => {
      const defaultParam = { page: 1, limit: 20, ...params };
      return productsService.getAll(defaultParam);
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
