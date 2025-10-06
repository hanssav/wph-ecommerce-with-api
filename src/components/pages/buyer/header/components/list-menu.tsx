'use client';
import React from 'react';
import { PATH } from '@/constants';
import { useUser } from '@/context/auth';
import { cn } from '@/lib/utils';
import { CircleArrowOutDownLeft, FileText, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const listMenuMobile = [
  { label: 'Order List', icon: FileText, src: PATH.USER.ORDER },

  { label: 'Review', icon: Star, src: PATH.USER.REVIEW },
  {
    label: 'Logout',
    icon: CircleArrowOutDownLeft,
    className: 'text-red-500',
    rotateClass: 'rotate-45',
    fnKey: 'logout',
  },
];

const ListMenu = () => {
  const router = useRouter();
  const { clearAuth } = useUser();

  return (
    <div className='flex flex-col gap-2'>
      {listMenuMobile.map((item, idx) => (
        <button
          key={idx}
          className={cn(
            'flex items-center gap-2 w-full rounded-lg py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 transition-colors duration-200',
            item.className
          )}
          onClick={() => {
            if (item.fnKey === 'logout') {
              return clearAuth();
            } else if (item.src) {
              router.push(item.src);
            }
          }}
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
