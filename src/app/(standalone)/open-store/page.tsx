'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Typography from '@/components/ui/typography';
import { IMAGES } from '@/constants';
import { CreateStoreFormData, CreateStoreSchema } from '@/lib/validation';
import { storeService } from '@/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const formSections = [
  {
    header: 'STORE PROFILE',
    fields: [
      { name: 'name', label: 'Store Name', type: 'input' },
      { name: 'domain', label: 'Store Domain', type: 'input' },
    ],
  },
  {
    header: 'STORE ADDRESS',
    fields: [
      { name: 'city', label: 'City', type: 'input' },
      { name: 'postalCode', label: 'Postal Code', type: 'input' },
      { name: 'detailAddress', label: 'Detail Address', type: 'textarea' },
    ],
  },
];

const WrapperForm: React.FC<{ children: React.ReactNode; title?: string }> = ({
  children,
  title,
}) => {
  return (
    <div className='space-y-3'>
      <Typography as='h4' weight={'bold'} size={{ base: 'sm', lg: 'md' }}>
        {title}
      </Typography>
      {children}
    </div>
  );
};
const OpenStore = () => {
  const router = useRouter();
  const form = useForm<CreateStoreFormData>({
    resolver: zodResolver(CreateStoreSchema),
    defaultValues: {
      name: '',
      domain: '',
      city: '',
      postalCode: '',
      detailAddress: '',
    },
  });
  const storeMutation = useMutation({
    mutationFn: async (values: CreateStoreFormData) => {
      const res = await storeService.activate(values);
      return res;
    },
    onSuccess: () => {
      router.push('/');
    },
  });
  const onSubmit: SubmitHandler<CreateStoreFormData> = (values) => {
    const datas = {
      ...values,
      slug: values.name.replace(/\s+/g, '-'),
      address: `${values.city}, ${values.detailAddress}, ${values.postalCode}`,
    };
    storeMutation.mutate(datas);
  };
  return (
    <Card className='w-full lg:max-w-[451px] mx-4 gap-1'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <CardHeader className='space-y-6'>
            <Image
              width={84}
              height={32}
              src={IMAGES.LOGO}
              alt='logo'
              priority
            />
            <div className='space-y-1'>
              <CardTitle>Open Your Store Today</CardTitle>
              <CardDescription>
                Start selling in minutes and reach thousands of customers
                instantly
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className='space-y-6'>
            {formSections.map((section, index) => (
              <div key={section.header}>
                <WrapperForm title={section.header}>
                  {section.fields.map((fieldConfig) => (
                    <FormField
                      key={fieldConfig.name}
                      control={form.control}
                      name={fieldConfig.name as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            {fieldConfig.type === 'input' ? (
                              <Input {...field} label={fieldConfig.label} />
                            ) : (
                              <Textarea {...field} label={fieldConfig.label} />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </WrapperForm>
                {index < formSections.length - 1 && (
                  <hr className='w-full border border-neutral-300 my-6' />
                )}
              </div>
            ))}
          </CardContent>
          <CardFooter className='flex-col gap-3'>
            <Button type='submit' className='w-full font-bold rounded-lg'>
              Submit
            </Button>
            <Button
              onClick={() => router.push('/')}
              variant={'ghost'}
              className='underline font-bold'
            >
              Cancel
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default OpenStore;
