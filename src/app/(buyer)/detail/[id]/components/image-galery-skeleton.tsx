import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Hr } from '@/components/ui/hr';

const ImageGallerySkeleton: React.FC = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='relative w-full aspect-square rounded-lg overflow-hidden'>
        <Skeleton className='w-full h-full' />
      </div>
      <div className='flex gap-2 overflow-x-auto'>
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className='relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 border-gray-200'
          >
            <Skeleton className='w-full h-full' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallerySkeleton;
