'use client';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { NotificationProps } from '@/types/notification.types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const Notification: React.FC<NotificationProps> = ({
  src,
  title,
  subtitle,
  btnLabel,
  btnActionSrc,
}) => {
  const router = useRouter();
  return (
    <div className='flex flex-col h-screen w-screen justify-center items-center overflow-hidden gap-4 px-4 lg:gap-8'>
      <div className='relative overflow-hidden w-40 aspect-square'>
        <Image src={src} alt={title} fill priority />
      </div>
      <div className='flex flex-col gap-1 justify-center items-center'>
        <Typography weight={'bold'} size={{ base: 'md', lg: 'lg' }}>
          {title}
        </Typography>
        <Typography
          weight={'normal'}
          size={{ base: 'sm', lg: 'md' }}
          className='text-neutral-700 text-center'
        >
          {subtitle}
        </Typography>
      </div>

      <Button
        onClick={() => router.push(btnActionSrc)}
        className='rounded-md w-80'
      >
        {btnLabel}
      </Button>
    </div>
  );
};

export default Notification;
