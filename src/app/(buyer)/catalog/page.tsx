'use client';
import SectionWrapper from '@/components/container/section-wrapper';
import ProductCard from '@/components/container/product-card';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { useProduct } from '@/hooks';
import React from 'react';
import { FilterSection } from './components/filter-section';
import { Subtitle } from './components/subtitle';
import { FilterBtn } from './components/filter-btn';
import { SortBtn } from './components/sort-btn';
import TypographyTitle from '@/components/ui/typography/Title';

const Catalog = () => {
  const { products, isLoading } = useProduct();

  return (
    <SectionWrapper className='flex flex-col lg:gap-6 py-6'>
      <TypographyTitle label='Catalog' />
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
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 py-4'>
            {isLoading && <Typography as='p'>loading...</Typography>}
            {products?.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
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
    </SectionWrapper>
  );
};

export default Catalog;
