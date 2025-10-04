'use client';
import SectionWrapper from '@/components/container/section-wrapper';
import React from 'react';
import { DesktopHeader } from './components/desktop-header';
import { MobileHeader } from './components/mobile-header';

import { MobileMenu } from './components/mobile-menu';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileMenuOpen]);

  return (
    <SectionWrapper
      as='header'
      className='flex flex-row items-center lg:justify-between gap-4 shadow-card backdrop:backdrop-blur-md fixed top-0 z-50 bg-white'
    >
      {mobileMenuOpen ? (
        <MobileHeader open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
      ) : (
        <DesktopHeader open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
      )}

      <MobileMenu open={mobileMenuOpen} />
    </SectionWrapper>
  );
};

export default Header;
