'use client';
import { useMe } from '@/hooks';
import React from 'react';
import { cn } from '@/lib/utils';
import { Navbar, Sidebar } from './components';

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useMe();
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <>
      <Navbar setOpen={setOpen} open={open} user={user} />

      <div>
        <Sidebar open={open} setOpen={setOpen} user={user} />
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
