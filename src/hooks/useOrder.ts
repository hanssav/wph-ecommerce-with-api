import { PATH } from '@/constants';
import { CheckoutFormData } from '@/lib/validation/checkout.validation';
import { GetOrdersMyParam, orderService } from '@/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

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
  const orders = useQuery({
    queryKey: ['orders/my', params],
    queryFn: () => {
      const param = { page: 1, limit: 10, ...params };
      if (!param.paymentStatus || param.paymentStatus === 'ALL') {
        delete param.paymentStatus;
      }

      return orderService.getOrdersMy(param);
    },
    staleTime: 1000 * 60,
    placeholderData: (previousData) => previousData,
  });

  return { orders: orders.data?.data, query: orders };
};
