import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Hr } from '@/components/ui/hr';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Typography from '@/components/ui/typography';
import { ICONS } from '@/constants';
import { formatMoney } from '@/lib/utils';
import { CheckoutFormData } from '@/lib/validation/checkout.validation';
import Image from 'next/image';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

type BankOption = {
  value: string;
  label: string;
  logoUrl: string;
};

export const bankOptions: BankOption[] = [
  {
    value: 'bca-va',
    label: 'BCA Virtual Account',
    logoUrl: ICONS.BANK_BCA,
  },
  {
    value: 'bni-va',
    label: 'BNI Virtual Account',
    logoUrl: ICONS.BANK_BNI,
  },
  {
    value: 'mandiri-va',
    label: 'Mandiri Virtual Account',
    logoUrl: ICONS.BANK_MANDIRI,
  },
  {
    value: 'bri-va',
    label: 'BRI Virtual Account',
    logoUrl: ICONS.BANK_BRI,
  },
];

const DetailsPayment: React.FC<{ label: string; price: number }> = ({
  label,
  price,
}) => (
  <div className='flex justify-between items-center'>
    <Typography weight={'normal'} size={{ base: 'sm', lg: 'md' }}>
      {label}
    </Typography>
    <Typography weight={'bold'} size={{ base: 'sm', md: 'md' }}>
      {formatMoney(price)}
    </Typography>
  </div>
);

const PaymentCard: React.FC<{
  form: UseFormReturn<CheckoutFormData>;
  isPending: boolean;
}> = ({ form, isPending }) => {
  return (
    <Card>
      <CardContent className='space-y-3'>
        <FormField
          control={form.control}
          name='paymentMethod'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <Typography size={{ base: 'sm', lg: 'lg' }} weight={'bold'}>
                Shipping Method
              </Typography>

              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  name={field.name}
                  className='flex flex-col space-y-2'
                >
                  {bankOptions.map((opt) => (
                    <React.Fragment key={opt.value}>
                      <Label className='flex items-center justify-between gap-3 rounded-md hover:bg-muted cursor-pointer'>
                        <div className='flex items-center gap-2'>
                          <div className='flex items-center justify-center w-8 aspect-square border border-neutral-300 rounded-md p-1 bg-white'>
                            <Image
                              src={opt.logoUrl}
                              alt={`${opt.label} logo`}
                              width={24}
                              height={24}
                              className='object-contain'
                            />
                          </div>
                          <Typography weight='normal' size={{ base: 'sm' }}>
                            {opt.label}
                          </Typography>
                        </div>
                        <RadioGroupItem value={opt.value} />
                      </Label>
                      <Hr my='my-0' />
                    </React.Fragment>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='space-y-3'>
          <Typography size={{ base: 'sm', lg: 'lg' }} weight={'bold'}>
            Payment Summary
          </Typography>
          <DetailsPayment label='Total Price of Goods' price={19999999} />
          <DetailsPayment label='Shipping Cost' price={19999999} />
          <DetailsPayment label='Total' price={19999999} />

          <Button className='w-full' size={'lg'}>
            {isPending ? 'Processing...' : 'Pay Now'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentCard;
