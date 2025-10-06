import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants';
import { useMe } from '@/hooks';
import { cn } from '@/lib/utils';
import { useHeader } from '../useHeader';

const ButtonLoginRegister = () => {
  const router = useRouter();
  const { user } = useMe();
  const { open } = useHeader();

  return (
    <>
      <Button
        variant='outline'
        className={cn('lg:flex-1 lg:block', !user && !open && 'hidden')}
        onClick={() => router.push(PATH.AUTH.LOGIN)}
      >
        Login
      </Button>
      <Button
        className={cn('lg:flex-1 lg:block', !user && !open && 'hidden')}
        onClick={() => router.push(PATH.AUTH.REGISTER)}
      >
        Register
      </Button>
    </>
  );
};

export default ButtonLoginRegister;
