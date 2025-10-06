import React from 'react';
import SectionWrapper from '@/components/container/section-wrapper';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { IMAGES } from '@/constants';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <SectionWrapper className='flex gap-4 bg-[#F3D7A4] text-[#553E32] rounded-[12px] items-center h-[183px] lg:h-[375px] lg:rounded-2xl mb-6 lg:px-12 overflow-hidden'>
      <div className='relative lg:left-[48px] top-[10px] h-[185px] lg:h-[376px] w-[185px] lg:w-[376px]'>
        <Image
          src={IMAGES.HERO}
          alt='hero-images'
          fill
          className='object-cover'
          sizes='(max-width: 1024px) 100vw, 376px'
          priority
        />
      </div>

      <div className='relative lg:left-[170px] flex flex-col gap-3 lg:gap-6 max-w-[163px] lg:max-w-full'>
        <div className='flex flex-col lg:gap-2'>
          <Typography
            as='h2'
            size={{ base: 'md', lg: 'display-3xl' }}
            weight='bold'
          >
            NEW COLLECTION
          </Typography>
          <Typography
            as='p'
            size={{ base: 10, lg: 'display-xs' }}
            weight='medium'
          >
            Stylish men&apos;s apparel for every occasion
          </Typography>
        </div>

        <Button className='p-2 rounded-[6px] lg:rounded-md max-w-[93px] lg:max-w-[180px] h-7 lg:h-12'>
          <Typography
            size={{ base: 10, lg: 'md' }}
            weight='semibold'
            className='text-white'
          >
            Get Now
          </Typography>
        </Button>
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
