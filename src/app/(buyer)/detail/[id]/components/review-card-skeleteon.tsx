import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Hr } from '@/components/ui/hr';

const ReviewCardSkeleton: React.FC<{ idx: number; length: number }> = ({
  idx,
  length,
}) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-3 items-center'>
        <div className='relative w-14 lg:w-16 aspect-square rounded-full overflow-hidden'>
          <Skeleton className='w-full h-full rounded-full' />
        </div>
        <div className='flex flex-col gap-2'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-3 w-32' />
        </div>
      </div>
      <div className='flex gap-1'>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className='w-4 h-4 rounded-full' />
        ))}
      </div>
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-5/6' />
      {idx !== length - 1 && <Hr />}
    </div>
  );
};

export default ReviewCardSkeleton;
