import Footer from '@/components/pages/buyer/footer';
import Header from '@/components/pages/buyer/header';
import React from 'react';

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex-1 pt-20'>{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
