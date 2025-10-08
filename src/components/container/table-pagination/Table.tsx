'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

export type Column<T> = {
  key: string;
  header: string;
  width?: string;
  className?: string;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
};

export type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  containerClassName?: string;
  rowClassName?: string | ((row: T, index: number) => string);
  onRowClick?: (row: T, index: number) => void;
};

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
  emptyMessage = 'No data available',
  className,
  containerClassName,
  rowClassName,
  onRowClick,
}: DataTableProps<T>) {
  const getRowClassName = (row: T, index: number) => {
    if (typeof rowClassName === 'function') {
      return rowClassName(row, index);
    }
    return rowClassName;
  };

  return (
    <div className={cn(containerClassName)}>
      <div className='rounded-md border bg-white p-4'>
        <Table className={className}>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  style={{ width: column.width }}
                  className={cn(
                    'text-sm leading-sm font-bold',
                    column.className
                  )}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  <div className='flex items-center justify-center'>
                    <div className='h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900' />
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center text-muted-foreground'
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className={cn(
                    onRowClick && 'cursor-pointer',
                    getRowClassName(row, rowIndex)
                  )}
                  onClick={() => onRowClick?.(row, rowIndex)}
                >
                  {columns.map((column) => {
                    const value = row[column.key];
                    let content: React.ReactNode;

                    if (column.render) {
                      content = column.render(value, row, rowIndex);
                    } else if (value === null || value === undefined) {
                      content = '-';
                    } else if (typeof value === 'object' && value !== null) {
                      const objValue = value as Record<string, unknown>;
                      content = (objValue.name ||
                        objValue.title ||
                        JSON.stringify(value)) as React.ReactNode;
                    } else {
                      content = String(value);
                    }

                    return (
                      <TableCell
                        key={`${rowIndex}-${column.key}`}
                        className={column.className}
                      >
                        {content}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
