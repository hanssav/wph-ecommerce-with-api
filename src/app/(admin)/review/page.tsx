import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';
import PreviewClient from './client';
import TypographyTitle from '@/components/ui/typography/Title';

const Review = async () => {
  const queryClient = new QueryClient();

  const dehydrateState = dehydrate(queryClient);
  return (
    <div className='flex flex-col gap-3'>
      <TypographyTitle label='Reviews' />
      <HydrationBoundary state={dehydrateState}>
        <PreviewClient />
      </HydrationBoundary>
    </div>
  );
};

export default Review;
