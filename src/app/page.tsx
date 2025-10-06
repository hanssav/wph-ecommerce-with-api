import { PATH } from '@/constants';
import { redirect } from 'next/navigation';

export default function Page() {
  redirect(PATH.HOME);
}
