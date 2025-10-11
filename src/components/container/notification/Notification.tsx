'use client';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { cn } from '@/lib/utils';
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
  className,
}) => {
  const router = useRouter();

  return (
    <div className={cn('relative h-[calc(100vh-360px)] w-full', className)}>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4'>
        <div className='relative overflow-hidden w-40 aspect-square'>
          <Image src={src} alt={title} fill priority sizes='160px' />
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
        {btnActionSrc && (
          <Button
            onClick={() => router.push(btnActionSrc)}
            className='rounded-md w-80'
          >
            {btnLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Notification;
