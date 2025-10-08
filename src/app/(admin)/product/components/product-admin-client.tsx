'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import ProductAdminCard from './product-admin-card';
import { useInfiniteSellerProducts } from '@/hooks';
import Notification from '@/components/container/notification';
import { NOTIFICATION, PATH } from '@/constants';
import ShowOrSkeleton from '@/components/container/show-skeleton';
import { ProductAdminCardSkeleton } from './skeleton';
import { useRouter } from 'next/navigation';
import {
  Column,
  DataTable,
} from '@/components/container/table-pagination/Table';
import { ParamsSellerProduct, Product } from '@/types';
import { formatMoney } from '@/lib/utils';
import ProductInfo from './product-info';
import ButtonActions from './button-actions';
import Pagination from '@/components/container/pagination';
import Typography from '@/components/ui/typography';

const ProductAdminClient = () => {
  const router = useRouter();
  const [filter, setFilter] = React.useState<ParamsSellerProduct>({
    page: 1,
    limit: 10,
    q: '',
  });

  const {
    products,
    query: { isLoading },
    pagination,
  } = useInfiniteSellerProducts(filter);

  const columns: Column<Product>[] = [
    {
      key: 'no',
      header: 'No',
      width: '40px',
      render: (_, __, idx) => (filter.page - 1) * filter.limit + idx + 1,
    },
    {
      key: 'title',
      header: 'Product Info',
      width: '300px',
      render: (_, value) => {
        return (
          <ProductInfo
            images={value.images}
            title={value.title}
            categoryName={value.category.name}
            tableHeader={true}
          />
        );
      },
    },
    {
      key: 'price',
      header: 'Price',
      width: '120px',
      render: (value) => (
        <span className='font-semibold'>{formatMoney(value as number)}</span>
      ),
    },
    {
      key: 'stock',
      header: 'Stock',
      width: '100px',
      className: 'text-center',
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '150px',
      render: (_, values) => <ButtonActions id={values.id} />,
    },
  ];

  return (
    <>
      <div className='lg:flex lg:justify-between w-full items-center space-y-3'>
        <Button
          className='rounded-md w-full lg:max-w-[180px]'
          onClick={() => router.push(PATH.ADMIN.PRODUCT_FORM)}
        >
          + Add Product
        </Button>
        <div className='flex items-center'>
          <Input
            label='search'
            id='search-order'
            className='!w-full lg:max-w-[254px]'
            iconPosition='left'
            icon={<Search className='h-5 w-5 text-neutral-950' />}
          />
        </div>
      </div>

      <ShowOrSkeleton
        isLoading={isLoading}
        Skeleton={ProductAdminCardSkeleton}
        skeletonCount={4}
        data={products}
      >
        {(product, idx) => <ProductAdminCard key={idx} product={product} />}
      </ShowOrSkeleton>

      <div className='hidden lg:block'>
        <DataTable
          columns={columns}
          data={products}
          loading={isLoading}
          emptyMessage='No products found'
          rowClassName={(row) =>
            !row.isActive ? 'opacity-60 hover:opacity-100' : ''
          }
        />
      </div>

      {pagination && (
        <div className='flex flex-col lg:flex-row items-center justify-center gap-3 px-3 py-5 bg-white rounded-md border lg:justify-between lg:px-5'>
          <Typography
            weight={'normal'}
            size={{ base: 'sm' }}
            className='text-neutral-800'
          >
            {`Showing ${products.length} to ${
              pagination.total > filter.limit
                ? filter.limit ?? 0
                : pagination.total
            } of ${pagination.total} entries`}
          </Typography>

          <Pagination
            current={filter.page}
            pagination={pagination}
            setFilter={setFilter}
          />
        </div>
      )}

      {!products.length && !isLoading && (
        <Notification {...NOTIFICATION.PRODUCT_EMPTY} />
      )}
    </>
  );
};

export default ProductAdminClient;
