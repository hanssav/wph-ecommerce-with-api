import SectionWrapper from '@/components/container/section-wrapper';
import { storeService } from '@/services';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';
import Client from './client';
import TypographyTitle from '@/components/ui/typography/Title';

type StoreProps = {
  params: {
    slug: string;
  };
};

export default async function Store({ params }: StoreProps) {
  const { slug } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['store', slug],
    queryFn: () => storeService.getStoreBySlug({ slug }),
  });

  const dehydrateStore = dehydrate(queryClient);

  return (
    <SectionWrapper className='py-6 lg:py-14 flex flex-col gap-6 lg:gap-12'>
      <TypographyTitle label='Products' className='lg:hidden' />

      <HydrationBoundary state={dehydrateStore}>
        <Client slug={slug} />
      </HydrationBoundary>
    </SectionWrapper>
  );
}
