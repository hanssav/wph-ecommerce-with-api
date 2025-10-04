import { Hr } from '@/components/ui/hr';
import Typography from '@/components/ui/typography';
import { formatMoney } from '@/lib/utils';
import { Product } from '@/types/product.types';
import { Star } from 'lucide-react';
import React from 'react';

const ProducDetail: React.FC<{ product?: Product }> = ({
  product: { title, price = 0, rating, description } = {},
}) => {
  return (
    <>
      <div className='flex flex-col gap-0.5 lg:gap-2'>
        <Typography weight={'semibold'} size={{ base: 'md', lg: 'xl' }}>
          {title}
        </Typography>
        <Typography weight={'bold'} size={{ base: 'xl', lg: 'display-md' }}>
          {formatMoney(price)}
        </Typography>
        <Typography
          as='div'
          size={{ base: 'sm', lg: 'lg' }}
          weight={'semibold'}
          className='flex gap-1 items-center'
        >
          <div className='relative w-5 h-5'>
            <Star className='absolute w-5 h-5 stroke-gray-300' />
            <Star className='absolute w-5 h-5 stroke-yellow-400 fill-yellow-400' />
          </div>
          {rating}
        </Typography>
      </div>
      <Hr />
      <div className='flex flex-col gap-2'>
        <Typography size={{ base: 'md', lg: 'lg' }} weight={'bold'}>
          Deskripsi
        </Typography>
        <Typography size={{ base: 'sm', lg: 'md' }} weight={'normal'}>
          {description}
        </Typography>
      </div>
    </>
  );
};

export default ProducDetail;
