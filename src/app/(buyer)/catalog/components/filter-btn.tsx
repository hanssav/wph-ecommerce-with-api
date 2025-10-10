import { Button } from '@/components/ui/button';
import { ListFilter } from 'lucide-react';

const FilterBtn = () => {
  return (
    <Button
      size={'lg'}
      variant='outline'
      className='flex-1 flex items-center justify-between gap-2 rounded-lg'
    >
      Filter
      <ListFilter className='h-5 w-5' />
    </Button>
  );
};

export default FilterBtn;
