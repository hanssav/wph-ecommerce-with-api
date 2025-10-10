import Notification from '@/components/container/notification';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Typography from '@/components/ui/typography';
import { NOTIFICATION } from '@/constants';
import { formatDate } from '@/lib/utils';
import { Search, Star, Store } from 'lucide-react';
import React from 'react';
import { mockReviews } from './components/mock-reviews';
import Image from 'next/image';
import { Hr } from '@/components/ui/hr';

const ReviewClient = () => {
  const mockReview = [{ data: '1' }];

  if (!mockReview.length) {
    return <Notification {...NOTIFICATION.REVIEW_EMPTY} />;
  }

  return (
    <>
      <Input
        label='search'
        id='search-order'
        className='!w-full'
        iconPosition='left'
        icon={<Search className='h-5 w-5 text-neutral-950' />}
      />

      {mockReviews.map(
        ({ storeName, invoice, date, product, rating, review }, idx) => (
          <Card className='flex flex-col gap-3 p-3 lg:p-5' key={idx}>
            <div className='space-y-0.5 flex flex-col lg:flex-row gap-2'>
              <div className='flex gap-1.5 items-center'>
                <Store className='h-4 w-4' />
                <Typography weight={'normal'} size={{ base: 'sm', lg: 'md' }}>
                  {storeName}
                </Typography>
                <span className='hidden lg:block'>-</span>
              </div>
              <div className='flex gap-2'>
                <Typography weight={'normal'} size={{ base: 'sm', lg: 'md' }}>
                  {invoice}
                </Typography>
                <span className='lg:hidden font-bold'>.</span>
                <Typography weight={'normal'} size={{ base: 'sm', lg: 'md' }}>
                  {formatDate(date)}
                </Typography>
              </div>
            </div>

            <div className='flex gap-2.5'>
              <div className='relative w-12 aspect-square overflow-hidden rounded-sm'>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes='(max-width: 768px) 3rem, 4rem'
                  className='object-cover'
                />
              </div>
              <div>
                <Typography
                  weight={'bold'}
                  size={{ base: 'sm', lg: 'md' }}
                  className='max-w-60 line-clamp-1'
                >
                  {product.name}
                </Typography>
                <Typography
                  weight={'normal'}
                  size={{ base: 'sm', lg: 'md' }}
                  className='line-clamp-1 max-w-60'
                >
                  {product.qty}x {product.price}
                </Typography>
              </div>
            </div>
            <Hr />
            <div className='flex flex-col gap-2'>
              <Typography
                weight={'bold'}
                size={{ base: 'sm', lg: 'md' }}
                className='max-w-60 line-clamp-1'
              >
                My Review
              </Typography>
              <div className='flex gap-1'>
                {Array.from({ length: rating }).map((_, idx) => (
                  <div className='relative w-5 h-5' key={idx}>
                    <Star className='absolute w-5 h-5 stroke-gray-300' />
                    <Star className='absolute w-5 h-5 stroke-yellow-400 fill-yellow-400' />
                  </div>
                ))}
              </div>
              <Typography
                weight={'normal'}
                size={{ base: 'sm', lg: 'md' }}
                className='line-clamp-1 max-w-60'
              >
                {review}
              </Typography>
            </div>
          </Card>
        )
      )}
    </>
  );
};

export default ReviewClient;
