import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export const SortBtn: React.FC = () => {
  return (
    <Button
      size={'lg'}
      variant='outline'
      className='flex-1 flex items-center justify-between gap-2 rounded-lg lg:flex-none lg:w-32'
    >
      Latest
      <ChevronDown className='h-5 w-5' />
    </Button>
  );
};
