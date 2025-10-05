import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMoney = (amount: number, withPrefix = true): string => {
  const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return withPrefix ? `Rp ${formatted}` : formatted;
};

import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

export const formatDate = (dateString: string) => {
  if (!dateString) return '-';
  return dayjs(dateString).format('DD MMM YYYY, HH:mm');
};
