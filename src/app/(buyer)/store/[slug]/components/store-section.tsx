import { DefaultAvatar } from '@/components/ui/default-avatar';
import Typography from '@/components/ui/typography';
import { Shop } from '@/types/product.types';
import { Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const StoreDetailSection: React.FC<{ shop: Shop }> = ({ shop }) => {
  return (
    <div className='flex gap-6 p-3 lg:p-5 border border-neutral-300 rounded-xl justify-between'>
      <div className='flex gap-2 lg:gap-4'>
        {shop?.logo ? (
          <div className='relative w-14 lg:w-16 rounded-full overflow-hidden aspect-square'>
            <Image
              src={shop?.logo}
              fill
              alt={shop?.slug}
              className='object-cover'
            />
          </div>
        ) : (
          <DefaultAvatar className='lg:w-16' />
        )}
        <div>
          <Typography
            size={{ base: 'sm', lg: 'md' }}
            weight={'bold'}
            className='capitalize'
          >
            {shop?.name}
          </Typography>
          <Typography
            size={{ base: 'sm', lg: 'md' }}
            weight={'normal'}
            className='text-neutral-700'
          >
            {shop?.address}
          </Typography>
        </div>
      </div>
      <div className='flex flex-col items-center text-center'>
        <Typography
          as='div'
          size={{ base: 'md', lg: 'xl' }}
          weight={'semibold'}
          className='flex gap-1 items-center justify-center text-center'
        >
          <div className='relative w-5 h-5'>
            <Star className='absolute w-5 h-5 stroke-gray-300' />
            <Star className='absolute w-5 h-5 stroke-yellow-400 fill-yellow-400' />
          </div>

          {shop?.rating ?? '0.0'}
        </Typography>

        <Typography
          as='p'
          weight={'normal'}
          size={{ base: 'xs', lg: 'md' }}
          className='text-neutral-700'
        >
          Reviews dan Rating
        </Typography>
      </div>
    </div>
  );
};

export default StoreDetailSection;
