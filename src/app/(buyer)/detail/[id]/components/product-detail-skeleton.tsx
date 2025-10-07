import React from 'react';
import { Hr } from '@/components/ui/hr';
import { Skeleton } from '@/components/ui/skeleton';

const ProductDetailSkeleton: React.FC = () => {
  return (
    <>
      <div className='flex flex-col gap-0.5 lg:gap-2'>
        <Skeleton className='h-5 lg:h-6 w-2/3' />
        <Skeleton className='h-8 lg:h-10 w-1/3' />
        <div className='flex items-center gap-1'>
          <Skeleton className='w-5 h-5 rounded-full' />
          <Skeleton className='h-4 w-10' />
        </div>
      </div>

      <Hr />

      <div className='flex flex-col gap-2'>
        <Skeleton className='h-5 w-24' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-5/6' />
          <Skeleton className='h-4 w-5/6' />
          <Skeleton className='h-4 w-5/6' />
          <Skeleton className='h-4 w-4/6' />
        </div>
      </div>
    </>
  );
};

export default ProductDetailSkeleton;
