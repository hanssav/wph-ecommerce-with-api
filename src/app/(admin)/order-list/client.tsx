'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { useDebounce, useGetAllOrderBySeller } from '@/hooks';
import { GetAllOrderSellerParams } from '@/types';
import { Calendar, Search } from 'lucide-react';
import { OrderCard } from './components';
import Typography from '@/components/ui/typography';
import Notification from '@/components/container/notification';
import { NOTIFICATION } from '@/constants';
import Pagination from '@/components/container/pagination';

const OrderClient = () => {
  const [filter, setFilter] = React.useState<GetAllOrderSellerParams>({
    page: 1,
    limit: 10,
    q: '',
  });
  const debounceFilter = useDebounce(filter);
  const { orders, isLoading, pagination } =
    useGetAllOrderBySeller(debounceFilter);

  console.log(orders, 'orders');

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-col lg:flex-row-reverse justify-between gap-3 items-center'>
        <div className='w-full lg:max-w-[254px]'>
          <Input
            label='search'
            id='search-order'
            className='!w-full  mr-auto'
            iconPosition='left'
            icon={<Search className='h-5 w-5 text-neutral-950' />}
            value={filter.q}
            onChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                q: e.target.value,
                page: 1,
              }))
            }
          />
        </div>
        <Input
          label='date'
          id='search-order'
          className='!w-full lg:max-w-[254px]'
          iconPosition='left'
          icon={<Calendar className='h-5 w-5 text-neutral-950' />}
        />
      </div>

      {orders?.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}

      {pagination && orders && (
        <div className='flex flex-col lg:flex-row items-center justify-center gap-3 px-3 py-5 bg-white rounded-md border lg:justify-between lg:px-5'>
          <Typography
            weight={'normal'}
            size={{ base: 'sm' }}
            className='text-neutral-800'
          >
            {`Showing ${orders?.length} to ${
              pagination.total > filter.limit
                ? filter.limit ?? 0
                : pagination.total
            } of ${pagination.total} entries`}
          </Typography>

          <Pagination
            current={filter.page}
            pagination={pagination}
            setFilter={setFilter}
            dataLength={orders.length}
          />
        </div>
      )}

      {!orders?.length && !isLoading && !debounceFilter.q && (
        <Notification {...NOTIFICATION.PRODUCT_EMPTY} />
      )}
    </div>
  );
};

export default OrderClient;
