'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { IMAGES } from '@/constants';

export default function LogoImage() {
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const update = () => setIsLg(window.innerWidth >= 1024);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const width = isLg ? 160 : 40;
  const height = isLg ? 40 : 40;

  return (
    <div className='relative overflow-hidden rounded' style={{ width, height }}>
      <Image
        src={IMAGES.LOGO}
        alt='Logo'
        fill
        className='object-contain'
        priority
      />
    </div>
  );
}
