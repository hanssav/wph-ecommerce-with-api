import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ICONS, IMAGES } from '@/constants';
import { Menu, Search, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ButtonUserActive } from './button-user-active';

export const DesktopHeader: React.FC<{
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}> = ({ setOpen, open }) => {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => router.push('/home')}
        className='lg:basis-5/20 relative overflow-hidden rounded w-10 aspect-square lg:w-40 lg:h-10 lg:aspect-auto'
      >
        <Image
          src={IMAGES.LOGO}
          alt='Logo'
          fill
          className='object-cover object-left lg:object-contain'
          priority
        />
      </div>

      <div className='lg:basis-10/20 flex gap-[6px] items-center w-full'>
        <Button
          onClick={() => router.push('/catalog')}
          variant='outline'
          className='relative rounded-xl py-2 px-2 lg:px-3 flex items-center justify-center lg:w-auto lg:justify-start lg:gap-2'
        >
          <div className='relative w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0'>
            <Image
              src={ICONS.GRID}
              alt='grid-icon'
              fill
              className='object-contain'
            />
          </div>
          <span className='hidden lg:inline-block text-sm font-normal'>
            Catalog
          </span>
        </Button>
        <Input
          label='search.. '
          id='search'
          className='h-10 lg:h-11 lg:max-w-[481px]'
          iconPosition='left'
          icon={<Search className='h-5 w-5 text-neutral-950 ' />}
        ></Input>
      </div>

      <div className='lg:basis-5/20 flex gap-4 items-center'>
        <Button
          variant={'ghost'}
          onClick={() => router.push('/cart')}
          className='relative w-8 h-8 lg:w-6 lg:h-6 !p-0'
        >
          <ShoppingCart className='!w-5 !h-5 lg:!w-5 lg:!h-5' />
          <span className='absolute -top-1.5 lg:-top-3 -right-1.5 lg:p-1 rounded-full flex items-center justify-center w-5 h-5 bg-red-500  text-white text-xs lg:text-md'>
            2
          </span>
        </Button>

        <Button
          variant='ghost'
          size='lg'
          className='lg:hidden w-auto h-auto !p-0'
          onClick={() => setOpen(!open)}
          aria-label='Toggle menu'
        >
          <Menu className='!h-5 !w-5' />
        </Button>

        <ButtonUserActive />
      </div>
    </>
  );
};
