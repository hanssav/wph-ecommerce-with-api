import SectionWrapper from '@/components/container/section-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ICONS, IMAGES } from '@/constants';
import Image from 'next/image';
import React from 'react';

const Header: React.FC = () => {
  return (
    <SectionWrapper
      as='header'
      className='flex flex-row items-center lg:justify-between'
    >
      <div className='lg:basis-5/20 relative overflow-hidden rounded w-10 aspect-square lg:w-40 lg:h-10 lg:aspect-auto'>
        <Image
          src={IMAGES.LOGO}
          alt='Logo'
          fill
          className='object-cover object-left lg:object-contain'
        />
      </div>

      <div className='lg:basis-10/20 flex gap-[6px] items-center w-full'>
        <div className='rounded-xl border border-neutral-300 p-2 w-10 lg:w-auto lg:max-w-full h-auto flex gap-[6px]'>
          <Image
            src={ICONS.GRID}
            width={40}
            height={40}
            alt='grid-icon'
            className='object-cover'
          />
          <span className='hidden text-sm font-normal lg:flex items-center'>
            Category
          </span>
        </div>
        <Input label='Search .. ' className='h-10 lg:h-11 lg:w-full'></Input>
      </div>

      <div className='lg:basis-5/20 flex gap-[13px] items-center lg:w-full'>
        <div className='relative w-8 h-8 lg:w-10 lg:h-10'>
          <Image src={ICONS.CHART} alt='cart-icon' fill />
          <span className='absolute -top-2 lg:-top-3 -right-2 lg:p-1 rounded-full flex items-center justify-center w-5 h-5 lg:h-7 lg:w-7 bg-red-500  text-white text-xs lg:text-md'>
            2
          </span>
        </div>

        <Image
          height={40}
          width={40}
          src={ICONS.HAMBURGER}
          alt='hamburger-icon'
          className='lg:hidden'
        />

        <Button variant='outline' className='lg:flex-1 hidden lg:block'>
          Login
        </Button>
        <Button className='lg:flex-1 hidden lg:block'>Register</Button>
      </div>
    </SectionWrapper>
  );
};

export default Header;
