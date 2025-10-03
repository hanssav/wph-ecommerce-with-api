'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Typography from '@/components/ui/typography';
import { Star } from 'lucide-react';
import React from 'react';

type Filter = {
  byCategory: string[];
  byRating: number[];
  byPrice: { min: number; max: number };
};

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
  const categoryItems = ['all', 'shoes', 'clothes', 'accessories'];
  const ratingItems = [5, 4, 3, 2, 1];
  const priceItems = [
    {
      key: 'min' as const,
      label: 'Minimum Price',
    },
    {
      key: 'max' as const,
      label: 'Minimum Price',
    },
  ];

  const [filter, setFilter] = React.useState<Filter>({
    byCategory: ['all'],
    byRating: [5, 2],
    byPrice: {
      min: 0,
      max: 0,
    },
  });

  return (
    <div className='flex flex-col gap-[10px]'>
      <FilterWrapper title='FILTER' />
      <FilterWrapper title='Categories'>
        {categoryItems.map((check, idx) => (
          <div key={idx} className='flex gap-3 items-center'>
            <Checkbox
              id={check}
              className='h-5 w-5'
              checked={filter.byCategory.includes(check)}
              onCheckedChange={(checked) => {
                setFilter((prev) => ({
                  ...prev,
                  byCategory: checked
                    ? [...prev.byCategory, check]
                    : prev.byCategory.filter((val) => val !== check),
                }));
              }}
            />
            <Label htmlFor={check} className='capitalize text-md'>
              {check}
            </Label>
          </div>
        ))}
      </FilterWrapper>
      <HorizontalRule />
      <FilterWrapper title='Price'>
        {priceItems.map(({ label, key }, idx) => (
          <Input
            key={idx}
            id={`input-${key}`}
            name={`fieldd-${key}`}
            value={filter.byPrice[key]}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (!isNaN(val)) {
                setFilter((prev) => ({
                  ...prev,
                  byPrice: {
                    ...prev.byPrice,
                    [key]: val,
                  },
                }));
              }
            }}
            label={label}
            icon={
              <div className='bg-neutral-200 p-2 rounded-sm font-bold text-md mx-4'>
                Rp
              </div>
            }
            iconPosition='left'
            leftIconPadding={12}
          />
        ))}
      </FilterWrapper>
      <HorizontalRule />
      <FilterWrapper title='Rating'>
        {ratingItems.map((rating, idx) => (
          <div key={idx} className='flex gap-2 items-center'>
            <Checkbox
              id={0 ? 'a0x' : rating.toString()}
              className='h-5 w-5'
              checked={filter.byRating.includes(rating)}
              onCheckedChange={(checked) =>
                setFilter((prev) => ({
                  ...prev,
                  byRating: checked
                    ? [...prev.byRating, rating]
                    : prev.byRating.filter((val) => val !== rating),
                }))
              }
            />
            <div className='flex items-center gap-1'>
              <div className='relative w-5 h-5'>
                <Star className='absolute w-5 h-5 stroke-gray-300' />
                <Star className='absolute w-5 h-5 stroke-yellow-400 fill-yellow-400' />
              </div>
              <Label
                htmlFor={0 ? 'a0x' : rating.toString()}
                className='capitalize text-md'
              >
                {rating}
              </Label>
            </div>
          </div>
        ))}
      </FilterWrapper>
    </div>
  );
};
