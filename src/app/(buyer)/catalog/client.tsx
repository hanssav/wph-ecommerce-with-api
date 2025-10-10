'use client';
import React from 'react';
import Typography from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { useDebounce, useInfiniteProducts } from '@/hooks';
import ProductCard from '@/components/container/product-card';
import ProductCardSkeleton from '@/components/container/product-card-skeleton';
import { FilterBtn, FilterSection, SortBtn, Subtitle } from './components';
import { ParamsProduct } from '@/types';
import Notification from '@/components/container/notification';
import { NOTIFICATION } from '@/constants';

const CatalogClient = () => {
  const [filter, setFilter] = React.useState<ParamsProduct>({
    limit: 12,
    order: 'desc',
  });

  const debounceMinPrice = useDebounce(filter.minPrice, 500);
  const debounceMaxPrice = useDebounce(filter.maxPrice, 500);

  const debouncedFilter = React.useMemo(
    () => ({
      ...filter,
      minPrice: debounceMinPrice,
      maxPrice: debounceMaxPrice,
    }),
    [filter, debounceMinPrice, debounceMaxPrice]
  );
  const {
    products,
    query: { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading },
  } = useInfiniteProducts(debouncedFilter);

  const { src, title } = NOTIFICATION.PRODUCT_EMPTY;

  const notificationProps = {
    src,
    title,
    subtitle: 'No products found. Please adjust your filters.',
  };
  return (
    <>
      <div className='lg:hidden flex flex-col gap-3'>
        <Subtitle />
        <div className='flex gap-2'>
          <FilterBtn />
          <SortBtn filter={filter} setFilter={setFilter} />
        </div>
      </div>
      <div className='lg:flex lg:flex-row gap-4 lg:gap-6'>
        <div className='hidden basis-3/15 lg:block  border border-neutral-300 h-full py-4 gap-6 rounded-xl'>
          <FilterSection filter={filter} setFilter={setFilter} />
        </div>
        <div className='basis-12/15 flex flex-col gap-6'>
          <div className='hidden lg:flex justify-between items-center'>
            <Subtitle />
            <div className='flex gap-3 items-center'>
              <Typography weight={'bold'} size={'md'}>
                Sort
              </Typography>
              <SortBtn filter={filter} setFilter={setFilter} />
            </div>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {products.map((product, idx) => (
              <ProductCard key={`${product.id}-${idx}`} product={product} />
            ))}

            {(isLoading || isFetchingNextPage) &&
              Array.from({ length: filter.limit ?? 20 }).map((_, index) => (
                <ProductCardSkeleton key={`skeleton-${index}`} />
              ))}
            {!isLoading && products.length === 0 && (
              <div className='col-span-full flex justify-center py-10'>
                <Notification {...notificationProps} />
              </div>
            )}
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
