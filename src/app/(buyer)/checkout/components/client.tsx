'use client';
import { Form } from '@/components/ui/form';
import {
  CheckoutFormData,
  CheckoutSchema,
} from '@/lib/validation/checkout.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import CheckoutForm from './checkout-form';
import ProductShippingCard from './product-shipping-card';
import PaymentCard from './payment-card';

const CheckoutClient = () => {
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      name: '',
      phone: '',
      city: '',
      postalCode: '',
      address: '',
      shippingMethod: '',
      paymentMethod: '',
    },
  });
  const onSubmit: SubmitHandler<CheckoutFormData> = () => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex gap-4'>
          <div className='space-y-4 basis-2/3'>
            <CheckoutForm form={form} />
            <ProductShippingCard form={form} />
          </div>

          <div className='basis-1/3'>
            <PaymentCard form={form} />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CheckoutClient;
