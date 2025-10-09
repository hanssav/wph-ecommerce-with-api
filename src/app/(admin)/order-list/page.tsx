import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';
import OrderClient from './client';
import { storeService } from '@/services';
import TypographyTitle from '@/components/ui/typography/Title';

const OrderList = async () => {
  const queryClient = new QueryClient();

  const params = { page: 1, limit: 10 };
  await queryClient.prefetchQuery({
    queryKey: ['seller/order-items', params],
    queryFn: () => storeService.getAllOrderBySeller(params),
    staleTime: 60000,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className='flex flex-col gap-3 py-4'>
      <TypographyTitle label='Order List' />
      <HydrationBoundary state={dehydratedState}>
        <OrderClient />
      </HydrationBoundary>
    </div>
  );
};

export default OrderList;
