import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Hr } from '@/components/ui/hr';
import Typography from '@/components/ui/typography';
import { IMAGES } from '@/constants';
import { formatDate, formatMoney } from '@/lib/utils';
import { Order } from '@/types';
import { Store } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  const { code, paymentStatus, items, createdAt } = order || {};
  const product = items[0].product || {};

  return (
    <Card className='flex flex-col gap-3 border-none rounded-md p-4 '>
      <div className='flex flex-col lg:flex-row-reverse gap-1.5 justify-between'>
        <Typography
          as='span'
          weight={'semibold'}
          size={{ base: 'sm' }}
          className='!border border-neutral-300 px-2 py-0.5 rounded-sm self-auto w-fit h-fit'
        >
          {paymentStatus}
        </Typography>
        <div className='space-y-0.5'>
          <div className='flex gap-1.5 items-center'>
            <Store className='h-4 w-4' />
            <Typography weight={'normal'} size={{ base: 'sm', lg: 'md' }}>
              {items[0].shop.name} - {code}
            </Typography>
          </div>

          <Typography weight={'normal'} size={{ base: 'sm', lg: 'md' }}>
            {formatDate(createdAt)}
          </Typography>
        </div>
      </div>
      <Hr />

      <div className='flex gap-2.5'>
        <div className='relative w-12 aspect-square overflow-hidden rounded-sm'>
          <Image
            src={product.images[0] ?? IMAGES.DEFAULT_PRODUCT_IMAGE}
            alt={product.title}
            fill
            priority
            sizes='(max-width: 768px) 3rem, 4rem'
          />
        </div>
        <div>
          <Typography
            weight={'bold'}
            size={{ base: 'sm', lg: 'md' }}
            className='max-w-60 line-clamp-1'
          >
            {product.title}
          </Typography>
          <Typography
            weight={'normal'}
            size={{ base: 'sm', lg: 'md' }}
            className='line-clamp-1 max-w-60'
          >
            {items.length} - {product.title}
          </Typography>
        </div>
      </div>
      <Hr />

      <div className='flex justify-between items-center'>
        <div>
          <Typography
            weight={'normal'}
            size={{ base: 'sm', lg: 'md' }}
            className='text-neutral-600'
          >
            Total Payment
          </Typography>
          <Typography weight={'bold'} size={{ base: 'md', lg: 'md' }}>
            {formatMoney(items[0].priceSnapshot)}
          </Typography>
        </div>
        <Button className='rounded-md'>
          {paymentStatus === 'PAID' ? 'Give Review' : 'Cancel Order'}
        </Button>
      </div>
    </Card>
  );
};

export default OrderCard;
