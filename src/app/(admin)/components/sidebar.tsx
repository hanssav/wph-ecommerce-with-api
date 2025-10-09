import { X } from 'lucide-react';
import Image from 'next/image';
import { IMAGES, listDashboardMenus, PATH } from '@/constants';
import Typography from '@/components/ui/typography';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useBreakpoint } from '@/hooks';
import { useToast } from '@/context/toast';
import { Me } from '@/types';
import ButtonLogout from './logout-button';

const Sidebar: React.FC<{
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user?: Me;
}> = ({ open, setOpen, user }) => {
  const { showToast } = useToast();
  const router = useRouter();
  const bp = useBreakpoint();
  const pathname = usePathname();
  const isLarge = ['lg', 'xl', '2xl'].includes(bp);

  React.useEffect(() => {
    setOpen(isLarge);
  }, [bp, isLarge]);

  React.useEffect(() => {
    if (!user) {
      showToast('You need to be logged in to access this page', 'success');
      router.push(PATH.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <aside
      className={cn(
        'bg-white flex flex-col justify-between h-full fixed top-0 left-0 z-50 w-3/4 lg:max-w-[216px] shadow-card lg:shadow-none lg:border-r',
        'transition-transform duration-300 ease-in-out p-4',
        open
          ? 'translate-x-0 opacity-100 pointer-events-auto'
          : '-translate-x-full opacity-0 pointer-events-none lg:translate-0 lg:max-w-20 lg:opacity-100'
      )}
    >
      <div>
        <div
          className={cn(
            'flex justify-between items-center gap-4',
            !open && 'lg:justify-center'
          )}
        >
          <div
            onClick={() => router.push(PATH.HOME)}
            className='flex gap-2 items-center cursor-pointer'
          >
            <div className='relative overflow-hidden w-7 h-7 rounded-sm'>
              <Image
                src={IMAGES.LOGO}
                alt='Logo'
                fill
                className='object-cover object-left'
                priority
              />
            </div>
            <div className={cn(!open && 'lg:hidden')}>
              <Typography
                size={{ base: 'sm' }}
                weight='bold'
                className='leading-tight'
              >
                Shirt
              </Typography>
              <Typography
                size={{ base: 'sm' }}
                weight='bold'
                className='leading-tight'
              >
                Seller
              </Typography>
            </div>
          </div>

          <Button
            onClick={() => setOpen(false)}
            variant='ghost'
            className='lg:hidden'
          >
            <X className='h-5 w-5' />
          </Button>
        </div>

        <ul className='mt-6 w-full space-y-1 lg:space-y-4'>
          {listDashboardMenus.map(({ label, icon: Icon, path }, idx) => {
            const isActive = pathname.includes(path);
            return (
              <li key={idx}>
                <button
                  onClick={() => {
                    router.push(path);
                    if (!isLarge) setOpen(false);
                  }}
                  className={cn(
                    'flex items-center w-full gap-3 px-3 py-2 rounded-md transition-colors',
                    isActive
                      ? 'bg-neutral-200 font-semibold'
                      : 'hover:bg-neutral-300',
                    !open && 'lg:p-3 lg:justify-center'
                  )}
                >
                  <Icon className='w-4 h-4' />
                  <Typography
                    as='span'
                    size={{ base: 'sm' }}
                    weight={isActive ? 'semibold' : 'normal'}
                    className={cn(!open && 'lg:hidden')}
                  >
                    {label}
                  </Typography>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <ButtonLogout open={open} />
    </aside>
  );
};

export default Sidebar;
