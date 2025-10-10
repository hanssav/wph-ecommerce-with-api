'use client';
import Footer from '@/components/pages/buyer/footer';
import Header from '@/components/pages/buyer/header';
import { PATH } from '@/constants';
import { useToast } from '@/context/toast';
import { useMe } from '@/hooks';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const { showToast } = useToast();
  const router = useRouter();
  const { user, token } = useMe();

  const isPrivate = PATH.PRIVATE_USER.includes(pathname);

  React.useEffect(() => {
    if (!token && isPrivate) {
      showToast('You need to be logged in to access this page', 'success');
      router.push(PATH.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, pathname]);
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex-1 pt-20'>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
