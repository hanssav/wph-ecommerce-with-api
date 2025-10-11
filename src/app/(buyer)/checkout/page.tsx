'use client';

import React from 'react';
import TypographyTitle from '@/components/ui/typography/Title';
import SectionWrapper from '@/components/container/section-wrapper';
import CheckoutClient from './client';

const Checkout: React.FC = () => {
  return (
    <SectionWrapper className='py-6 lg:py-14 flex flex-col gap-4 lg:gap-6'>
      <TypographyTitle label='Checkout' />
      <CheckoutClient />
    </SectionWrapper>
  );
};

export default Checkout;
