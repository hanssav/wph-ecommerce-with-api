'use client';
import SectionWrapper from '@/components/container/section-wrapper';
import ListMenu from '@/components/pages/buyer/header/components/list-menu';
import Typography from '@/components/ui/typography';
import { ICONS } from '@/constants';
import { useMe } from '@/hooks';
import Image from 'next/image';
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useMe();
  const { avatarUrl, name } = user || {};

  return (
    <SectionWrapper className='py-6 lg:py-14 flex gap-6 lg:gap-12 bg-[#FAFAFA] h-full'>
      <div className='hidden lg:block lg:basis-2/10'>
        <div className='sticky top-36 space-y-4 rounded-2xl shadow-card p-4'>
          <div className='flex gap-2 items-center'>
            <div className='relative aspect-square w-10 overflow-hidden'>
              <Image
                src={avatarUrl || ICONS.DEFAULT_AVATAR}
                alt='user'
                fill
                sizes='(max-width: 768px) 2.5rem, 2.5rem'
              />
            </div>
            <Typography weight={'bold'} size={{ base: 'sm' }}>
              {name}
            </Typography>
          </div>
          <ListMenu />
        </div>
      </div>

      <div className='lg:basis-8/10 flex flex-col gap-4 w-full'>{children}</div>
    </SectionWrapper>
  );
};

export default Layout;
