'use client';
import SectionWrapper from '@/components/container/section-wrapper';
import ProductCard from '@/components/pages/buyer/home/product-card';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { useProduct } from '@/hooks';
import { ChevronDown, Filter, ListFilter } from 'lucide-react';
import React from 'react';

const SortBtn = () => {
  return (
    <Button
      size={'lg'}
      variant='outline'
      className='flex-1 flex items-center justify-between gap-2 rounded-lg lg:max-w-32'
    >
      Latest
      <ChevronDown className='h-5 w-5' />
    </Button>
  );
};
const FilterBtn = () => {
  return (
    <Button
      size={'lg'}
      variant='outline'
      className='flex-1 flex items-center justify-between gap-2 rounded-lg'
    >
      Filter
      <ListFilter className='h-5 w-5' />
    </Button>
  );
};
const Subtitle = () => {
  return (
    <Typography as='p' weight={'normal'} size={{ base: 'xs', lg: 'md' }}>
      Showing 160 products
    </Typography>
  );
};
const FilterWrapper: React.FC<{
  title?: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <div className='px-4'>
      <Typography weight={'bold'} size={{ lg: 'md' }}>
        {title}
      </Typography>
      {children}
    </div>
  );
};
const HorizontalRule = () => (
  <hr className='border border-neutral-300 w-full' />
);
const Catalog = () => {
  const { products, isLoading } = useProduct();

  return (
    <SectionWrapper className='flex flex-col lg:gap-6 py-6'>
      <Typography
        as='h2'
        weight={'bold'}
        size={{ base: 'display-xs', lg: 'display-md' }}
      >
        Catalog
      </Typography>
      <div className='lg:hidden flex flex-col gap-3'>
        <Subtitle />
        <div className='flex gap-2'>
          <FilterBtn />
          <SortBtn />
        </div>
      </div>
      <div className='flex lg:flex-row gap-4 lg:gap-6'>
        <div className='hidden lg:block basis-5/15 border border-neutral-300 h-full py-4 gap-6 rounded-xl'>
          <div className='flex flex-col gap-[10px]'>
            <Typography weight={'bold'} size={{ lg: 'md' }} className='px-4'>
              FILTER
            </Typography>
            <FilterWrapper title='Categories'>checkbox session</FilterWrapper>
            <HorizontalRule />
            <FilterWrapper title='Price'>Ratin session</FilterWrapper>
            <HorizontalRule />
            <FilterWrapper title='Rating'>Rating session</FilterWrapper>
          </div>
        </div>
        <div className='flex flex-col gap-6'>
          <div className='hidden lg:flex justify-between items-center'>
            <Subtitle />
            <SortBtn />
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
