import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Typography from '@/components/ui/typography';
import { IMAGES } from '@/constants';
import { Store, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const CheckStore = () => {
  return (
    <div className='flex gap-3 items-center'>
      <Checkbox />
      <div className='flex gap-1.5 items-center'>
        <Store className='h-4 w-4' />
        <Typography weight={'semibold'} size={{ base: 'sm', lg: 'md' }}>
          Toko Barokah Jaya
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
        className='object-cover'
      />
    </div>
  );
};
const ProductInfo = () => (
  <div className='flex flex-col gap-0 items-start justify-center'>
    <Typography weight={'bold'} size={{ base: 'sm', lg: 'lg' }}>
      Iphone 17 Pro Max
    </Typography>
    <Typography weight={'normal'} size={{ base: 'xs', lg: 'md' }}>
      Gadged
    </Typography>
  </div>
);
const ProductPriceWithButton: React.FC<{
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}> = ({ count, setCount }) => (
  <>
    <Typography weight={'bold'} size={{ base: 'sm', lg: 'xl' }}>
      Rp.17.000.000
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
export const CartCard: React.FC = () => {
  const [count, setCount] = React.useState<number>(0);

  return (
    <div className='border border-neutral-300 rounded-2xl flex flex-col gap-4 p-4 w-full'>
      <CheckStore />

      <div className='flex gap-3'>
        <Checkbox />
        <div className='flex flex-col lg:flex-row gap-1 w-full lg: justify-between'>
          <div className='flex gap-2 lg:gap-4'>
            <ImageWrapper src={IMAGES.MOCK_PRODUCT_IMAGE} />
            <ProductInfo />
          </div>
          <div className='flex lg:flex-col lg:items-end items-center justify-between w-full lg:w-auto lg:gap-4'>
            <ProductPriceWithButton count={count} setCount={setCount} />
          </div>
        </div>
      </div>
    </div>
  );
};
