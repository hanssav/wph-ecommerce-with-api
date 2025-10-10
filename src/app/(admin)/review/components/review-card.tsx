import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Typography from '@/components/ui/typography';
import { IMAGES } from '@/constants';
import { cn } from '@/lib/utils';
import { Review } from '@/types';
import { Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const ProductSection: React.FC<{
  images?: string[];
  title: string;
  categoryName: string;
}> = ({ images, title, categoryName }) => {
  return (
    <div className={cn('flex  gap-[10px] py-3')}>
      <div className='relative h-12 w-12 overflow-hidden rounded-md'>
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
const SectionWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn('border-b border-neutral-300', className)}>{children}</div>
);

const ReviewCard: React.FC<{ review?: Review }> = ({ review }) => {
  return (
    <Card>
      <CardContent>
        <SectionWrapper>
          <ProductSection title={'HP'} categoryName='elektronik' />
        </SectionWrapper>
        <SectionWrapper>
          <div className='flex gap-[10px] py-3 border-b'>
            <div className='flex-1'>
              <Typography size={{ base: 'sm' }} weight='bold'>
                Rating
              </Typography>
              <Typography
                as='span'
                size={{ base: 'sm' }}
                weight='bold'
                className='text-neutral-600 leading-tight flex gap-0.5 items-center'
              >
                <span className='relative w-5 h-5'>
                  <Star className='absolute w-5 h-5 stroke-gray-300' />
                  <Star className='absolute w-5 h-5 stroke-yellow-400 fill-yellow-400' />
                </span>
                <span>{'5.9'}</span>
                {/* {formatMoney(price)} */}
              </Typography>
            </div>
            <div className='flex-1'>
              <Typography size={{ base: 'sm' }} weight='bold'>
                Total Review
              </Typography>
              <Typography
                size={{ base: 'sm' }}
                weight='normal'
                className='text-neutral-600 leading-tight'
              >
                {'1000'}
              </Typography>
            </div>
          </div>
        </SectionWrapper>

        <Button variant={'outline'} className='w-full rounded-md my-3'>
          See All Review
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
