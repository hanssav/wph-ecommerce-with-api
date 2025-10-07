import React from 'react';
import { cn } from '@/lib/utils';

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div
    className={cn(
      'bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse',
      className
    )}
  />
);
