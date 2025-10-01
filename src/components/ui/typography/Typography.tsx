import { cva } from 'class-variance-authority';
import { type ElementType } from 'react';
import type { FontWeight, TextSize, TypographyProps } from './Typography.types';
import { cn } from '@/lib/utils';

export const typographyVariants = cva('', {
  variants: {
    size: {
      xs: 'text-xs leading-xs',
      sm: 'text-sm leading-sm',
      md: 'text-md leading-md',
      lg: 'text-lg leading-lg',
      xl: 'text-xl leading-xl',
      'display-xs': 'text-display-xs leading-display-xs',
      'display-sm': 'text-display-sm leading-display-sm',
      'display-md': 'text-display-md leading-display-md',
      'display-lg': 'text-display-lg leading-display-lg',
      'display-xl': 'text-display-xl leading-display-xl',
      'display-2xl': 'text-display-2xl leading-display-2xl',
      'display-3xl': 'text-display-3xl leading-display-3xl',
    },
    weight: {
      thin: 'font-thin',
      extralight: 'font-extralight',
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
  },
  defaultVariants: {
    size: 'md',
    weight: 'normal',
  },
});

/**
 * Convert responsive value to Tailwind classes with breakpoints
 * @example 'md' => 'text-md leading-md'
 * @example { base: 'md', lg: 'xl' } => 'text-md leading-md lg:text-xl lg:leading-xl'
 */
const getResponsiveClasses = <T extends TextSize | FontWeight>(
  value: T | Record<string, T>,
  variant: 'size' | 'weight'
): string => {
  if (typeof value === 'string') {
    return typographyVariants({ [variant]: value });
  }

  return Object.entries(value)
    .map(([breakpoint, val]) => {
      const classes = typographyVariants({ [variant]: val });

      if (breakpoint === 'base') {
        return classes;
      }

      // Add breakpoint prefix to each class
      return classes
        .split(' ')
        .map((cls) => `${breakpoint}:${cls}`)
        .join(' ');
    })
    .join(' ');
};

const Typography = <T extends ElementType = 'p'>({
  size = 'md',
  className,
  as,
  children,
  weight = 'normal',
  ...props
}: TypographyProps<T>) => {
  const Component = as || 'p';

  const sizeClasses = getResponsiveClasses(size, 'size');
  const weightClasses = getResponsiveClasses(weight, 'weight');

  return (
    <Component className={cn(sizeClasses, weightClasses, className)} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
