import { Button } from '@/components/ui/button';
import { DefaultAvatar } from '@/components/ui/default-avatar';
import Typography from '@/components/ui/typography';
import { Shop } from '@/types/product.types';
import Image from 'next/image';
import React from 'react';

const ShopSection: React.FC<{ shop: Shop }> = ({ shop }) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex gap-2 lg:gap-4'>
        {shop?.logo ? (
          <div className='relative w-14 lg:w-16 rounded-full overflow-hidden aspect-square'>
            <Image
              src={shop.logo}
              fill
              alt={shop.slug}
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
            {shop.name}
          </Typography>
          <Typography
            size={{ base: 'sm', lg: 'md' }}
            weight={'normal'}
            className='text-neutral-700'
          >
            {shop.address}
          </Typography>
        </div>
      </div>
      <Button variant={'outline'} className='rounded-lg lg:w-40'>
        See Store
      </Button>
    </div>
  );
};

export default ShopSection;
