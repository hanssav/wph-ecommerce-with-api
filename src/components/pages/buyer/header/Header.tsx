'use client';
import SectionWrapper from '@/components/container/section-wrapper';
import React from 'react';
import { DesktopHeader } from './components/desktop-header';
import { MobileHeader } from './components/mobile-header';
import { MobileMenu } from './components/mobile-menu';
import { HeaderProvider, useHeader } from './useHeader';
import { cn } from '@/lib/utils';

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
      {open ? <MobileHeader /> : <DesktopHeader />}

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
