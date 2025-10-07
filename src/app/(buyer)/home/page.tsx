'use client';
import ProductCard from '@/components/container/product-card';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { useInfiniteProducts } from '@/hooks';
import React from 'react';
import HeroSection from './components/hero-section';
import SectionWrapper from '@/components/container/section-wrapper';
import ProductCardSkeleton from '@/components/container/product-card-skeleton';

export default function Home() {
  const limit = 8;
  const {
    products,
    query: { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading },
  } = useInfiniteProducts({ limit: limit });

  return (
    <SectionWrapper className='px-4 py-6 lg:px-[120px] lg:py-12'>
      <HeroSection />

      <section className='flex flex-col gap-3 lg:gap-10 '>
        <Typography
          as='h2'
          size={{ base: 'display-xs', lg: 'display-lg' }}
          weight='bold'
        >
          Feature Product
        </Typography>

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
      </section>
    </SectionWrapper>
  );
}
