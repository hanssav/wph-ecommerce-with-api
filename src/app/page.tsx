'use client';
import HeroSection from '@/components/pages/buyer/home/hero-section';
import ProductCard from '@/components/pages/buyer/home/product-card';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { useUser } from '@/context/auth';
import { useProduct } from '@/hooks';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Home() {
  const router = useRouter();
  const { user } = useUser();

  const { products } = useProduct();

  React.useEffect(() => {
    if (!user) return router.push('/login');
  }, [user, router]);

  return (
    <main className='px-4 py-6 lg:px-[120px] lg:py-12'>
      <HeroSection />

      <section className='flex flex-col gap-3 lg:gap-10 '>
        <Typography
          as='h2'
          size={{ base: 'display-xs', lg: 'display-lg' }}
          weight='bold'
        >
          Feature Product
        </Typography>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {products?.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className='flex justify-center'>
          <Button
            variant={'outline'}
            size={'lg'}
            className='rounded-lg max-w-40'
          >
            <Typography size={{ base: 'md' }} weight={'semibold'}>
              Load More
            </Typography>
          </Button>
        </div>
      </section>
    </main>
  );
}
