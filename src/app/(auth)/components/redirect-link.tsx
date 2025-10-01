'use client';

import { useRouter } from 'next/navigation';

type AuthRedirectLinkProps = {
  promptText: string;
  linkText: string;
  href: string;
};

export const AuthRedirectLink: React.FC<AuthRedirectLinkProps> = ({
  promptText,
  linkText,
  href,
}) => {
  const router = useRouter();

  return (
    <div className='flex justify-center gap-1'>
      <span className='text-sm leading-sm font-normal lg:text-md lg:leading-md'>
        {promptText}
      </span>
      <span
        className='text-sm leading-sm font-bold lg:text-md lg:leading-md cursor-pointer'
        onClick={() => router.push(href)}
      >
        {linkText}
      </span>
    </div>
  );
};
