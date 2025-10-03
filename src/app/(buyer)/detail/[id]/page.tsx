'use client';

import React from 'react';
import SectionWrapper from '@/components/container/section-wrapper';
import BreadcrumbComp from './breadcrumb';
import { useProductById } from '@/hooks';
import ImageGalery from './image-galery';
import Typography from '@/components/ui/typography';
import { formatMoney } from '@/lib/utils';
import { Star } from 'lucide-react';
import { Hr } from '@/components/ui/hr';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import CountButton from './count-button';
import { Shop } from '@/types/product.types';
import { DefaultAvatar } from '@/components/ui/default-avatar';

const Detail = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);

  const { product } = useProductById(id);
  const {
    title,
    images,
    slug,
    price = 0,
    rating = 0,
    description,
    shop = {} as Shop,
  } = product?.data ?? {};
  console.log(product, 'product data, ....');

  return (
    <SectionWrapper className='py-6 lg:py-14'>
      <div className='flex flex-col lg:flex-row gap-6 lg:gap-[28px] '>
        <div className='lg:basis-4/10 flex flex-col gap-2'>
          <BreadcrumbComp title={title} className='lg:mb-6' />
          <div className='relative w-full'>
            <ImageGalery images={images} slug={slug} />
          </div>
        </div>
        <div className='lg:basis-6/10 flex flex-col gap-4 lg:gap-5 lg:pt-[54px]'>
          <div className='flex flex-col gap-0.5 lg:gap-2'>
            <Typography weight={'semibold'} size={{ base: 'md', lg: 'xl' }}>
              {title}
            </Typography>
            <Typography weight={'bold'} size={{ base: 'xl', lg: 'display-md' }}>
              {formatMoney(price)}
            </Typography>
            <Typography
              as='div'
              size={{ base: 'sm', lg: 'lg' }}
              weight={'semibold'}
              className='flex gap-1 items-center'
            >
              <div className='relative w-5 h-5'>
                <Star className='absolute w-5 h-5 stroke-gray-300' />
                <Star className='absolute w-5 h-5 stroke-yellow-400 fill-yellow-400' />
              </div>
              {rating}
            </Typography>
          </div>
          <Hr />
          <div className='flex flex-col gap-2'>
            <Typography size={{ base: 'md', lg: 'lg' }} weight={'bold'}>
              Deskripsi
            </Typography>
            <Typography size={{ base: 'sm', lg: 'md' }} weight={'normal'}>
              {description}
            </Typography>
          </div>
          <Hr />
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
          <Hr />
          <CountButton />
          <Button className='rounded-lg p-2 lg:p-6 lg:w-[312px]' size={'lg'}>
            <Typography
              weight={'semibold'}
              size={{ base: 'md' }}
              className='text-white'
            >
              + Add to Cart
            </Typography>
          </Button>
        </div>
      </div>
      <Hr className='lg:my-12 my-8' />
    </SectionWrapper>
  );
};

export default Detail;
