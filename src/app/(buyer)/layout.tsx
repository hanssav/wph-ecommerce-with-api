'use client';
import Footer from '@/components/pages/buyer/footer';
import Header from '@/components/pages/buyer/header';
import { PATH } from '@/constants';
import { useUser } from '@/context/auth';
import { useRouter } from 'next/navigation';
import React from 'react';

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.replace(PATH.HOME);
    }
  }, [user, router]);

  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex-1 pt-20'>{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
