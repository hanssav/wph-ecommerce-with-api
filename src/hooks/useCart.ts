import { useUser } from '@/context/auth';
import { useToast } from '@/context/toast';
import { cartService } from '@/services';
import { Product } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetCart = () => {
  const { token } = useUser();
  const query = useQuery({
    queryKey: ['cart', token],
    queryFn: () => cartService.get(),
    enabled: !!token,
  });

  return {
    cart: query.data?.data,
    isLoading: query.isLoading,
  };
};

export const useAddToCart = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const mutatiion = useMutation({
    mutationFn: ({
      productId,
      qty,
    }: {
      productId: Product['id'];
      qty: number;
    }) => cartService.add({ productId, qty }),
    onSuccess: () => {
      showToast('successfully added product to cart', 'success');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: () => showToast('failed added product to cart', 'error'),
  });

  return { onAddtoCart: mutatiion.mutate, ...mutatiion };
};
