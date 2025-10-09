import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { useUser } from '@/context/auth';
import { useDialog } from '@/context/dialog';
import { cn } from '@/lib/utils';
import { LogOut } from 'lucide-react';

const ButtonLogout: React.FC<{ open?: boolean }> = ({ open }) => {
  const { openDialog, closeDialog } = useDialog();
  const { clearAuth } = useUser();

  const LOGOUT_DATA = {
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
  };

  return (
    <div className='border-t pt-4 mt-4'>
      <button
        onClick={() => openDialog(LOGOUT_DATA)}
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
export default ButtonLogout;
