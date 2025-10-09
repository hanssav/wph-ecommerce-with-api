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

// 🔍 Contoh:
// console.log(
//   parseAddress(
//     'djakarta, jl maju no 12 desa mundur, kec maju mundur kota jaya, 112233'
//   )
// );
// { city: 'djakarta', address: 'jl maju no 12 desa mundur, kec maju mundur kota jaya', postalCode: '112233' }

// console.log(parseAddress('jl merdeka no 8 kota bahagia'));
// { city: '', address: 'jl merdeka no 8 kota bahagia', postalCode: '' }

export function parseAddress(input?: string) {
  if (!input || typeof input !== 'string') return null;

  if (!input.includes(',')) {
    return {
      city: '',
      address: input.trim(),
      postalCode: '',
    };
  }

  const parts = input
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);

  if (parts.length === 0) return null;

  let postalCode = '';
  if (/^\d{3,6}$/.test(parts[parts.length - 1])) {
    postalCode = parts.pop()!;
  }

  const city = parts.length > 0 ? parts.shift()! : '';
  const address = parts.length > 0 ? parts.join(', ') : '';

  return {
    city,
    address,
    postalCode,
  };
}

export function combineAddress({
  city,
  address,
  postalCode,
}: {
  city: string;
  address: string;
  postalCode: string;
}) {
  return [city, address, postalCode].filter(Boolean).join(', ');
}
