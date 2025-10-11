import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import Typography from '@/components/ui/typography';
import { IMAGES } from '@/constants';
import { cn, formatMoney } from '@/lib/utils';
import { Product, Shop } from '@/types';
import { CartResponse } from '@/types/cart.types';
import { Store, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const CheckStore: React.FC<{ shop: Partial<Shop> }> = ({ shop }) => {
  return (
    <div className='flex gap-3 items-center'>
      <Checkbox />
      <div className='flex gap-1.5 items-center'>
        <Store className='h-4 w-4' />
        <Typography weight={'semibold'} size={{ base: 'sm', lg: 'md' }}>
          {shop.name}
        </Typography>
      </div>
    </div>
  );
};
const ImageWrapper: React.FC<{ src: string }> = ({ src }) => {
  return (
    <div className='relative w-20 lg:w-32 aspect-square overflow-hidden'>
      <Image
        src={src}
        alt={'product-example'}
        fill
        priority
        sizes='(max-width: 640px) 5rem, (max-width: 1024px) 8rem, 10rem'
        className='object-cover'
      />
    </div>
  );
};
const ProductInfo: React.FC<{ product: Partial<Product>; qty: number }> = ({
  product,
  qty,
}) => (
  <div className='flex flex-col gap-0 items-start justify-center'>
    <Typography weight={'bold'} size={{ base: 'sm', lg: 'lg' }}>
      {product.title}
    </Typography>
    <Typography weight={'normal'} size={{ base: 'xs', lg: 'md' }}>
      {product.category?.name ?? 'No Category Data'}
    </Typography>
    <Typography weight={'normal'} size={{ base: 'xs', lg: 'md' }}>
      {qty} x {formatMoney(product.price ?? 0)}
    </Typography>
  </div>
);
const ProductPriceWithButton: React.FC<{
  qty: number;
  total: number;
}> = ({ qty, total }) => {
  const [count, setCount] = React.useState<number>(qty ?? 0);

  return (
    <>
      <Typography weight={'bold'} size={{ base: 'sm', lg: 'xl' }}>
        {formatMoney(total ?? 0)}
      </Typography>
      <div className='flex gap-2 items-center'>
        <Trash2 className='text-black w-6 h-6' />
        <div className='inline-flex items-center border border-gray-300 rounded-xl p-2 lg:gap-4'>
          <Button
            onClick={() => setCount((prev) => prev - 1)}
            variant={'ghost'}
            className='text-lg leading-lg font-semibold px-2'
          >
            −
          </Button>

          <span className='mx-3 text-lg leading-lg font-medium'>{count}</span>

          <Button
            variant={'ghost'}
            className='text-lg leeading-lg font-semibold px-2'
            onClick={() => setCount((prev) => prev + 1)}
          >
            +
          </Button>
        </div>
      </div>
    </>
  );
};
export const CartCard: React.FC<{
  data: CartResponse['data']['groups'][number];
}> = ({ data }) => {
  const { items, shop } = data;

  return (
    <Card className='border border-neutral-300 rounded-2xl flex flex-col gap-4 p-4 w-full'>
      <CheckStore shop={shop} />

      {items.map((item, idx) => (
        <div
          key={item.id}
          className={cn(
            'flex gap-3 py-2',
            items.length - 1 === idx
              ? 'border-none'
              : 'border-b border-neutral-300 pb-4'
          )}
        >
          <Checkbox />
          <div className='flex flex-col lg:flex-row gap-1 w-full lg: justify-between'>
            <div className='flex gap-2 lg:gap-4'>
              <ImageWrapper
                src={item.product.images[0] ?? IMAGES.MOCK_PRODUCT_IMAGE}
              />
              <ProductInfo product={item.product} qty={item.qty} />
            </div>
            <div className='flex lg:flex-col lg:items-end items-center justify-between w-full lg:w-auto lg:gap-4'>
              <ProductPriceWithButton qty={item.qty} total={item.subtotal} />
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
};
