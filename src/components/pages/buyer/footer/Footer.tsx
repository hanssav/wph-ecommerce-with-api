'use client';
import SectionWrapper from '@/components/container/section-wrapper';
import Typography from '@/components/ui/typography';
import { IMAGES, PATH } from '@/constants';
import Image from 'next/image';
import React from 'react';
import { ecommerceList, helpList, socialMediaList } from './Footer.constant';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const SocialMediaList = () => {
  return (
    <div className='flex flex-col gap-5'>
      <Typography as='h3' weight='bold' size={{ base: 'sm', lg: 'md' }}>
        Follow on Social Media
      </Typography>

      <div className='flex gap-3'>
        {socialMediaList.map((data, idx) => (
          <div
            key={idx}
            className='relative border border-neutral-300 rounded-full h-10 w-10 flex items-center justify-center'
          >
            <Image src={data.src} alt={data.alt} fill className='p-2' />
          </div>
        ))}
      </div>
    </div>
  );
};
const MenuList: React.FC<{ menu: string[] }> = ({ menu }) => {
  return (
    <div className='flex flex-col gap-4'>
      {menu.map((label, idx) => (
        <Typography
          key={idx}
          as='span'
          size={{ base: 'sm', lg: 'md' }}
          weight={idx === 0 ? 'bold' : 'normal'}
          className={cn(' text-neutral-950 ')}
        >
          {label}
        </Typography>
      ))}
    </div>
  );
};

const Footer = () => {
  const pathname = usePathname();
  const hiddenFooter = PATH.HIDDEN_FOOTER.includes(pathname);

  return (
    <SectionWrapper
      as='footer'
      className={cn(
        'flex flex-col lg:flex-row gap-4 px-4 py-10 lg:px-[150px] lg:py-20 justify-between border-t border-neutral-300',
        hiddenFooter && 'hidden'
      )}
    >
      <div className='flex flex-col gap-4 lg:max-w-[380px] lg:gap-10'>
        <div className='flex flex-col gap-[22px]'>
          <div className='relative w-20 h-10 lg:w-30 lg:h-15 lg:aspect-auto'>
            <Image src={IMAGES.LOGO} alt='logo' fill />
          </div>

          <Typography
            as='p'
            size={{ base: 'sm', lg: 'md' }}
            weight='normal'
            className='text-neutral-950'
          >
            Explore a realm of style with our fashion e-commerce platform, where
            shopping is effortless. Experience a smooth journey with an
            extensive selection of trendy apparel, all delivered directly to
            your home.
          </Typography>
        </div>

        <SocialMediaList />
      </div>
      <MenuList menu={ecommerceList} />
      <MenuList menu={helpList} />
    </SectionWrapper>
  );
};

export default Footer;
