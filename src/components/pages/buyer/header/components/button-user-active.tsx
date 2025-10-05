import { useMe } from '@/hooks';
import { useRouter } from 'next/navigation';
import { ButtonUserNotLogin } from './button-user-not-login';
import { ICONS } from '@/constants';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { PATH } from '@/constants/path';
import { useHeader } from '../useHeader';

export const ButtonUserActive: React.FC<{ isDesktop?: boolean }> = ({
  isDesktop = false,
}) => {
  const { open, setOpen } = useHeader();
  const router = useRouter();
  const { user: me } = useMe();
  if (!me) {
    return <ButtonUserNotLogin />;
  }

  const buttons = [
    {
      label: me.shop ? me.shop.name : 'Open Store',
      icon: ICONS.STORE,
      handleClick: () => handleClickStore(),
    },
    {
      label: me.name,
      icon: ICONS.DEFAULT_AVATAR,
      imgClass: 'rounded-full',
      handleClick: () => {
        router.push(PATH.USER.ORDER);
        setOpen(false);
      },
    },
  ];

  const handleClickStore = () => {
    if (!me.shop) {
      router.push(PATH.OPEN_STORE.MAIN);
    } else {
      router.push(PATH.DASHBOARD);
    }
    setOpen(false);
  };

  return (
    <>
      {buttons.map((btn, idx) => (
        <Button
          key={idx}
          variant='outline'
          className={cn(
            'items-center gap-2 overflow-hidden whitespace-nowrap rounded-full py-1 px-3 transition-all duration-200',
            open && !isDesktop ? 'flex w-full justify-center' : 'hidden',
            'lg:flex lg:w-auto lg:max-w-[128px]'
          )}
          onClick={btn.handleClick}
        >
          <Image
            src={btn.icon}
            alt='store-icon'
            width={20}
            height={20}
            className={cn(btn.imgClass)}
            unoptimized
          />
          <span className='text-sm leading-sm font-bold truncate'>
            {btn.label}
          </span>
        </Button>
      ))}
    </>
  );
};
