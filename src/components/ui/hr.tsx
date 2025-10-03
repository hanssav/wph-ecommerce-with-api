import { cn } from '@/lib/utils';
import React from 'react';

type HrProps = {
  width?: string; //  example: "w-1/2"
  my?: string; // , example: "my-6"
  className?: string;
};

const Hr: React.FC<HrProps> = ({
  width = 'w-full',
  my = 'my-3',
  className = '',
}) => {
  return (
    <hr className={cn(width, 'border-t border-neutral-300', my, className)} />
  );
};

export { Hr };
