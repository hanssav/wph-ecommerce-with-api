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
import { Pagination as PaginationTypes } from '@/types';

type PaginationProps = {
  pagination: PaginationTypes;
  handleChange: (page: number) => void;
  current: number;
};
const Pagination: React.FC<PaginationProps> = ({
  pagination,
  handleChange,
  current,
}) => {
  return (
    <PaginationPrimitive>
      <PaginationContent className='lg:items-end'>
        <PaginationItem>
          <PaginationPrevious
            href='#'
            onClick={(e) => {
              e.preventDefault();
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
                onClick={(e) => {
                  e.preventDefault();
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
            onClick={(e) => {
              e.preventDefault();
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
