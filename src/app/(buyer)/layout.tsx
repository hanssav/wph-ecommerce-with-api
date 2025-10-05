import Footer from '@/components/pages/buyer/footer';
import Header from '@/components/pages/buyer/header';
import React from 'react';

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main className='py-6 lg:py-20 '>{children}</main>
      <Footer />
    </>
  );
};

export default layout;
