'use client';
import SectionWrapper from '@/components/container/section-wrapper';
import React from 'react';
import { DesktopHeader } from './components/desktop-header';
import { MobileHeader } from './components/mobile-header';
import { MobileMenu } from './components/mobile-menu';
import { HeaderProvider, useHeader } from './useHeader';

const HeaderContent: React.FC = () => {
  const { open } = useHeader();

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
  }, [open]);

  return (
    <SectionWrapper
      as='header'
      className='flex flex-row items-center lg:justify-between gap-4 shadow-card backdrop:backdrop-blur-md fixed top-0 z-50 bg-white'
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
