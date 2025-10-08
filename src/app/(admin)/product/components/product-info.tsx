import Typography from '@/components/ui/typography';
import { IMAGES } from '@/constants';
import { cn } from '@/lib/utils';
import { Product } from '@/types';
import Image from 'next/image';
import React from 'react';

const ProductInfo: React.FC<{
  images: Product['images'];
  title?: Product['title'];
  categoryName?: Product['category']['name'];
  tableHeader?: boolean;
}> = ({ images, title, categoryName, tableHeader = false }) => {
  return (
    <div className={cn('flex  gap-[10px] py-3', !tableHeader && 'border-b')}>
      <div className='relative h-12 w-12 overflow-hidden rounded-md'>
        <Image
          src={images[0] ?? IMAGES.DEFAULT_PRODUCT_IMAGE}
          alt={'default-image'}
          fill
          priority
          sizes='40px'
          className='object-cover'
          unoptimized
        />
      </div>
      <div>
        <Typography size={{ base: 'sm' }} weight='bold'>
          {title}
        </Typography>
        <Typography
          size={{ base: 'sm' }}
          weight='normal'
          className='leading-tight text-neutral-600'
        >
          {categoryName}
        </Typography>
      </div>
    </div>
  );
};

export default ProductInfo;
