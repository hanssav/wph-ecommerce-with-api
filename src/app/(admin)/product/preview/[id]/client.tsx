'use client';
import ShowOrSkeleton from '@/components/container/show-skeleton';
import {
  BreadcrumbComp,
  ImageGallery,
  ImageGallerySkeleton,
  ProducDetail,
  ProductDetailSkeleton,
  ShopSection,
  ShopSectionSkeleton,
} from '@/components/pages/product';
import { Hr } from '@/components/ui/hr';
import { useProductById } from '@/hooks';
import { Shop } from '@/types';
import React from 'react';

const PreviewClient: React.FC<{ id: string }> = ({ id }) => {
  const {
    product,
    query: { isLoading },
  } = useProductById(id);

  const { title, images, slug, shop = {} as Shop } = product?.data ?? {};

  return (
    <div className='flex flex-col lg:flex-row gap-6 lg:gap-[28px] '>
      <div className='lg:basis-4/10 flex flex-col gap-2'>
        <BreadcrumbComp isAdmin title={title} className='lg:mb-6' />
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
      </div>
    </div>
  );
};

export default PreviewClient;
