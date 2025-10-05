import SectionWrapper from '@/components/container/section-wrapper';
import TypographyTitle from '@/components/ui/typography/Title';
import React from 'react';
import CheckoutClient from './components/client';

// i want to use ssr for handle get list data checkout in here
const Checkout: React.FC = () => {
  return (
    <SectionWrapper className='py-6 lg:py-14 flex flex-col gap-4 lg:gap-6'>
      <TypographyTitle label='Checkout' />

      <CheckoutClient />
    </SectionWrapper>
  );
};

export default Checkout;
