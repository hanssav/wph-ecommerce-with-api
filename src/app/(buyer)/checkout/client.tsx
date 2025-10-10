'use client';
import { Form } from '@/components/ui/form';
import {
  CheckoutFormData,
  CheckoutSchema,
} from '@/lib/validation/checkout.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import CheckoutForm from './components/checkout-form';
import ProductShippingCard from './components/product-shipping-card';
import PaymentCard from './components/payment-card';
import { useCreateOrders } from '@/hooks/useOrder';

const CheckoutClient = () => {
  const checkout = useCreateOrders();
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
  const onSubmit: SubmitHandler<CheckoutFormData> = (values) => {
    checkout.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col lg:flex-row gap-4'>
          <div className='space-y-4 lg:basis-2/3'>
            <CheckoutForm form={form} />
            <ProductShippingCard form={form} />
          </div>

          <div className='lg:basis-1/3'>
            <PaymentCard form={form} isPending={checkout.isPending} />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CheckoutClient;
