import { Card, CardContent } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Hr } from '@/components/ui/hr';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Typography from '@/components/ui/typography';
import { IMAGES } from '@/constants';
import { CheckoutFormData } from '@/lib/validation/checkout.validation';
import { Store } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

const ProductShippingCard: React.FC<{
  form: UseFormReturn<CheckoutFormData>;
}> = ({ form }) => {
  return (
    <Card>
      <CardContent className='flex flex-col gap-3'>
        <div className='flex gap-1.5 items-center'>
          <Store className='h-4 w-4' />
          <Typography weight={'semibold'} size={{ base: 'sm', lg: 'md' }}>
            Toko Abdi Fashion
          </Typography>
        </div>
        <div className='flex gap-3'>
          <div className='relative overflow-hidden w-20 aspect-square'>
            <Image
              src={IMAGES.MOCK_PRODUCT_IMAGE}
              alt='product-checkout'
              fill
              priority
              className='object-cover'
            />
          </div>

          <div className='flex flex-col'>
            <Typography size={{ base: 'sm', lg: 'lg' }} weight={'bold'}>
              I phone 17
            </Typography>
            <Typography
              size={{ base: 'sm', lg: 'md' }}
              weight={'normal'}
              className='text-neutral-600'
            >
              Gadged
            </Typography>
            <Typography size={{ base: 'sm', lg: 'lg' }} weight={'bold'}>
              1 x 19.999.999
            </Typography>
          </div>
        </div>
        <Hr />

        <FormField
          control={form.control}
          name='shippingMethod'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <Label htmlFor='shippingMethod'>
                <Typography size={{ base: 'sm', lg: 'lg' }} weight={'bold'}>
                  Shipping Method
                </Typography>
              </Label>

              <FormControl>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id='shippingMethod' className='w-full'>
                    <SelectValue placeholder='Shipping Method' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='jne'>JNE</SelectItem>
                    <SelectItem value='ninja'>Ninja</SelectItem>
                    <SelectItem value='jnt'>JNT</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default ProductShippingCard;
