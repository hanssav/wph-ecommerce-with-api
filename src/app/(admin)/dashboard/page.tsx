import TypographyTitle from '@/components/ui/typography/Title';
import { userService } from '@/services';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';
import DashboardClient from './client';

const Dashboard = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['me'],
    queryFn: () => {
      return userService.getMe();
    },
    staleTime: 1000 * 60,
  });

  const dehydrateState = dehydrate(queryClient);
  return (
    <div className='h-full flex flex-col gap-3'>
      <TypographyTitle label='Dashboard' />
      <HydrationBoundary state={dehydrateState}>
        <DashboardClient />
      </HydrationBoundary>
    </div>
  );
};

export default Dashboard;
