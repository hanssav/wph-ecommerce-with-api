import React from 'react';
import { ButtonUserActive } from './button-user-active';
import { cn } from '@/lib/utils';
import { useHeader } from '../useHeader';
import ListMenu from './list-menu';

export const MobileMenu: React.FC = () => {
  const { open } = useHeader();

  return (
    <div
      className={cn(
        'absolute lg:hidden top-[60px] left-0 w-full h-screen bg-white border-none z-40 transition-transform duration-300 ease-in-out',
        open
          ? 'translate-x-0 opacity-100 pointer-events-auto'
          : '-translate-x-full opacity-0 pointer-events-none'
      )}
    >
      <nav
        className={cn(
          'bg-background/95 px-4 py-4 grid grid-cols-2 gap-2 space-y-4 '
        )}
      >
        <ButtonUserActive />
        <ListMenu />
      </nav>
    </div>
  );
};
