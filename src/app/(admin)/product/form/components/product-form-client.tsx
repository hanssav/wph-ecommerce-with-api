'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Typography from '@/components/ui/typography';
import {
  useAddProduct,
  useCategories,
  useProductById,
  useUpdateProduct,
} from '@/hooks';
import {
  ProductFormInput,
  ProductSchema,
} from '@/lib/validation/product.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputImage from './input-image';
import { MOCK_IMAGE_PRODUCTS } from '@/constants';

const ProductFormClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { categories } = useCategories();
  const { addProduct, mutation: addMutation } = useAddProduct();
  const { update, mutation: updateMutation } = useUpdateProduct();
  const productQuery = useProductById(id);
  const pageName = id ? 'Edit' : 'Add';

  const form = useForm<ProductFormInput>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '',
      stock: '',
      categoryId: undefined,
      images: [],
      imagesUrl: [],
      isActive: true,
    },
  });

  React.useEffect(() => {
    if (!id || !productQuery?.product?.data || !categories) return;

    const data = productQuery.product.data;
    const categoryExists = categories.some((cat) => cat.id === data.categoryId);

    const product = {
      ...data,
      categoryId: categoryExists ? data.categoryId : undefined,
      stock: data.stock.toString(),
      price: data.price.toString(),
    };

    form.reset(product);
  }, [id, productQuery?.product?.data, form, categories]);

  const onSubmit: SubmitHandler<ProductFormInput> = (values) => {
    const data = {
      ...values,
      merge: true,
    };
    console.log(data, 'data');

    if (!id) return addProduct(values);
    return update({ id: Number(id), product: data });
  };

  return (
    <div className='flex justify-center'>
      <Card className='w-full max-w-[760px]'>
        <CardHeader className=' flex gap-2 items-center'>
          <ArrowLeft className='h-5 w-5' onClick={() => router.back()} />
          <Typography size={{ base: 'xl', lg: 'display-xs' }} weight={'bold'}>
            {pageName} Product
          </Typography>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className='space-y-3'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} label='Title' autoComplete='title' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='categoryId'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormControl>
                      <Select
                        key={field.value}
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        disabled={!categories || categories.length === 0}
                        value={field.value?.toString() || ''}
                        name={field.name}
                      >
                        <SelectTrigger id='categoryId' className='w-full !h-12'>
                          <SelectValue placeholder='Categories' />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.map(({ id, name }) => (
                            <SelectItem key={id} value={id.toString()}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} label='Price' autoComplete='price' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='stock'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} label='Stock' autoComplete='stock' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea {...field} label='Dscription' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='images'
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel
                      htmlFor={field.name}
                      className='text-sm font-medium'
                    >
                      Product Images (Max 5)
                    </FormLabel>
                    <FormControl>
                      <InputImage field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full rounded-lg'>
                {addMutation.isPending || updateMutation.isPending
                  ? 'Saving...'
                  : 'Save'}
              </Button>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default ProductFormClient;
