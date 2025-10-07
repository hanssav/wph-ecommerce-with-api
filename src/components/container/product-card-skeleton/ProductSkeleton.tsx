import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const ProductCardSkeleton: React.FC = () => {
  return (
    <div
      id='product-card-skeleton'
      className='rounded-xl py-0 shadow-card animate-pulse'
    >
      <div className='relative w-full overflow-hidden rounded-sm aspect-[1/1] bg-gray-200'>
        <Skeleton className='w-full h-full' />
      </div>

      <div className='flex flex-col gap-2 p-3'>
        <Skeleton className='h-4 w-3/4 rounded' />
        <Skeleton className='h-4 w-1/3 rounded' />

        <div className='flex items-center gap-3 mt-2'>
          <Skeleton className='h-4 w-12 rounded' />
          <Skeleton className='h-4 w-16 rounded' />
        </div>

        <div className='flex items-center gap-2 mt-3'>
          <Skeleton className='w-5 h-5 rounded-full' />
          <Skeleton className='h-4 w-20 rounded' />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
