'use client';
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import Typography from '@/components/ui/typography';
import { useGetCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CartCard } from './cart-card';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import TypographyTitle from '@/components/ui/typography/Title';

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
        size={{ base: 'sm', lg: 'md' }}
        className='text-neutral-950'
      >
        Select All
      </Typography>
    </div>
  );
};

const Client = () => {
  const { cart } = useGetCart();
  // const [selected, setSelected] = React.useState<string[] | null>(null);

  console.log(cart);
  const allChecked = true;

  const checkAllRest = {
    selected: allChecked,
    onSelectChange: () => {},
  };

  return (
    <div className='flex flex-col lg:flex-row gap-4 lg:gap-10'>
      <CheckAll {...checkAllRest} className='lg:hidden' />

      <div className='flex flex-col gap-4 lg:basis-10/15'>
        <TypographyTitle label='Cart' className='hidden lg:block' />

        <CheckAll {...checkAllRest} className='hidden lg:block' />
        <CartCard />
      </div>

      <Card className='lg:basis-5/15 lg:self-start'>
        <CardHeader>
          <Typography weight={'bold'} size={{ base: 'lg', lg: 'xl' }}>
            Total Shopping
          </Typography>
        </CardHeader>
        <CardContent>
          <Typography
            className='flex justify-between'
            weight={'bold'}
            size={{ base: 'lg', lg: 'xl' }}
          >
            <span className='font-normal'>Total</span>
            <span className='font-bold'>Rp.1780.000</span>
          </Typography>
          <Button onClick={() => {}} className='w-full my-4 rounded-md'>
            Checkout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Client;
