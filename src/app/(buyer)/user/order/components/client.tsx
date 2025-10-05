'use client';

import Pagination from '@/components/container/pagination';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Typography from '@/components/ui/typography';
import { useGetOrderMy } from '@/hooks';
import { GetOrdersMyParam } from '@/services';
import { Search } from 'lucide-react';
import React from 'react';
import OrderCard from './order-card';

const selectValues = [
  { value: 'ALL', label: 'All Orders' },
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELED', label: 'Canceled' },
];

const OrderClient = () => {
  const [filter, setFilter] = React.useState<GetOrdersMyParam>({
    page: 1,
    limit: 10,
    paymentStatus: 'ALL',
  });

  const {
    orders: data,
    query: { isLoading, isError },
  } = useGetOrderMy(filter);

  const orders = data?.orders ?? [];
  const pagination = data?.pagination;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (pagination?.totalPages ?? 1)) {
      setFilter((prev) => ({ ...prev, page: newPage }));
    }
  };

  const currentPage = filter.page ?? 1;

  return (
    <div className='space-y-6'>
      <Input
        label='search'
        id='search-order'
        className='!w-full'
        iconPosition='left'
        icon={<Search className='h-5 w-5 text-neutral-950' />}
      />

      <Select
        onValueChange={(value) =>
          setFilter((prev) => ({
            ...prev,
            page: 1,
            paymentStatus:
              value === 'ALL'
                ? undefined
                : (value as GetOrdersMyParam['paymentStatus']),
          }))
        }
        value={filter.paymentStatus ?? 'ALL'}
      >
        <SelectTrigger id='orderStatus' className='w-full !h-12'>
          <SelectValue placeholder='All Orders' />
        </SelectTrigger>
        <SelectContent>
          {selectValues.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {isLoading && <Card className='text-center'>Loading orders...</Card>}
      {isError && <Card className='text-red-500'>Failed to load orders.</Card>}
      {!isLoading && !orders.length && <Card>No orders found.</Card>}

      <div className='space-y-4'>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      {pagination && (
        <div className='flex flex-col lg:flex-row items-center justify-center gap-3 px-3 py-5 shadow-card bg-white rounded-xl lg:justify-between lg:px-5 lg:py-3'>
          <Typography
            weight={'normal'}
            size={{ base: 'sm' }}
            className='text-neutral-800'
          >
            Showing 1 to 10 of 60 entries
          </Typography>

          <Pagination
            current={currentPage}
            handleChange={handlePageChange}
            pagination={pagination}
          />
        </div>
      )}
    </div>
  );
};

export default OrderClient;
