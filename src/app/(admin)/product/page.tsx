import React from 'react';
import TypographyTitle from '@/components/ui/typography/Title';
import ProductAdminClient from './product-admin-client';

const Product = () => {
  return (
    <div className='flex flex-col gap-3 w-full'>
      <TypographyTitle label='Products' />
      <ProductAdminClient />
    </div>
  );
};

export default Product;
