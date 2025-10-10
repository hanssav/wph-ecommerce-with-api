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
import { Search } from 'lucide-react';
import React from 'react';
import OrderCard from './components/order-card';
import { GetOrdersMyParam } from '@/types';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    orders,
    pagination,
    currentPage,
    query: { isLoading, isError },
  } = useGetOrderMy(filter);

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
        <SelectTrigger id='orderStatus' className='w-full !h-12 lg:hidden'>
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

      <Tabs className='p-4 hidden lg:block'>
        <TabsList className='w-full justify-between'>
          {selectValues.map(({ value: tab, label }) => (
            <TabsTrigger
              key={tab}
              value={tab}
              onClick={() =>
                setFilter({
                  ...filter,
                  paymentStatus: tab as GetOrdersMyParam['paymentStatus'],
                })
              }
              data-state={filter.paymentStatus === tab ? 'active' : 'inactive'}
              className='rounded-none border-b-1 border-b-neutral-300 data-[state=active]:border-b-3 data-[state=active]:border-b-neutral-950 !py-5'
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

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
            {`Showing ${orders.length} to ${
              pagination.total > filter.limit ? filter.limit : pagination.total
            } of ${pagination.total} entries`}
          </Typography>

          <Pagination
            current={currentPage}
            pagination={pagination}
            setFilter={setFilter}
          />
        </div>
      )}
    </div>
  );
};

export default OrderClient;
