import { PATH } from '@/constants';
import { CheckoutFormData } from '@/lib/validation/checkout.validation';
import { orderService } from '@/services';
import { GetOrdersMyParam } from '@/types';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';

export const useCreateOrders = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createOrderMutation = useMutation({
    mutationFn: async (values: CheckoutFormData) => {
      const res = await orderService.ordersCheckout(values);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      router.push(PATH.CHECKOUT.SUCCESS);
    },
    onError: () => {
      router.push(PATH.CHECKOUT.FAILED);
    },
  });

  return createOrderMutation;
};

export const useGetOrderMy = (params?: GetOrdersMyParam) => {
  const queryClient = useQueryClient();

  const normalizedParams = React.useMemo(() => {
    const param = { page: 1, limit: 10, ...params };
    if (!param.paymentStatus || param.paymentStatus === 'ALL') {
      delete param.paymentStatus;
    }
    return param;
  }, [params]);

  const ordersQuery = useQuery({
    queryKey: ['orders/my', params],
    queryFn: () => orderService.getOrdersMy(normalizedParams),
    staleTime: 1000 * 60,
    placeholderData: keepPreviousData,
  });

  const orders = ordersQuery.data?.data.orders ?? [];
  const pagination = ordersQuery.data?.data.pagination;
  const currentPage = params?.page ?? 1;
  const totalPages = pagination?.totalPages ?? 1;

  React.useEffect(() => {
    if (!pagination) return;

    if (currentPage < totalPages) {
      const nextParams = { ...normalizedParams, page: currentPage + 1 };
      queryClient.prefetchQuery({
        queryKey: ['orders/my', nextParams],
        queryFn: () => orderService.getOrdersMy(nextParams),
      });
    }

    if (currentPage > 1) {
      const prevParams = { ...normalizedParams, page: currentPage - 1 };
      queryClient.prefetchQuery({
        queryKey: ['orders/my', prevParams],
        queryFn: () => orderService.getOrdersMy(prevParams),
      });
    }
  }, [queryClient, normalizedParams, currentPage, totalPages, pagination]);

  return { orders, query: ordersQuery, pagination, currentPage };
};
