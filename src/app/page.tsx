import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <>
      <span className='font-normal'>Hello</span>
      <span className='font-medium'>Hello</span>
      <span className='font-semibold'>Hello</span>
      <span className='font-bold'>Hello</span>

      <Button variant='default' className='rounded-xl'>
        Primary
      </Button>
    </>
  );
}
