import SectionWrapper from '@/components/container/section-wrapper';
import DetailClient from './client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { productsService } from '@/services';
import { ParamsProduct, ProductApiResponse } from '@/types';

type DetailProps = {
  params: {
    id: string;
  };
};

const Detail = async ({ params }: DetailProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['product', id],
    queryFn: () => productsService.getById(id),
  });

  await queryClient.prefetchInfiniteQuery<
    ProductApiResponse,
    Error,
    ProductApiResponse,
    [string, ParamsProduct],
    number
  >({
    queryKey: ['products', {} as ParamsProduct],
    queryFn: async ({ pageParam = 1 }) => {
      return productsService.getAll({ page: pageParam, limit: 4 });
    },
    getNextPageParam: (lastPage: ProductApiResponse) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <SectionWrapper className='py-6 lg:py-14 flex flex-col gap-6 lg:gap-12 bg-white'>
      <HydrationBoundary state={dehydratedState}>
        <DetailClient id={id} />
      </HydrationBoundary>
    </SectionWrapper>
  );
};

export default Detail;
