import Typography from '@/components/ui/typography';
import { ICONS } from '@/constants';
import { formatMoney } from '@/lib/utils';
import { Product } from '@/types/product.types';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const router = useRouter();
  const {
    title,
    price,
    rating,
    soldCount,
    shop: { name: shopName },
    images,
    slug,
    id,
  } = product;

  return (
    <div
      onClick={() => router.push(`/detail/${id}`)}
      id='product-card'
      className='rounded-xl py-0 shadow-card !hover:shadow-card-hover cursor-pointer'
    >
      <div className='relative w-full rounded-sm overflow-hidden aspect-[1/1]'>
        <Image
          src={images[0]}
          alt={slug}
          fill
          className='object-cover'
          sizes='(max-width: 640px) 50vw, (max-width: 768px) 33.33vw, (max-width: 1024px) 25vw, 25vw'
          priority
          unoptimized
        />
      </div>

      <div className='flex flex-col p-3'>
        <Typography
          weight={'normal'}
          size={{ base: 'sm', lg: 'md' }}
          className='tracking-wide line-clamp-2'
        >
          {title}
        </Typography>
        <Typography weight={'bold'} size={{ base: 'sm', lg: 'md' }}>
          {formatMoney(price)}
        </Typography>

        <div className='flex gap-[6px] items-center'>
          <div className='relative w-5 h-5'>
            {/* background */}
            <Star className='absolute w-5 h-5 stroke-gray-300' />
            {/* filled */}
            <Star className='absolute w-5 h-5 stroke-yellow-400 fill-yellow-400' />
          </div>

          <Typography size={{ base: 'sm', lg: 'md' }} weight={'normal'}>
            {rating}
          </Typography>

          <span className='text-sm font-bold -translate-y-1'>.</span>

          <Typography size={{ base: 'sm', lg: 'md' }} weight={'normal'}>
            {soldCount} Sold
          </Typography>
        </div>

        <div className='flex gap-1 items-center'>
          <div className='relative w-5 h-5 overflow-hidden aspect-[1/1]'>
            <Image
              src={ICONS.BADGE_CHECK}
              alt='badge-check'
              fill
              className='object-cover'
            />
          </div>

          <Typography size={{ base: 'sm', lg: 'md' }} weight={'normal'}>
            {shopName}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
