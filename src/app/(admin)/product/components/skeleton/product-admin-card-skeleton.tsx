import React from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const ProductAdminCardSkeleton: React.FC = () => {
  return (
    <Card className='flex flex-col gap-3 p-3 lg:hidden'>
      <div className='flex gap-[10px] py-3 border-b'>
        <div className='relative h-12 w-12 overflow-hidden rounded-full'>
          <Skeleton className='h-full w-full rounded-full' />
        </div>
        <div className='flex flex-col justify-center gap-1'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-3 w-16' />
        </div>
      </div>

      <div className='flex gap-[10px] py-3 border-b'>
        <div className='flex-1 flex flex-col gap-1'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-3 w-16' />
        </div>
        <div className='flex-1 flex flex-col gap-1'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-3 w-16' />
        </div>
      </div>

      <div className='flex items-center justify-between gap-[10px] py-3'>
        <Skeleton className='h-4 w-16' />
        <div className='flex gap-4'>
          <Skeleton className='h-5 w-5 rounded-md' />
          <Skeleton className='h-5 w-5 rounded-md' />
          <Skeleton className='h-5 w-5 rounded-md' />
        </div>
      </div>
    </Card>
  );
};
