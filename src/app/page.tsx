'use client';
import HeroSection from '@/components/pages/buyer/home/hero-section';
import Typography from '@/components/ui/typography';
import { useUser } from '@/context/auth';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Home() {
  const router = useRouter();
  const { user } = useUser();

  React.useEffect(() => {
    if (!user) return router.push('/login');
  }, [user, router]);

  return (
    <main className='px-4 py-6 lg:px-[120px] lg:py-12'>
      <HeroSection />

      <section>
        <Typography
          as='h2'
          size={{ base: 'display-xs', lg: 'display-lg' }}
          weight='bold'
        >
          Feature Product
        </Typography>
      </section>
    </main>
  );
}
