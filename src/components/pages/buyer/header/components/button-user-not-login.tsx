import { Button } from '@/components/ui/button';

export const ButtonUserNotLogin = () => {
  return (
    <>
      <Button variant='outline' className='lg:flex-1 hidden lg:block'>
        Login
      </Button>
      <Button className='lg:flex-1 hidden lg:block'>Register</Button>
    </>
  );
};
