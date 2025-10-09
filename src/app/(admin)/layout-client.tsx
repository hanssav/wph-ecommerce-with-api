'use client';
import { useMe } from '@/hooks';
import { ChevronDown, Menu, X, LogOut, Store } from 'lucide-react';
import Image from 'next/image';
import { ICONS, IMAGES, listDashboardMenus, PATH } from '@/constants';
import Typography from '@/components/ui/typography';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter, usePathname } from 'next/navigation';
import { useBreakpoint } from '@/hooks/useBreakpoints';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDialog } from '@/context/dialog';
import { useUser } from '@/context/auth';
import { useToast } from '@/context/toast';

const HeaderAvatar: React.FC<{ src?: string; name?: string }> = ({
  src = ICONS.DEFAULT_AVATAR,
  name = 'user-avatar',
}) => {
  return (
    <div className='relative h-10 w-10 overflow-hidden rounded-full'>
      <Image
        src={src}
        alt={name}
        fill
        priority
        sizes='40px'
        className='object-cover'
        unoptimized
      />
    </div>
  );
};
const ButtonLogout: React.FC<{ open: boolean }> = ({ open }) => {
  const { openDialog, closeDialog } = useDialog();
  const { clearAuth } = useUser();

  const onLogout = () => {
    openDialog({
      title: 'Logout',
      desc: 'You will need to sign in again to access your account',
      footer: (
        <div className='flex w-full gap-3 lg:justify-end lg:w-[137px] text-sm leading-sm font-semibold'>
          <Button
            variant={'outline'}
            onClick={() => closeDialog()}
            className='flex-1 rounded-lg'
          >
            Cancel
          </Button>
          <Button
            variant={'danger'}
            className='rounded-lg flex-1 lg:w-[137px] text-sm leading-sm font-semibold'
            onClick={() => {
              clearAuth();
              closeDialog();
            }}
          >
            Logout
          </Button>
        </div>
      ),
    });
  };

  return (
    <div className='border-t pt-4 mt-4'>
      <button
        onClick={onLogout}
        className='flex items-center gap-3 text-red-600 font-semibold w-full px-3 py-2 hover:bg-red-50 rounded-md transition-colors'
      >
        <LogOut className='w-4 h-4 rotate-180' />
        <Typography
          as='span'
          size={{ base: 'sm' }}
          weight='semibold'
          className={cn('text-red-600', !open && 'lg:hidden')}
        >
          Logout
        </Typography>
      </button>
    </div>
  );
};
export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useMe();
  const { showToast } = useToast();
  const [open, setOpen] = React.useState<boolean>(false);
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
    <>
      <nav className='flex justify-between items-center px-4 py-3 lg:px-6 bg-white max-h-16 w-full shadow-card backdrop:backdrop-blur-md'>
        <Button
          variant='ghost'
          className={cn(
            'rounded-md !p-0',
            open && 'lg:ml-[216px]',
            !open && 'lg:ml-20'
          )}
          onClick={() => setOpen(!open)}
        >
          <Menu className='h-5 w-5' />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className='flex gap-1 items-center' asChild>
            <Button variant={'ghost'}>
              <HeaderAvatar src={user?.avatarUrl} name={user?.name} />
              <Typography size={{ base: 'sm' }} weight='bold'>
                {user?.name ?? 'Guest'}
              </Typography>
              <ChevronDown className='w-5 h-5' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-[261px]' align='end' sideOffset={5}>
            <DropdownMenuItem className='flex gap-2 p-4 border-b bg-white'>
              <HeaderAvatar src={user?.avatarUrl} name={user?.name} />
              <div>
                <Typography size={{ base: 'sm' }} weight='bold'>
                  {user?.name ?? 'Guest'}
                </Typography>
                <div className='flex gap-1 items-center'>
                  <Store className='w-5 h-5' />
                  <Typography size={{ base: 'sm' }} weight='normal'>
                    {user?.shop.name ?? 'Guest'}
                  </Typography>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className='flex justify-center px-4 py-2'>
              <Button variant={'outline'} className='w-full rounded-md'>
                Back To Buyer Acount
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      <div>
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
        <div
          className={cn(
            'lg:py-8 lg:px-10 p-4',
            !open ? 'lg:ml-20' : 'lg:ml-[216px]'
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
}
