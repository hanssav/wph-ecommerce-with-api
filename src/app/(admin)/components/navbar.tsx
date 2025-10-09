import { Button } from '@/components/ui/button';
import { ChevronDown, Menu, Store } from 'lucide-react';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AvatarHeader from './avatar-header';
import Typography from '@/components/ui/typography';
import { PATH } from '@/constants';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Me } from '@/types';

const Navbar: React.FC<{
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user?: Me;
}> = ({ open, setOpen, user }) => {
  const router = useRouter();

  return (
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
            <AvatarHeader src={user?.avatarUrl} name={user?.name} />
            <Typography size={{ base: 'sm' }} weight='bold'>
              {user?.name ?? 'Guest'}
            </Typography>
            <ChevronDown className='w-5 h-5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-[261px]' align='end' sideOffset={5}>
          <DropdownMenuItem className='flex gap-2 p-4 border-b bg-white'>
            <AvatarHeader src={user?.avatarUrl} name={user?.name} />
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
            <Button
              variant={'outline'}
              className='w-full rounded-md'
              onClick={() => router.push(PATH.USER.ORDER)}
            >
              Back To Buyer Acount
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Navbar;
