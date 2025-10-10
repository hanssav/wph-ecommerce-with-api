import z from 'zod';

export const CheckoutSchema = z.object({
  address: z.object({
    name: z.string().min(1, 'name is required'),
    phone: z.string().min(1, 'phone is required'),
    city: z.string().min(1, 'city is required'),
    postalCode: z.string().min(1, 'postal code is required'),
    address: z.string().min(1, 'detail address is required'),
    paymentMethod: z
      .enum(['bni-va', 'bca-va', 'bri-va', 'mandiri-va', 'permata-va'])
      .or(z.literal(''))
      .refine((val) => val !== '', { message: 'Payment method is required' }),
  }),
  shippingMethod: z
    .enum(['jne', 'jnt', 'ninja'])
    .or(z.literal(''))
    .refine((val) => val !== '', { message: 'Shipping method is required' }),
});

export type CheckoutFormData = z.infer<typeof CheckoutSchema>;

export type CheckoutFieldName = keyof CheckoutFormData;

export const autoCompleteMap = {
  name: 'name',
  phone: 'tel',
  city: 'address-level2',
  postalCode: 'postal-code',
  address: 'street-address',
  shippingMethod: 'off',
  paymentMethod: 'off',
};
