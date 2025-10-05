import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import React from 'react';
import { useHeader } from '../useHeader';

export const MobileHeader: React.FC = () => {
  const { open, setOpen } = useHeader();
  return (
    <div className='flex justify-between w-full'>
      <span className='text-lg font-bold'>Menu</span>
      <Button
        variant='ghost'
        size='lg'
        className='lg:hidden w-auto h-auto !p-0'
        onClick={() => setOpen(!open)}
        aria-label='Toggle menu'
      >
        <X className='!h-5 !w-5' />
      </Button>
    </div>
  );
};
