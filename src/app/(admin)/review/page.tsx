import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';
import PreviewClient from './client';
import TypographyTitle from '@/components/ui/typography/Title';
import { reviewService } from '@/services';

const Review = async () => {
  const queryClient = new QueryClient();

  const params = { page: 1, limit: 10 };

  await queryClient.prefetchQuery({
    queryKey: ['reviews/my', params],
    queryFn: () => reviewService.getAll(params),
    staleTime: 60_000,
  });

  const dehydrateState = dehydrate(queryClient);
  return (
    <div className='flex flex-col gap-3 py-4'>
      <TypographyTitle label='Reviews' />
      <HydrationBoundary state={dehydrateState}>
        <PreviewClient />
      </HydrationBoundary>
    </div>
  );
};

export default Review;
