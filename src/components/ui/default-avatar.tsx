import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const DefaultAvatar: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'relative w-15 aspect-square rounded-full overflow-hidden',
        className
      )}
    >
      <Image
        src='https://www.shutterstock.com/image-vector/woman-girl-avatar-shopping-shop-260nw-475989598.jpg'
        fill
        alt='Shop avatar'
        className='object-cover rounded-full'
      />
    </div>
  );
};

export { DefaultAvatar };
