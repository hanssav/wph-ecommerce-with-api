import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import React from 'react';

export const SortBtn: React.FC = () => {
  const [sorts, setSorts] = React.useState<'latest' | 'oldest'>('latest');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={'lg'}
          variant='outline'
          className='flex-1 flex items-center justify-between gap-2 rounded-lg lg:flex-none lg:w-32 capitalize'
        >
          {sorts}
          <ChevronDown className='h-5 w-5' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-44' align='end' sideOffset={5}>
        <DropdownMenuCheckboxItem
          checked={sorts === 'latest'}
          onCheckedChange={() => setSorts('latest')}
        >
          Latest
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={sorts === 'oldest'}
          onCheckedChange={() => setSorts('oldest')}
        >
          Oldest
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
