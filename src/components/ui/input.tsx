import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Label } from './label';

type InputProps = {
  iconPosition?: 'left' | 'right';
  leftIconPadding?: string;
  icon?: React.ReactNode;
  onIconClick?: () => void;
  label?: string;
} & React.ComponentProps<'input'>;

function Input({
  className,
  type,
  onIconClick,
  icon,
  iconPosition,
  leftIconPadding = '10',
  label,
  ...props
}: InputProps) {
  return (
    <div className='relative w-full'>
      <input
        type={type}
        data-slot='input'
        placeholder=' '
        className={cn(
          'peer file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-12 w-full min-w-0 rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          label && 'pt-6 pb-2',
          icon && iconPosition === 'left'
            ? `pl-${leftIconPadding}`
            : icon && iconPosition === 'right'
            ? 'pr-12 px-3'
            : 'px-3',
          !icon && 'px-3',
          className
        )}
        {...props}
      />

      {label && (
        <Label
          htmlFor={props.id}
          className={cn(
            'absolute left-3 text-muted-foreground pointer-events-none transition-all duration-200 ease-out',
            // Default state (kosong)
            'top-1/2 -translate-y-1/2 text-base',
            // State ketika ada value atau focus (floating)
            'peer-focus:top-1 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary',
            // State ketika ada value (not placeholder)
            'peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs',
            // Disabled state
            'peer-disabled:opacity-50',
            // Invalid state
            'peer-aria-invalid:text-destructive',
            // Adjustment untuk icon di kiri
            icon && iconPosition === 'left' && `left-${leftIconPadding}`
          )}
        >
          {label}
        </Label>
      )}

      {icon && (
        <Button
          type='button'
          variant='ghost'
          size='icon'
          onClick={onIconClick}
          tabIndex={-1}
          className={cn(
            'absolute inset-y-0 h-full',
            iconPosition === 'left' ? 'left-0 pl-2' : 'right-0 pr-2'
          )}
        >
          {icon}
        </Button>
      )}
    </div>
  );
}

export { Input };
