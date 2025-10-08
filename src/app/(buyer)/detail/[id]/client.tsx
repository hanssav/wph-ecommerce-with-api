'use client';

import React from 'react';
import { useInfiniteProducts, useProductById } from '@/hooks';
import Typography from '@/components/ui/typography';
import { Hr } from '@/components/ui/hr';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { Shop } from '@/types';
import ProductCard from '@/components/container/product-card';
import ShowOrSkeleton from '@/components/container/show-skeleton';
import ProductCardSkeleton from '@/components/container/product-card-skeleton';
import TypographyTitle from '@/components/ui/typography/Title';
import {
  BreadcrumbComp,
  ImageGallery,
  ImageGallerySkeleton,
  ProducDetail,
  ProductDetailSkeleton,
  ShopSection,
  ShopSectionSkeleton,
} from '@/components/pages/product';
import { CountButton, ReviewCard, ReviewCardSkeleton } from './components';

const DetailClient: React.FC<{ id: string }> = ({ id }) => {
  const {
    product,
    query: { isLoading },
  } = useProductById(id);
  const {
    title,
    images,
    slug,
    rating,
    reviews = [],
    shop = {} as Shop,
  } = product?.data ?? {};

  const productLimit = 4;
  const {
    products,
    query: { isLoading: isProductLoading },
  } = useInfiniteProducts({ limit: productLimit });
  return (
    <>
      <div className='flex flex-col lg:flex-row gap-6 lg:gap-[28px] '>
        <div className='lg:basis-4/10 flex flex-col gap-2'>
          <BreadcrumbComp title={title} className='lg:mb-6' />
          <div className='relative w-full'>
            <ShowOrSkeleton
              isLoading={isLoading}
              skeleton={<ImageGallerySkeleton />}
            >
              <ImageGallery images={images} slug={slug} />
            </ShowOrSkeleton>
          </div>
        </div>
        <div className='lg:basis-6/10 flex flex-col gap-4 lg:gap-5 lg:pt-[54px]'>
          <ShowOrSkeleton
            isLoading={isLoading}
            skeleton={<ProductDetailSkeleton />}
          >
            <ProducDetail product={product?.data} />
          </ShowOrSkeleton>
          <Hr />
          <ShowOrSkeleton
            isLoading={isLoading}
            skeleton={<ShopSectionSkeleton />}
          >
            <ShopSection shop={shop} />
          </ShowOrSkeleton>
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
      <div className='flex flex-col gap-4'>
        <TypographyTitle label='Product Review' />
        <Typography
          as='div'
          size={{ base: 'xl', lg: 'display-xs' }}
          weight={'semibold'}
          className='flex gap-1 items-center'
        >
          <div className='relative w-5 h-5'>
            <Star className='absolute w-5 h-5 stroke-gray-300' />
            <Star className='absolute w-5 h-5 stroke-yellow-400 fill-yellow-400' />
          </div>

          {rating}
          <span className='font-normal text-lg leading-lg text-neutral-700 flex items-end'>
            /5.0
          </span>
        </Typography>

        <ShowOrSkeleton
          isLoading={isLoading}
          skeletonCount={3}
          Skeleton={ReviewCardSkeleton}
          data={reviews}
        >
          {(review, idx, length) => (
            <ReviewCard key={idx} review={review} idx={idx} length={length} />
          )}
        </ShowOrSkeleton>
        <div className='flex justify-center w-full'>
          <Button
            variant={'outline'}
            size={'lg'}
            className='rounded-lg w-40 lg:!w-[220px]'
          >
            <Typography size={{ base: 'md' }} weight={'semibold'}>
              Load More
            </Typography>
          </Button>
        </div>
      </div>
      <Hr className='lg:my-12 my-8' />

      <div className='flex flex-col gap-4 lg:gap-6'>
        <TypographyTitle label='Related Product' />
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        <ShowOrSkeleton
          isLoading={isProductLoading}
          data={products}
          Skeleton={ProductCardSkeleton}
          skeletonCount={4}
        >
          {(product) => <ProductCard key={product.id} product={product} />}
        </ShowOrSkeleton>
      </div>
    </>
  );
};

export default DetailClient;
