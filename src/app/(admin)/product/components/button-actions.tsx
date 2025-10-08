import { Button } from '@/components/ui/button';
import { PATH } from '@/constants';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const ButtonActions: React.FC<{ id?: number }> = ({ id }) => {
  const router = useRouter();

  return (
    <div className='flex gap-4'>
      <Button variant='ghost' className='!p-0 flex items-center'>
        <Eye className='w-5 h-5' />
      </Button>
      <Button
        variant='ghost'
        className='!p-0 flex items-center'
        onClick={() => router.push(`${PATH.ADMIN.PRODUCT_FORM}?id=${id}`)}
      >
        <Pencil className='h-5 w-5' />
      </Button>
      <Button variant='ghost' className='!p-0 flex items-center'>
        <Trash2 className='h-5 w-5 text-red-600' />
      </Button>
    </div>
  );
};

export default ButtonActions;
