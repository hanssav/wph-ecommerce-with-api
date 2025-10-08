import { categoryServices } from '@/services/category.service';
import { CategoryParams } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useCategories = (params?: CategoryParams) => {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryServices.get(params),
    staleTime: 60000,
  });

  const categories = query.data?.data.categories;

  return { categories, query };
};
