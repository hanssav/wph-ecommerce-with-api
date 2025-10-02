import { type ElementType } from 'react';
import {
  sizeVariants,
  weightVariants,
  type FontWeight,
  type TextSize,
  type TypographyProps,
} from './Typography.types';
import { cn } from '@/lib/utils';
/**
 * Convert responsive value to Tailwind classes with breakpoints
 * @example 'md' => 'text-md leading-md'
 * @example { base: 'md', lg: 'xl' } => 'text-md leading-md lg:text-xl lg:leading-xl'
 * @example { base: 16, lg: 40 } => 'text-[16px] leading-[24px] lg:text-[40px] lg:leading-[60px]'
 * @example { base: 10, lg: 'display-xs' } => 'text-[10px] leading-[15px] lg:text-display-xs lg:leading-display-xs'
 */

const getResponsiveClasses = <T extends TextSize | FontWeight | number>(
  value: T | Record<string, T>,
  variant: 'size' | 'weight'
): string => {
  if (typeof value === 'string') {
    if (variant === 'size') {
      const { text, leading } = sizeVariants[value as TextSize];
      return `${text} ${leading}`;
    }
    return weightVariants[value as FontWeight];
  }

  if (typeof value === 'number' && variant === 'size') {
    return `text-[${value}px] leading-[${Math.round(value * 1.5)}px]`;
  }

  return Object.entries(value)
    .sort(([a], [b]) => (a === 'base' ? -1 : b === 'base' ? 1 : 0))
    .map(([breakpoint, val]) => {
      let classes: string[];

      if (typeof val === 'number' && variant === 'size') {
        classes = [`text-[${val}px]`, `leading-[${Math.round(val * 1.5)}px]`];
      } else if (variant === 'size') {
        const { text, leading } = sizeVariants[val as TextSize];
        classes = [text, leading];
      } else {
        classes = [weightVariants[val as FontWeight]];
      }

      if (breakpoint === 'base') {
        return classes.join(' ');
      }

      return classes.map((cls) => `${breakpoint}:${cls}`).join(' ');
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
    <Component
      className={cn('text-neutral-950', sizeClasses, weightClasses, className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;
