import { productsService } from '@/services';
import { ParamsProduct } from '@/types/product.types';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

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

export function useInfiniteProducts(params: ParamsProduct) {
  const query = useInfiniteQuery({
    queryKey: ['products', params],
    queryFn: async ({ pageParam = 1 }) => {
      const defaultParam = { page: pageParam, limit: 20, ...params };
      const res = await productsService.getAll(defaultParam);
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      const { page } = firstPage.data.pagination;
      return page > 1 ? page - 1 : undefined;
    },
    staleTime: 1000 * 60,
  });

  const products =
    query.data?.pages.flatMap((page) => page.data.products) ?? [];

  return { query, products };
}

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
