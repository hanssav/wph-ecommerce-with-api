'use client';
import React from 'react';
import ProductCard from '@/components/container/product-card';
import ProductCardSkeleton from '@/components/container/product-card-skeleton';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { useInfiniteProducts } from '@/hooks';

const HomeClient = () => {
  const limit = 8;
  const {
    products,
    query: { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading },
  } = useInfiniteProducts({ limit: limit });

  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {(isLoading || isFetchingNextPage) &&
          Array.from({ length: limit }).map((_, index) => (
            <ProductCardSkeleton key={`skeleton-${index}`} />
          ))}
      </div>
      <div className='flex justify-center w-full'>
        <Button
          variant={'outline'}
          size={'lg'}
          className='rounded-lg w-40 lg:!w-[220px]'
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage || !hasNextPage}
        >
          <Typography size={{ base: 'md' }} weight={'semibold'}>
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </Typography>
        </Button>
      </div>
      ;
    </>
  );
};

export default HomeClient;
