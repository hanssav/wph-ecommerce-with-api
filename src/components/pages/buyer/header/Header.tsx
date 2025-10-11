'use client';
import SectionWrapper from '@/components/container/section-wrapper';
import React, { Suspense } from 'react';
import { DesktopHeader } from './components/desktop-header';
import { MobileHeader } from './components/mobile-header';
import { MobileMenu } from './components/mobile-menu';
import { HeaderProvider, useHeader } from './useHeader';
import { cn } from '@/lib/utils';

const HeaderFallback = () => (
  <div className='flex gap-4 items-center w-full'>
    <div className='lg:basis-5/20 w-10 h-10 bg-gray-200 animate-pulse rounded' />
    <div className='lg:basis-10/20 flex gap-2 w-full'>
      <div className='h-10 w-20 bg-gray-200 animate-pulse rounded-xl' />
      <div className='h-10 flex-1 bg-gray-200 animate-pulse rounded' />
    </div>
    <div className='lg:basis-5/20 flex gap-4'>
      <div className='w-8 h-8 bg-gray-200 animate-pulse rounded' />
      <div className='w-8 h-8 bg-gray-200 animate-pulse rounded-full' />
    </div>
  </div>
);

const HeaderContent: React.FC = () => {
  const { open } = useHeader();

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
  }, [open]);

  return (
    <SectionWrapper
      as='header'
      className={cn(
        'fixed top-0 left-0 z-50 w-full',
        'flex flex-row items-center lg:justify-between gap-4',
        'bg-gradient-to-r from-white/70 via-white/60 to-white/70',
        'backdrop-blur-xl',
        'border-b border-white/20',
        'shadow-[0_4px_20px_rgba(0,0,0,0.05)]',
        'transition-all duration-300',
        'supports-[backdrop-filter]:bg-white/60',
        'supports-[backdrop-filter]:backdrop-blur-md'
      )}
    >
      <Suspense fallback={<HeaderFallback />}>
        {open ? <MobileHeader /> : <DesktopHeader />}
      </Suspense>
      <MobileMenu />
    </SectionWrapper>
  );
};

const Header = () => {
  return (
    <HeaderProvider>
      <HeaderContent />
    </HeaderProvider>
  );
};

export default Header;
