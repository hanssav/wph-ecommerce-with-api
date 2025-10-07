import { Hr } from '@/components/ui/hr';
import Typography from '@/components/ui/typography';
import { Review } from '@/types/product.types';
import { Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const ReviewCard: React.FC<{
  review: Review;
  idx: number;
  length: number;
}> = ({ review, idx, length }) => {
  const { star, user, createdAt, comment } = review;
  const starLength = star;
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-3'>
        <div className='relative w-14 lg:w-16 rounded-full overflow-hidden aspect-square'>
          <Image
            src={user.avatarUrl}
            fill
            sizes='(max-width: 1024px) 56px, 64px'
            alt={user.name}
            className='object-cover'
          />
        </div>
        <div>
          <Typography size={{ base: 'sm' }} weight={'bold'}>
            {user.name}
          </Typography>
          <Typography
            size={{ base: 'sm' }}
            weight={'normal'}
            className='text-neutral-700'
          >
            {createdAt}
          </Typography>
        </div>
      </div>
      <div className='flex gap-1'>
        {Array.from({ length: starLength ?? 0 }, (_, idx) => (
          <div key={idx} className='relative w-4 h-4'>
            <Star className='absolute w-4 h-4 stroke-gray-300' />
            <Star className='absolute w-4 h-4 stroke-yellow-400 fill-yellow-400' />
          </div>
        ))}
      </div>
      <Typography size={{ base: 'sm' }} weight={'normal'}>
        {comment}
      </Typography>
      {idx !== length - 1 && <Hr />}
    </div>
  );
};

export default ReviewCard;
