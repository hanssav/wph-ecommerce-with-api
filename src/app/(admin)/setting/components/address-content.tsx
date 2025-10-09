import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Typography from '@/components/ui/typography';
import { useDialog } from '@/context/dialog';
import { useToast } from '@/context/toast';
import { useUpdateSeller } from '@/hooks';
import { combineAddress, parseAddress } from '@/lib/utils';
import { SellerSchema } from '@/lib/validation/seller-admin.validation';
import { SellerData } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

const UpdateAddressSchema = SellerSchema.pick({
  address: true,
  city: true,
  postalCode: true,
});

type UpdateAddressInput = z.infer<typeof UpdateAddressSchema>;

const ADDRESS_INPUT_DATA = [
  {
    name: 'city',
    label: 'CIty',
  },
  { name: 'postalCode', label: 'Postal Code' },
  { name: 'address', label: 'Address' },
] as const;

const ChangeAddressDialog: React.FC<
  Partial<UpdateAddressInput> & { onClose: () => void }
> = ({ address, onClose }) => {
  const { showToast } = useToast();

  const parsed = parseAddress(address);

  const form = useForm<UpdateAddressInput>({
    resolver: zodResolver(UpdateAddressSchema),
    defaultValues: {
      city: parsed?.city || '',
      postalCode: parsed?.postalCode || '',
      address: parsed?.address || '',
    },
  });

  const { updateSeller, isPending } = useUpdateSeller();

  const onSubmit: SubmitHandler<UpdateAddressInput> = (values) => {
    const addressInput = combineAddress({ ...values });

    updateSeller(
      { address: addressInput },
      {
        onSuccess: () => {
          onClose();
          showToast('Address updated successfully!', 'success');
        },
        onError: () => {
          showToast('Address failed to update!', 'error');
        },
      }
    );
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {ADDRESS_INPUT_DATA.map(({ name, label }, idx) => (
          <FormField
            key={idx}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    label={label}
                    autoComplete={name}
                    value={field.value ?? ''}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          type='submit'
          className='w-full rounded-md'
          disabled={isPending}
        >
          {isPending ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </Form>
  );
};

const AddressContent: React.FC<{ address?: SellerData['address'] }> = ({
  address,
}) => {
  const { openDialog, closeDialog } = useDialog();
  const parsed = parseAddress(address);

  const { city, address: stret, postalCode } = parsed ?? {};
  return (
    <div className='flex flex-col w-full lg:flex-row lg:justify-between lg:items-center lg:p-5 lg:gap-4 border rounded-md border-neutral-300 p-3 gap-[17px]'>
      <div>
        <Typography size={{ base: 'sm' }} weight='semibold'>
          {city}
        </Typography>
        <Typography
          size={{ base: 'sm' }}
          weight='normal'
          className=' text-neutral-600'
        >
          {postalCode}
        </Typography>
        <Typography
          size={{ base: 'sm' }}
          weight='normal'
          className=' text-neutral-600'
        >
          {stret}
        </Typography>
      </div>
      <Button
        variant={'outline'}
        className='rounded-md'
        onClick={() =>
          openDialog({
            title: 'Chnage Address',
            content: (
              <ChangeAddressDialog address={address} onClose={closeDialog} />
            ),
          })
        }
      >
        Change Address
      </Button>
    </div>
  );
};

export default AddressContent;
