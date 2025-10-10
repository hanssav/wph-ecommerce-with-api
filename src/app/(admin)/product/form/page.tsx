import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React, { Suspense } from 'react';
import ProductFormClient from './components/product-form-client';
import { categoryServices } from '@/services/category.service';

const ProductForm = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['category'],
    queryFn: () => categoryServices.get({ page: 1, limit: 20 }),
    staleTime: 60000,
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense fallback={<div>Loading form...</div>}>
        <ProductFormClient />
      </Suspense>
    </HydrationBoundary>
  );
};

export default ProductForm;
