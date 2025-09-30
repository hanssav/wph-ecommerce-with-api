import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';

type InputIconProps = {
  position?: 'left' | 'right';
  icon?: React.ReactNode;
  onIconClick?: () => void;
} & React.ComponentProps<typeof Input>;

const InputIcon: React.FC<InputIconProps> = ({
  icon,
  position = 'left',
  onIconClick,
  className,
  ...rest
}) => {
  return (
    <div className='relative w-full'>
      <Input
        {...rest}
        className={`${position === 'left' ? 'pl-10' : 'pr-10'} ${
          className ?? ''
        }`}
      />

      {icon && (
        <Button
          type='button'
          variant='ghost'
          size='icon'
          onClick={onIconClick}
          className={`absolute inset-y-0 ${
            position === 'left' ? 'left-0 pl-2' : 'right-0 pr-2'
          }`}
        >
          {icon}
        </Button>
      )}
    </div>
  );
};

export default InputIcon;
