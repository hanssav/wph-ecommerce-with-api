import { SellerFormInput } from '@/lib/validation/seller-admin.validation';
import { storeService } from '@/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
