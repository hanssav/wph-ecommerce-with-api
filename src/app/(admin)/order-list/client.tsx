'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { useDebounce, useGetAllOrderBySeller } from '@/hooks';
import { GetAllOrderSellerParams } from '@/types';
import { CalendarIcon, Search } from 'lucide-react';
import { OrderCard } from './components';
import Typography from '@/components/ui/typography';
import Notification from '@/components/container/notification';
import { NOTIFICATION } from '@/constants';
import Pagination from '@/components/container/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const selectValues = [
  { value: 'ALL', label: 'All Orders' },
  { value: 'NEW', label: 'New' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'SHIPPED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Canceled' },
];
const OrderClient = () => {
  const [calendarOpen, setCalendarOpen] = React.useState<boolean>(false);
  const [filter, setFilter] = React.useState<GetAllOrderSellerParams>({
    page: 1,
    limit: 10,
    q: '',
    status: 'ALL',
    date: undefined,
  });

  const debounceFilter = useDebounce(filter);
  const { orders, isLoading, pagination } =
    useGetAllOrderBySeller(debounceFilter);

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
        {/* Date */}
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'justify-start text-left font-normal h-12 rounded-md w-full lg:max-w-[254px]',
                !filter.date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon />
              {filter.date ? (
                format(filter.date, 'PPP')
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar
              mode='single'
              selected={filter.date}
              onSelect={(val) => {
                setFilter((prev) => ({ ...prev, date: val }));
                setCalendarOpen(false);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Select
          onValueChange={(value) =>
            setFilter((prev) => ({
              ...prev,
              page: 1,
              status:
                value === 'ALL'
                  ? undefined
                  : (value as GetAllOrderSellerParams['status']),
            }))
          }
          value={filter.status ?? 'ALL'}
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
      </div>
      <Tabs className='p-4 hidden lg:block'>
        <TabsList className='w-full justify-between'>
          {selectValues.map(({ value: tab, label }) => (
            <TabsTrigger
              key={tab}
              value={tab}
              onClick={() =>
                setFilter({
                  ...filter,
                  status: tab as GetAllOrderSellerParams['status'],
                })
              }
              data-state={filter.status === tab ? 'active' : 'inactive'}
              className='rounded-none border-b-1 border-b-neutral-300 data-[state=active]:border-b-3 data-[state=active]:border-b-neutral-950 !py-5'
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {orders?.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}

      {!orders?.length &&
        !isLoading &&
        !debounceFilter.q &&
        !debounceFilter.status && (
          <Notification {...NOTIFICATION.PRODUCT_EMPTY} />
        )}

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
    </div>
  );
};

export default OrderClient;
