'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Hr } from '@/components/ui/hr';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Typography from '@/components/ui/typography';
import { useCategories } from '@/hooks';
import { ParamsProduct } from '@/types';
import { Star } from 'lucide-react';
import React from 'react';

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

const FilterSection: React.FC<{
  filter: ParamsProduct;
  setFilter: React.Dispatch<React.SetStateAction<ParamsProduct>>;
}> = ({ filter, setFilter }) => {
  const { categories } = useCategories();

  const ratingItems = [5, 4, 3, 2, 1];
  const priceItems = [
    {
      key: 'minPrice' as const,
      label: 'Minimum Price',
    },
    {
      key: 'maxPrice' as const,
      label: 'Minimum Price',
    },
  ];

  return (
    <div className='flex flex-col gap-[10px] bg-white'>
      <FilterWrapper title='FILTER' />
      <FilterWrapper title='Categories'>
        {categories?.map(({ id, name }, idx) => (
          <div key={idx} className='flex gap-3 items-center'>
            <Checkbox
              id={id.toString()}
              className='h-5 w-5'
              name='categoryId'
              checked={filter?.categoryId === id}
              onCheckedChange={(checked) =>
                setFilter((prev) => ({
                  ...prev,
                  categoryId: checked ? id : undefined,
                }))
              }
            />
            <Label htmlFor={id.toString()} className='capitalize text-md'>
              {name}
            </Label>
          </div>
        ))}
      </FilterWrapper>
      <Hr width='my-3' />
      <FilterWrapper title='Price'>
        {priceItems.map(({ label, key }, idx) => (
          <Input
            key={idx}
            id={`input-${key}`}
            name={`fieldd-${key}`}
            value={filter[key] === undefined ? '' : filter[key]}
            onChange={(e) => {
              const val = e.target.value;

              setFilter((prev) => ({
                ...prev,
                [key]: val === '' ? undefined : Number(val),
              }));
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
      <Hr />
      <FilterWrapper title='Rating'>
        {ratingItems.map((rating, idx) => (
          <div key={idx} className='flex gap-2 items-center'>
            <Checkbox
              id={`rating-${idx}`}
              className='h-5 w-5'
              name='byRating'
            />
            <div className='flex items-center gap-1'>
              <div className='relative w-5 h-5'>
                <Star className='absolute w-5 h-5 stroke-gray-300' />
                <Star className='absolute w-5 h-5 stroke-yellow-400 fill-yellow-400' />
              </div>
              <Label htmlFor={`rating-${idx}`} className='capitalize text-md'>
                {rating}
              </Label>
            </div>
          </div>
        ))}
      </FilterWrapper>
    </div>
  );
};

export default FilterSection;
