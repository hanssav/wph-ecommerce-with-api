import { useUser } from '@/context/auth';
import { userService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const useMe = () => {
  const { token } = useUser();
  const query = useQuery({
    queryKey: ['me'],
    queryFn: () => {
      return userService.getMe();
    },
    enabled: !!token,
    staleTime: 1000 * 60,
  });

  return {
    user: query.data?.data,
    isLoading: query.isLoading,
  };
};
