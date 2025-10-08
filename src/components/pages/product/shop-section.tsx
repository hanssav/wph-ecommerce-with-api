import { Button } from '@/components/ui/button';
import { DefaultAvatar } from '@/components/ui/default-avatar';
import Typography from '@/components/ui/typography';
import { PATH } from '@/constants';
import { Shop } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const ShopSection: React.FC<{ shop: Shop }> = ({ shop }) => {
  const router = useRouter();

  return (
    <div className='flex justify-between items-center gap-2 lg:gap-4'>
      <div className='flex gap-2 lg:gap-4'>
        {shop?.logo ? (
          <div className='relative w-14 lg:w-16 rounded-full overflow-hidden aspect-square'>
            <Image
              src={shop.logo}
              alt={shop.slug}
              fill
              sizes='(max-width: 1024px) 56px, 64px'
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
      <Button
        onClick={() => router.push(`${PATH.STORE}/${shop.slug}`)}
        variant={'outline'}
        className='rounded-lg lg:w-40'
      >
        See Store
      </Button>
    </div>
  );
};

export default ShopSection;
