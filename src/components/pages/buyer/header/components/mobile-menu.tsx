import { CircleArrowOutDownLeft, FileText, Star } from 'lucide-react';
import React from 'react';
import { ButtonUserActive } from './button-user-active';
import { cn } from '@/lib/utils';

export const MobileMenu: React.FC<{
  open: boolean;
}> = ({ open }) => {
  const listMenuMobile = [
    { label: 'Order List', icon: FileText },

    { label: 'Review', icon: Star },
    {
      label: 'Logout',
      icon: CircleArrowOutDownLeft,
      className: 'text-red-500',
      rotateClass: 'rotate-45',
    },
  ];

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
        <ButtonUserActive isMobileOpen={open} />
        <div className='flex flex-col gap-2'>
          {listMenuMobile.map((item, idx) => (
            <button
              key={idx}
              className={cn(
                'flex items-center gap-2 w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 transition-colors duration-200',
                item.className
              )}
            >
              <item.icon
                className={cn(
                  'w-5 h-5 text-gray-700',
                  item.className,
                  item.rotateClass
                )}
              />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};
