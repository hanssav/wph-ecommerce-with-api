import React from 'react';
import {
  Pagination as PaginationPrimitive,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { GetOrdersMyParam, Pagination as PaginationTypes } from '@/types';

type PaginationProps = {
  pagination: PaginationTypes;
  current: number;
  setFilter: React.Dispatch<React.SetStateAction<GetOrdersMyParam>>;
};
const Pagination: React.FC<PaginationProps> = ({
  pagination,
  current,
  setFilter,
}) => {
  const handleChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (pagination?.totalPages ?? 1)) {
      setFilter((prev) => ({ ...prev, page: newPage }));
    }
  };

  return (
    <PaginationPrimitive>
      <PaginationContent className='lg:items-end'>
        <PaginationItem>
          <PaginationPrevious
            href='#'
            onClick={() => {
              handleChange(current - 1);
            }}
            className={cn(
              current === 1 &&
                'pointer-events-none opacity-50 cursor-not-allowed'
            )}
          />
        </PaginationItem>

        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
          (page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href='#'
                isActive={current === page}
                onClick={() => {
                  handleChange(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {pagination.totalPages > 5 && current < pagination.totalPages - 2 && (
          <PaginationEllipsis />
        )}

        <PaginationItem>
          <PaginationNext
            href='#'
            onClick={() => {
              handleChange(current + 1);
            }}
            className={cn(
              current === pagination.totalPages &&
                'pointer-events-none opacity-50 cursor-not-allowed'
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationPrimitive>
  );
};

export default Pagination;
