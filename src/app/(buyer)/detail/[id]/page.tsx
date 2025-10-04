'use client';

import React from 'react';
import SectionWrapper from '@/components/container/section-wrapper';
import BreadcrumbComp from './components/breadcrumb';
import { useProduct, useProductById } from '@/hooks';
import ImageGalery from './components/image-galery';
import Typography from '@/components/ui/typography';
import { Hr } from '@/components/ui/hr';
import { Button } from '@/components/ui/button';
import CountButton from './components/count-button';
import { Shop } from '@/types/product.types';
import ShopSection from './components/shop-section';
import ProducDetail from './components/product-detail';
import { Star } from 'lucide-react';
import ReviewCard from './components/review-card';
import ProductCard from '@/components/pages/buyer/product-card';

const Detail = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);

  const { product } = useProductById(id);
  const {
    title,
    images,
    slug,
    rating,
    reviews = [],
    shop = {} as Shop,
  } = product?.data ?? {};

  const { products } = useProduct({ limit: 4 });

  return (
    <SectionWrapper className='py-6 lg:py-14 flex flex-col gap-6 lg:gap-12'>
      <div className='flex flex-col lg:flex-row gap-6 lg:gap-[28px] '>
        <div className='lg:basis-4/10 flex flex-col gap-2'>
          <BreadcrumbComp title={title} className='lg:mb-6' />
          <div className='relative w-full'>
            <ImageGalery images={images} slug={slug} />
          </div>
        </div>
        <div className='lg:basis-6/10 flex flex-col gap-4 lg:gap-5 lg:pt-[54px]'>
          <ProducDetail product={product?.data} />
          <Hr />
          <ShopSection shop={shop} />
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
        <Typography
          weight={'bold'}
          size={{ base: 'display-xs', lg: 'display-md' }}
        >
          Product Review
        </Typography>
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

        {reviews.map((review, idx) => (
          <ReviewCard
            key={idx}
            review={review}
            idx={idx}
            length={reviews.length}
          />
        ))}

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
        <Typography
          weight={'bold'}
          size={{ base: 'display-xs', lg: 'display-md' }}
        >
          Related Product
        </Typography>

        <div className='grid grid-cols-2 lg:grid-cols-4 gap-5'>
          {products?.products.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Detail;
