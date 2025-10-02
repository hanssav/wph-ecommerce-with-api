import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from './label';

type TextareaProps = {
  label?: string;
} & React.ComponentProps<'textarea'>;

function Textarea({ className, label, ...props }: TextareaProps) {
  return (
    <div className='relative w-full'>
      <textarea
        data-slot='textarea'
        placeholder=' '
        className={cn(
          'peer border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-32 w-full rounded-md border bg-transparent px-3 py-6 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
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
            'top-3 text-base',
            // State ketika ada value atau focus (floating)
            'peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary',
            // State ketika ada value (not placeholder)
            'peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs',
            // Disabled state
            'peer-disabled:opacity-50',
            // Invalid state
            'peer-aria-invalid:text-destructive'
            // Adjustment untuk icon di kiri
          )}
        >
          {label}
        </Label>
      )}
    </div>
  );
}

export { Textarea };
