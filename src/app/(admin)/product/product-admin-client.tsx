'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

import React from 'react';
import ProductAdminCard from './components/product-admin-card';

const ProductAdminClient = () => {
  return (
    <>
      <div className='lg:flex lg:justify-between w-full items-center space-y-3'>
        <Button className='rounded-md w-full lg:max-w-[180px]'>
          + Add Product
        </Button>
        <div className='flex items-center'>
          <Input
            label='search'
            id='search-order'
            className='!w-full lg:max-w-[254px]'
            iconPosition='left'
            icon={<Search className='h-5 w-5 text-neutral-950' />}
          />
        </div>
      </div>

      <ProductAdminCard />
    </>
  );
};

export default ProductAdminClient;
