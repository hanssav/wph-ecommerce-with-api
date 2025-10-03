import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Typography from '@/components/ui/typography';
import { Star } from 'lucide-react';

const HorizontalRule = () => (
  <hr className='border border-neutral-300 w-full my-3' />
);
const FilterWrapper: React.FC<{
  title?: string;
  children?: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <div className='flex flex-col px-4 gap-[15px]'>
      <Typography weight={'bold'} size={{ lg: 'md' }}>
        {title}
      </Typography>
      {children}
    </div>
  );
};

export const FilterSection = () => {
  const checkboxItems = ['all', 'shoes', 'clothes', 'accessories'];
  const ratingItems = [5, 4, 3, 2, 1];
  const priceItems = [
    {
      label: 'Minimum Price',
    },
    {
      label: 'Minimum Price',
    },
  ];

  return (
    <div className='flex flex-col gap-[10px]'>
      <FilterWrapper title='FILTER' />
      <FilterWrapper title='Categories'>
        {checkboxItems.map((check, idx) => (
          <div key={idx} className='flex gap-3 items-center'>
            <Checkbox className='h-5 w-5' />
            <Label className='capitalize text-md'>{check}</Label>
          </div>
        ))}
      </FilterWrapper>
      <HorizontalRule />
      <FilterWrapper title='Price'>
        {priceItems.map(({ label }, idx) => (
          <Input
            key={idx}
            label={label}
            icon={
              <div className='bg-neutral-200 p-2 rounded-sm font-bold text-md mx-4'>
                Rp
              </div>
            }
            iconPosition='left'
            leftIconPadding='12'
          />
        ))}
      </FilterWrapper>
      <HorizontalRule />
      <FilterWrapper title='Rating'>
        {ratingItems.map((rating, idx) => (
          <div key={idx} className='flex gap-2 items-center'>
            <Checkbox className='h-5 w-5' />
            <div className='flex items-center gap-1'>
              <div className='relative w-5 h-5'>
                <Star className='absolute w-5 h-5 stroke-gray-300' />
                <Star className='absolute w-5 h-5 stroke-yellow-400 fill-yellow-400' />
              </div>
              <Label className='capitalize text-md'>{rating}</Label>
            </div>
          </div>
        ))}
      </FilterWrapper>
    </div>
  );
};
