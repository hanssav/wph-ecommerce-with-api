import React from 'react';
import SectionWrapper from '@/components/container/section-wrapper';
import TypographyTitle from '@/components/ui/typography/Title';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { ParamsProduct, ProductApiResponse } from '@/types';
import { productsService } from '@/services';
import CatalogClient from './client';

const CatalogLoading = () => (
  <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} className='h-64 bg-gray-200 animate-pulse rounded-lg' />
    ))}
  </div>
);

const Catalog = async () => {
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
    <SectionWrapper className='flex flex-col gap-3 lg:gap-6 py-6'>
      <TypographyTitle label='Catalog' />
      <HydrationBoundary state={dehydratedState}>
        <React.Suspense fallback={<CatalogLoading />}>
          <CatalogClient />
        </React.Suspense>
      </HydrationBoundary>
    </SectionWrapper>
  );
};

export default Catalog;
