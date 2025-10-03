import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import React from 'react';

const CountButton = () => {
  const [count, setCount] = React.useState<number>(0);
  return (
    <div className='flex gap-4 items-center'>
      <Typography weight={'bold'} size={{ base: 'sm', lg: 'md' }}>
        Quantity
      </Typography>
      <div className='inline-flex items-center border border-gray-300 rounded-xl px-3 py-1 lg:gap-2'>
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
  );
};

export default CountButton;
