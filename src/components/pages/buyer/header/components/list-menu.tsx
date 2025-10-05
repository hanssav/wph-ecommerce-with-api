import { cn } from '@/lib/utils';
import { CircleArrowOutDownLeft, FileText, Star } from 'lucide-react';

export const listMenuMobile = [
  { label: 'Order List', icon: FileText },

  { label: 'Review', icon: Star },
  {
    label: 'Logout',
    icon: CircleArrowOutDownLeft,
    className: 'text-red-500',
    rotateClass: 'rotate-45',
  },
];

import React from 'react';

const ListMenu = () => {
  return (
    <div className='flex flex-col gap-2'>
      {listMenuMobile.map((item, idx) => (
        <button
          key={idx}
          className={cn(
            'flex items-center gap-2 w-full rounded-lg py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 transition-colors duration-200',
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
  );
};

export default ListMenu;
