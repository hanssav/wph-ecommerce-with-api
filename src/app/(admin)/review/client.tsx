'use client';
import Pagination from '@/components/container/pagination';
import {
  Column,
  DataTable,
} from '@/components/container/table-pagination/Table';
import { Input } from '@/components/ui/input';
import Typography from '@/components/ui/typography';
import { useDebounce, useReview } from '@/hooks';
import { Review, ReviewParams } from '@/types';
import { Search, Star } from 'lucide-react';
import React from 'react';
import { ReviewCard } from './components';

const PreviewClient = () => {
  const [filter, setFilter] = React.useState<ReviewParams>({
    page: 1,
    limit: 10,
  });

  const debounceFilter = useDebounce(filter, 400);

  const { reviews = [], pagination, isLoading } = useReview(debounceFilter);

  const columns: Column<Review>[] = [
    {
      key: 'no',
      header: 'No',
      width: '40px',
      render: (_, __, idx) => (filter.page - 1) * filter.limit + idx + 1,
    },
    {
      key: 'productName',
      header: 'Product Name',
    },
    {
      key: 'rating',
      header: 'Rating',
    },
    {
      key: 'totalReview',
      header: 'Total Review',
    },
    {
      key: 'action',
      header: 'Action',
    },
  ];

  return (
    <>
      <div className='lg:flex lg:justify-between w-full items-center space-y-3'>
        <Typography
          className='hidden lg:flex gap-1 items-center'
          size={'lg'}
          weight={'normal'}
        >
          <span className='relative w-5 h-5'>
            <Star className='absolute w-5 h-5 stroke-gray-300' />
            <Star className='absolute w-5 h-5 stroke-yellow-400 fill-yellow-400' />
          </span>
          <span className='font-bold text-display-xs'>4.9</span>
          <span>/</span>
          <span>5.0</span>
        </Typography>
        <div className='flex items-center !w-full lg:max-w-[254px]'>
          <Input
            label='search'
            id='search-order'
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
      </div>
      <div className='lg:hidden'>
        {reviews?.map((review, idx) => (
          <ReviewCard key={idx} review={review} />
        ))}
        <ReviewCard />
      </div>
      <div className='hidden lg:block'>
        <DataTable
          columns={columns}
          data={reviews}
          loading={isLoading}
          emptyMessage='No Reviews found'
        />
      </div>
      {pagination && pagination.total > 0 && (
        <div className='flex flex-col lg:flex-row items-center justify-center gap-3 px-3 py-5 bg-white rounded-md border lg:justify-between lg:px-5'>
          <Typography
            weight={'normal'}
            size={{ base: 'sm' }}
            className='text-neutral-800'
          >
            {`Showing ${reviews.length} to ${
              pagination.total > filter.limit
                ? filter.limit ?? 0
                : pagination.total
            } of ${pagination.total} entries`}
          </Typography>

          <Pagination
            current={filter.page}
            pagination={pagination}
            setFilter={setFilter}
            dataLength={reviews.length}
          />
        </div>
      )}
    </>
  );
};

export default PreviewClient;
