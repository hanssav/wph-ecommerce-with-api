import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';
import SettingClient from './client';
import { storeService } from '@/services';
import TypographyTitle from '@/components/ui/typography/Title';

const Setting = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['seller/shop'],
    queryFn: () => storeService.getSeller(),
    staleTime: 60000,
  });

  const dehydrateState = dehydrate(queryClient);

  return (
    <div className='flex flex-col gap-3'>
      <TypographyTitle label='Settings' />
      <HydrationBoundary state={dehydrateState}>
        <SettingClient />
      </HydrationBoundary>
    </div>
  );
};

export default Setting;
