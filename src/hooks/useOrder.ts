import { PATH } from '@/constants';
import { CheckoutFormData } from '@/lib/validation/checkout.validation';
import { orderService } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
