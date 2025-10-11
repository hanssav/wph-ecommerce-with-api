'use client';
import React from 'react';
import ProductCard from '@/components/container/product-card';
import ProductCardSkeleton from '@/components/container/product-card-skeleton';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { useDebounce, useInfiniteProducts } from '@/hooks';
import { ParamsProduct } from '@/types';
import { useSearchParams } from 'next/navigation';
import ShowOrSkeleton from '@/components/container/show-skeleton';
import { NOTIFICATION } from '@/constants';
import Notification from '@/components/container/notification';

const HomeClient: React.FC = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const [filter, setFilter] = React.useState<ParamsProduct>({
    limit: 12,
    q: '',
  });

  React.useEffect(() => {
    setFilter((prev) => ({ ...prev, q }));
  }, [q]);

  const debouncedFilter = useDebounce(filter, 400);
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
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        <ShowOrSkeleton
          isLoading={isLoading || isFetchingNextPage}
          data={products}
          Skeleton={ProductCardSkeleton}
          skeletonCount={8}
        >
          {(product) => <ProductCard key={product.id} product={product} />}
        </ShowOrSkeleton>
      </div>

      {products && products.length > 0 ? (
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
      ) : (
        <Notification
          {...notificationProps}
          className='flex h-full items-center my-40'
        />
      )}
    </>
  );
};

export default HomeClient;
