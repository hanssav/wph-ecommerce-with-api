import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const ShopSectionSkeleton: React.FC = () => {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex gap-2 lg:gap-4 items-center'>
        <div className='relative w-14 lg:w-16 aspect-square rounded-full overflow-hidden'>
          <Skeleton className='w-full h-full rounded-full' />
        </div>
        <div className='flex flex-col gap-2'>
          <Skeleton className='h-5 w-24' />
          <Skeleton className='h-4 w-32' />
        </div>
      </div>
      <Skeleton className='h-10 lg:w-40 w-24 rounded-lg' />
    </div>
  );
};

export default ShopSectionSkeleton;
