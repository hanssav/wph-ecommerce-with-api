import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ParamsProduct } from '@/types';
import { ChevronDown } from 'lucide-react';
import React from 'react';

const SortBtn: React.FC<{
  filter: ParamsProduct;
  setFilter: React.Dispatch<React.SetStateAction<ParamsProduct>>;
}> = ({ filter, setFilter }) => {
  const label =
    filter.order === 'desc'
      ? 'Latest'
      : filter.order === 'asc'
      ? 'Oldest'
      : 'Sort';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={'lg'}
          variant='outline'
          className='flex-1 flex items-center justify-between gap-2 rounded-lg lg:flex-none lg:w-32 capitalize'
        >
          {label}
          <ChevronDown className='h-5 w-5' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-44' align='end' sideOffset={5}>
        <DropdownMenuCheckboxItem
          checked={filter.order === 'desc'}
          onCheckedChange={() =>
            setFilter((prev) => ({ ...prev, order: 'desc' }))
          }
        >
          Latest
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={filter.order === 'asc'}
          onCheckedChange={() =>
            setFilter((prev) => ({ ...prev, order: 'asc' }))
          }
        >
          Oldest
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortBtn;
