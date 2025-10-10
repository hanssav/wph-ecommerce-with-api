import { SellerFormInput } from '@/lib/validation/seller-admin.validation';
import { storeService } from '@/services';
import { GetAllOrderSellerParams, OrderItemBySeller } from '@/types';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import React from 'react';

export const useSeller = () => {
  const query = useQuery({
    queryKey: ['seller/shop'],
    queryFn: () => storeService.getSeller(),
    staleTime: 60000,
  });

  return { seller: query.data?.data, query };
};

export const useUpdateSeller = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Partial<SellerFormInput>) =>
      storeService.updateSeller(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller/shop'] });
    },
  });

  return {
    updateSeller: mutation.mutate,
    ...mutation,
  };
};

export const useGetAllOrderBySeller = (params: GetAllOrderSellerParams) => {
  const normalizedParams = React.useMemo(() => {
    const param = {
      ...params,
      page: params.page ?? 1,
      limit: params.limit ?? 10,
    };

    if (!param.status || param.status === 'ALL') {
      delete param.status;
    }

    return param;
  }, [params]);

  const query = useQuery({
    queryKey: ['seller/order-items', normalizedParams],
    queryFn: () => storeService.getAllOrderBySeller(normalizedParams),
    staleTime: 60_000,
    placeholderData: keepPreviousData,
  });

  return {
    orders: query.data?.data.items,
    pagination: query.data?.data?.pagination,
    ...query,
  };
};

export const useUpdatetatusBySeller = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number | string;
      data: Pick<OrderItemBySeller, 'status'>;
    }) => storeService.updateOrderItemsStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller/order-items'] });
    },
  });

  return { update: mutation.mutate, ...mutation };
};
