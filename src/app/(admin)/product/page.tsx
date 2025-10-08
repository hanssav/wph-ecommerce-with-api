import React from 'react';
import TypographyTitle from '@/components/ui/typography/Title';
import ProductAdminClient from './product-admin-client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { productsService } from '@/services';
import { ParamsSellerProduct, ProductApiResponse } from '@/types';

const Product = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery<
    ProductApiResponse,
    Error,
    ProductApiResponse,
    [string, ParamsSellerProduct],
    number
  >({
    queryKey: ['products', {} as ParamsSellerProduct],
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
    <div className='flex flex-col gap-3 w-full'>
      <TypographyTitle label='Products' />
      <HydrationBoundary state={dehydratedState}>
        <ProductAdminClient />
      </HydrationBoundary>
    </div>
  );
};

export default Product;
