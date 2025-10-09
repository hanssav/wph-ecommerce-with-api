'use client';
import { useMe } from '@/hooks';
import React from 'react';
import { cn } from '@/lib/utils';
import { Navbar, Sidebar } from './components';
import { useToast } from '@/context/toast';
import { PATH } from '@/constants';
import { useRouter } from 'next/navigation';

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showToast } = useToast();
  const router = useRouter();
  const { user, token } = useMe();
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!token) {
      showToast('You need to be logged in to access this page', 'success');
      router.push(PATH.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <>
      <Navbar setOpen={setOpen} open={open} user={user} />

      <div>
        <Sidebar open={open} setOpen={setOpen} />
        <div
          className={cn(
            'lg:py-8 lg:px-10 p-4',
            !open ? 'lg:ml-20' : 'lg:ml-[216px]'
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
}
