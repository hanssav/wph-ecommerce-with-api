import { PATH } from '@/constants';
import { useToast } from '@/context/toast';
import { ProductFormInput } from '@/lib/validation/product.validation';
import { productsService } from '@/services';
import { ParamsProduct, ParamsSellerProduct } from '@/types/product.types';
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

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
  const pagination = query.data?.pages.flatMap(
    (page) => page.data.pagination ?? {}
  );

  return { query, products, pagination };
}

// =============== ADMIN/ SELLER ===============
export function useInfiniteSellerProducts(params?: ParamsSellerProduct) {
  const query = useInfiniteQuery({
    queryKey: ['sellerProducts', params],
    queryFn: async ({ pageParam = 1 }) => {
      const defaultParam = { page: pageParam, limit: 20, ...params };
      const res = await productsService.getAllBySeller(defaultParam);
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
    placeholderData: keepPreviousData, // important for pagination, avoid flicker when click page
  });

  const products =
    query.data?.pages.flatMap((page) => page.data.products) ?? [];

  const pagination =
    query.data?.pages.flatMap((page) => page.data.pagination) ?? [];

  return { query, products, pagination: pagination[0] };
}

export function useAddProduct() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const router = useRouter();
  const addMutation = useMutation({
    mutationFn: (product: ProductFormInput) =>
      productsService.addProduct(product),
    onSuccess: () => {
      showToast('Product has been added successfully.', 'success');
      router.push(PATH.ADMIN.PRODUCT);
      queryClient.invalidateQueries({ queryKey: ['sellerProducts'] });
    },
    onError: () => {
      showToast('Failed to create product. Please try again.', 'error');
      router.push(PATH.ADMIN.PRODUCT);
    },
  });

  return { addProduct: addMutation.mutate, mutation: addMutation };
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const router = useRouter();

  const update = useMutation({
    mutationFn: ({ id, product }: { id: number; product: ProductFormInput }) =>
      productsService.updateProduct(id, product),
    onSuccess: () => {
      showToast('Product has been updated successfully.', 'success');
      router.push(PATH.ADMIN.PRODUCT);
      queryClient.invalidateQueries({ queryKey: ['sellerProducts'] });
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
    onError: () => {
      showToast('Failed to update. Please try again.', 'error');
      router.push(PATH.ADMIN.PRODUCT);
    },
  });

  return { update: update.mutate, mutation: update };
}

export const useProductById = (id: string | null) => {
  const query = useQuery({
    queryKey: ['product', id],
    queryFn: () => {
      if (!id) return null;
      const res = productsService.getById(id);
      return res;
    },

    staleTime: 1000 * 60,
    enabled: !!id,
  });

  return {
    query,
    product: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

export function useDeleteProduct() {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: number | string) => productsService.deleteProduct(id),
    onSuccess: () => {
      showToast('Product has been deleted.', 'success');
      queryClient.invalidateQueries({ queryKey: ['sellerProducts'] });
    },
    onError: () => {
      showToast('Failed to delete. Please try again.', 'error');
    },
  });

  return { deleteProduct: mutation.mutate, mutation };
}
