'use client';
import { Checkbox } from '@/components/ui/checkbox';
import Typography from '@/components/ui/typography';
import { useGetCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';
import { Store, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';

type CheckAllProps = {
  selected: boolean;
  onSelectChange: () => void;
  className?: string;
};

const CheckAll: React.FC<CheckAllProps> = ({
  selected,
  onSelectChange,
  className,
}) => {
  return (
    <div className={cn('flex gap-3 items-center', className)}>
      <Checkbox name='all' checked={selected} onChange={onSelectChange} />
      <Typography
        as='label'
        htmlFor='all'
        weight={'medium'}
        size={{ base: 'sm' }}
        className='text-neutral-950'
      >
        Select All
      </Typography>
    </div>
  );
};
const CartCard: React.FC = () => {
  const mockImage =
    'https://images.macrumors.com/t/UDyL8vJo9SZGNLUyL5bgRD2vtmA=/1600x0/article-new/2025/07/iPhone-17-Pro-Dark-Blue-and-Orange.jpg';

  const [count, setCount] = React.useState<number>(0);

  return (
    <div className='border border-neutral-300 rounded-2xl flex flex-col gap-4 p-4 w-full'>
      <div className='flex gap-3 items-center'>
        <Checkbox />
        <div className='flex gap-1.5 items-center'>
          <Store className='h-4 w-4' />
          <Typography weight={'semibold'} size={{ base: 'sm' }}>
            Toko Barokah Jaya
          </Typography>
        </div>
      </div>

      <div className='flex gap-3'>
        <Checkbox />
        <div className='flex flex-col gap-1 w-full'>
          <div className='flex gap-2'>
            <div className='relative w-20 aspect-square overflow-hidden'>
              <Image
                src={mockImage}
                alt={'product-example'}
                fill
                priority
                className='object-cover'
              />
            </div>
            <div className='flex flex-col gap-0 items-start justify-center'>
              <Typography weight={'bold'} size={{ base: 'sm' }}>
                Iphone 17 Pro Max
              </Typography>
              <Typography weight={'normal'} size={{ base: 'xs' }}>
                Gadged
              </Typography>
            </div>
          </div>
          <div className='flex items-center justify-between w-full'>
            <Typography weight={'bold'} size={{ base: 'sm' }}>
              Rp.17.000.000
            </Typography>
            <div className='flex gap-2 items-center'>
              <Trash2 className='text-black w-6 h-6' />
              <div className='inline-flex items-center border border-gray-300 rounded-xl p-2 lg:gap-2'>
                <Button
                  onClick={() => setCount((prev) => prev - 1)}
                  variant={'ghost'}
                  className='text-lg leading-lg font-semibold px-2'
                >
                  −
                </Button>

                <span className='mx-3 text-lg leading-lg font-medium'>
                  {count}
                </span>

                <Button
                  variant={'ghost'}
                  className='text-lg leeading-lg font-semibold px-2'
                  onClick={() => setCount((prev) => prev + 1)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Client = () => {
  const { cart } = useGetCart();
  // const [selected, setSelected] = React.useState<string[] | null>(null);

  console.log(cart);
  const allChecked = true;

  return (
    <div className='py-4'>
      <CheckAll selected={allChecked} onSelectChange={() => {}} />
      <div className='flex flex-col gap-4'>
        <CartCard />
      </div>
    </div>
  );
};

export default Client;
