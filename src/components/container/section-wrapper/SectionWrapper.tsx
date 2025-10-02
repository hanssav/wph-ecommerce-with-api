import { cn } from '@/lib/utils';
import React from 'react';

type SectionWrapperProps<T extends React.ElementType = 'section'> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

const SectionWrapper = <T extends React.ElementType = 'section'>({
  as,
  className,
  children,
  ...rest
}: SectionWrapperProps<T>) => {
  const Component = as || 'section';
  return (
    <Component
      className={cn('px-4 py-4 lg:px-[120px] lg:h-[82px] w-full', className)}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default SectionWrapper;
