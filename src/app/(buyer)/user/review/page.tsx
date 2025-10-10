import TypographyTitle from '@/components/ui/typography/Title';
import React from 'react';
import ReviewClient from './client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

const Review = async () => {
  const queryClient = new QueryClient();

  // fetch review in here
  // await

  const dehydratedState = dehydrate(queryClient);
  return (
    <div className='space-y-4'>
      <TypographyTitle label='Review' className='' />
      <HydrationBoundary state={dehydratedState}>
        <ReviewClient />
      </HydrationBoundary>
    </div>
  );
};

export default Review;
