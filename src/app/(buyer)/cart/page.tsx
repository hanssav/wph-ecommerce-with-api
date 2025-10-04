import SectionWrapper from '@/components/container/section-wrapper';
import { cartService } from '@/services';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';
import Client from './components/client';
import TypographyTitle from '@/components/ui/typography/Title';

const Cart: React.FC = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['cart'],
    queryFn: () => cartService.get(),
  });

  const dehydrateState = dehydrate(queryClient);
  return (
    <SectionWrapper className='py-6 lg:py-14 flex flex-col gap-6 lg:gap-12'>
      <TypographyTitle label='Cart' className='lg:hidden' />
      <HydrationBoundary state={dehydrateState}>
        <Client />
      </HydrationBoundary>
    </SectionWrapper>
  );
};

export default Cart;
