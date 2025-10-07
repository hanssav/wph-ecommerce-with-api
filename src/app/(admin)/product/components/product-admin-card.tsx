import { Card } from '@/components/ui/card';
import Typography from '@/components/ui/typography';
import { IMAGES } from '@/constants';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const ProductAdminCard = () => {
  return (
    <Card className='flex flex-col gap-3 p-3 lg:hidden'>
      <div className='flex  gap-[10px] py-3 border-b'>
        <div className='relative h-12 w-12 overflow-hidden rounded-full'>
          <Image
            src={IMAGES.DEFAULT_PRODUCT_IMAGE}
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
            {'Product title'}
          </Typography>
          <Typography
            size={{ base: 'sm' }}
            weight='normal'
            className='leading-tight text-neutral-600'
          >
            {'Category'}
          </Typography>
        </div>
      </div>
      <div className='flex gap-[10px] py-3 border-b'>
        <div className='flex-1'>
          <Typography size={{ base: 'sm' }} weight='bold'>
            {'Product title'}
          </Typography>
          <Typography
            size={{ base: 'sm' }}
            weight='normal'
            className='text-neutral-600 leading-tight'
          >
            {'Category'}
          </Typography>
        </div>
        <div className='flex-1'>
          <Typography size={{ base: 'sm' }} weight='bold'>
            {'Product title'}
          </Typography>
          <Typography
            size={{ base: 'sm' }}
            weight='normal'
            className='text-neutral-600 leading-tight'
          >
            {'Category'}
          </Typography>
        </div>
      </div>
      <div className='flex gap-[10px] py-3 justify-between'>
        <Typography size={{ base: 'sm' }} weight='semibold'>
          {'Action'}
        </Typography>
        <div className='flex gap-4'>
          <Eye className='w-5 h-5' />
          <Pencil className='h-5 w-5' />
          <Trash2 className='h-5 w-5 text-red-600' />
        </div>
      </div>
    </Card>
  );
};

export default ProductAdminCard;
