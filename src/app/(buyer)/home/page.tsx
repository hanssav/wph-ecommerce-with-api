import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from '@tanstack/react-query';
import { productsService } from '@/services';
import { ParamsProduct, ProductApiResponse } from '@/types';
import SectionWrapper from '@/components/container/section-wrapper';
import HeroSection from './components/hero-section';
import Typography from '@/components/ui/typography';
import HomeClient from './components/client';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery<
    ProductApiResponse,
    Error,
    ProductApiResponse,
    [string, ParamsProduct],
    number
  >({
    queryKey: ['products', {} as ParamsProduct],
    queryFn: async ({ pageParam = 1 }) => {
      return productsService.getAll({ page: pageParam, limit: 8 });
    },
    getNextPageParam: (lastPage: ProductApiResponse) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <SectionWrapper className='px-4 py-6 lg:px-[120px] lg:py-12'>
      <HeroSection />

      <section className='flex flex-col gap-3 lg:gap-10'>
        <Typography
          as='h2'
          size={{ base: 'display-xs', lg: 'display-lg' }}
          weight='bold'
        >
          Feature Product
        </Typography>
        <HydrationBoundary state={dehydratedState}>
          <HomeClient />
        </HydrationBoundary>
      </section>
    </SectionWrapper>
  );
}
