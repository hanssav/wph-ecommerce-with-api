'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

import React from 'react';
import ProductAdminCard from './product-admin-card';
import { useInfiniteSellerProducts } from '@/hooks';
import Notification from '@/components/container/notification';
import { NOTIFICATION } from '@/constants';
import ShowOrSkeleton from '@/components/container/ShowOrSkeleton';
import { ProductAdminCardSkeleton } from './skeleton';

const ProductAdminClient = () => {
  const initialParams = { limit: 10 };
  const {
    products,
    query: { isLoading },
  } = useInfiniteSellerProducts(initialParams);

  if (!products.length) return <Notification {...NOTIFICATION.PRODUCT_EMPTY} />;

  return (
    <>
      <div className='lg:flex lg:justify-between w-full items-center space-y-3'>
        <Button className='rounded-md w-full lg:max-w-[180px]'>
          + Add Product
        </Button>
        <div className='flex items-center'>
          <Input
            label='search'
            id='search-order'
            className='!w-full lg:max-w-[254px]'
            iconPosition='left'
            icon={<Search className='h-5 w-5 text-neutral-950' />}
          />
        </div>
      </div>

      <ShowOrSkeleton
        isLoading={isLoading}
        Skeleton={ProductAdminCardSkeleton}
        skeletonCount={4}
        data={products}
      >
        {(product, idx) => <ProductAdminCard key={idx} product={product} />}
      </ShowOrSkeleton>
    </>
  );
};

export default ProductAdminClient;
