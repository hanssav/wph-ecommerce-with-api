'use client';
import { useUser } from '@/context/auth';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Home() {
  const router = useRouter();
  const { user } = useUser();

  React.useEffect(() => {
    if (!user) return router.push('/login');
  }, [user, router]);

  return <></>;
}
