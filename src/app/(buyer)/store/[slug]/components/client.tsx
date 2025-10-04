'use client';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { storeService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import StoreDetailSection from './store-section';
import ProductListSection from './product-list';
import TypographyTitle from '@/components/ui/typography/Title';

const Client: React.FC<{ slug: string }> = ({ slug }) => {
  const { data } = useQuery({
    queryKey: ['store', slug],
    queryFn: () => storeService.getStoreBySlug({ slug }),
    enabled: !!slug,
  });

  const { shop, products } = data?.data ?? {};

  return (
    <div className='flex flex-col gap-2 lg:gap-8'>
      <StoreDetailSection shop={shop} />
      <TypographyTitle label='Products' className='hidden lg:block' />

      <ProductListSection products={products} shop={shop} />

      <div className='flex justify-center w-full'>
        <Button
          variant={'outline'}
          size={'lg'}
          className='rounded-lg w-40 lg:!w-[220px]'
        >
          <Typography size={{ base: 'md' }} weight={'semibold'}>
            Load More
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default Client;
