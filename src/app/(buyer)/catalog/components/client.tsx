'use client';
import React from 'react';
import { Subtitle } from './subtitle';
import { FilterBtn } from './filter-btn';
import { SortBtn } from './sort-btn';
import { FilterSection } from './filter-section';
import Typography from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { useInfiniteProducts } from '@/hooks';
import ProductCard from '@/components/container/product-card';
import ProductCardSkeleton from '@/components/container/product-card-skeleton';

const CatalogClient = () => {
  const limit = 8;
  const {
    products,
    query: { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading },
  } = useInfiniteProducts({ limit: limit });

  return (
    <>
      <div className='lg:hidden flex flex-col gap-3'>
        <Subtitle />
        <div className='flex gap-2'>
          <FilterBtn />
          <SortBtn />
        </div>
      </div>
      <div className='lg:flex lg:flex-row gap-4 lg:gap-6'>
        <div className='hidden basis-3/15 lg:block  border border-neutral-300 h-full py-4 gap-6 rounded-xl'>
          <FilterSection />
        </div>
        <div className='basis-12/15 flex flex-col gap-6'>
          <div className='hidden lg:flex justify-between items-center'>
            <Subtitle />
            <div className='flex gap-3 items-center'>
              <Typography weight={'bold'} size={'md'}>
                Sort
              </Typography>
              <SortBtn />
            </div>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {(isLoading || isFetchingNextPage) &&
              Array.from({ length: limit }).map((_, index) => (
                <ProductCardSkeleton key={`skeleton-${index}`} />
              ))}
          </div>
        </div>
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
    </>
  );
};

export default CatalogClient;
