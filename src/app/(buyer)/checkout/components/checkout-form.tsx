import { Card, CardContent } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Typography from '@/components/ui/typography';
import {
  autoCompleteMap,
  AddressFieldName,
  CheckoutFormData,
} from '@/lib/validation/checkout.validation';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

type Field = {
  name: AddressFieldName;
  label: string;
  type: 'input' | 'textarea';
};

const fields: Field[] = [
  { name: 'name', label: 'Name', type: 'input' },
  { name: 'phone', label: 'Phone Number', type: 'input' },
  { name: 'city', label: 'City', type: 'input' },
  { name: 'postalCode', label: 'Postal Code', type: 'input' },
  { name: 'address', label: 'Address', type: 'textarea' },
];

export function getAutoCompleteAttr(name: AddressFieldName) {
  return autoCompleteMap[name];
}

const CheckoutForm: React.FC<{ form: UseFormReturn<CheckoutFormData> }> = ({
  form,
}) => {
  return (
    <Card>
      <CardContent className='space-y-3 lg:space-y-4'>
        <Typography weight={'bold'} size={{ base: 'md', lg: 'lg' }}>
          Shipping Address
        </Typography>
        {fields.map(({ name, label, type }, idx) => (
          <FormField
            key={idx}
            control={form.control}
            name={`address.${name}`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {type === 'textarea' ? (
                    <Textarea
                      {...field}
                      id={name}
                      label={label}
                      autoComplete={getAutoCompleteAttr(name)}
                    />
                  ) : (
                    <Input
                      {...field}
                      autoComplete={getAutoCompleteAttr(name)}
                      id={name}
                      label={label}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default CheckoutForm;
