import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { SellerData } from '@/types';
import React from 'react';

const AddressContent: React.FC<{ address?: SellerData['address'] }> = ({
  address,
}) => {
  return (
    <div className='flex flex-col w-full lg:flex-row lg:justify-between lg:items-center lg:p-5 lg:gap-4 border rounded-md border-neutral-300 p-3 gap-[17px]'>
      <div>
        <Typography size={{ base: 'sm' }} weight='semibold'>
          Store Address
        </Typography>
        <Typography
          size={{ base: 'sm' }}
          weight='normal'
          className=' text-neutral-600'
        >
          {address}
        </Typography>
      </div>
      <Button variant={'outline'} className='rounded-md'>
        Change Address
      </Button>
    </div>
  );
};

export default AddressContent;
