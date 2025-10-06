'use client';
import React from 'react';
import { PATH } from '@/constants';
import { useUser } from '@/context/auth';
import { cn } from '@/lib/utils';
import { CircleArrowOutDownLeft, FileText, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useHeader } from '../useHeader';
import { useDialog } from '@/context/dialog';
import { Button } from '@/components/ui/button';

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

const ListMenu: React.FC<{ isHeader?: boolean }> = ({ isHeader = false }) => {
  const router = useRouter();
  const { clearAuth } = useUser();
  const { openDialog, closeDialog } = useDialog();
  const header = isHeader
    ? useHeader()
    : ({ setOpen: () => {} } as Pick<ReturnType<typeof useHeader>, 'setOpen'>);

  const setOpen = header.setOpen;

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
              openDialog({
                title: 'Logout',
                desc: 'You will need to sign in again to access your account',
                footer: (
                  <div className='flex w-full gap-3 lg:justify-end lg:w-[137px] text-sm leading-sm font-semibold'>
                    <Button
                      variant={'outline'}
                      onClick={() => closeDialog()}
                      className='flex-1 rounded-lg'
                    >
                      Cancel
                    </Button>
                    <Button
                      variant={'danger'}
                      className='rounded-lg flex-1 lg:w-[137px] text-sm leading-sm font-semibold'
                      onClick={() => {
                        clearAuth();
                        closeDialog();
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                ),
              });
            }
            if (item.src) router.push(item.src);
            if (isHeader) setOpen(false);
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
