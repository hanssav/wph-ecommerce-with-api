import TypographyTitle from '@/components/ui/typography/Title';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';
import OrderClient from './components/client';
import { orderService } from '@/services';

const Order = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['orders/my'],
    queryFn: () => orderService.getOrdersMy(),
  });

  const dehydrateState = dehydrate(queryClient);

  return (
    <div className='space-y-4'>
      <TypographyTitle label='Order List' className='' />
      <HydrationBoundary state={dehydrateState}>
        <OrderClient />
      </HydrationBoundary>
    </div>
  );
};

export default Order;
