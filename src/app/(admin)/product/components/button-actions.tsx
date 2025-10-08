import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { PATH } from '@/constants';
import { useDialog } from '@/context/dialog';
import { useDeleteProduct } from '@/hooks';
import { Eye, Pencil, Trash2, TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const ButtonActions: React.FC<{ id?: number }> = ({ id }) => {
  const router = useRouter();
  const { openDialog, closeDialog } = useDialog();
  const { deleteProduct, mutation } = useDeleteProduct();
  const [attemptedDelete, setAttemptedDelete] = React.useState(false);

  // Monitor mutation state dan update dialog
  React.useEffect(() => {
    if (!attemptedDelete) return;

    if (mutation.isSuccess) {
      closeDialog();
      setAttemptedDelete(false);
    }

    if (mutation.isError) {
      openDialog({
        title: 'Delete',
        desc: '',
        footer: (
          <div className='flex flex-col w-full gap-3 lg:justify-end lg:w-[137px] text-sm leading-sm font-semibold'>
            <div className='relative w-8 h-8'>
              <TriangleAlert className='absolute w-8 h-8 text-white z-50' />
              <TriangleAlert
                className='absolute w-8 h-8 text-red-600'
                fill='currentColor'
                stroke='none'
              />
            </div>

            <Typography size={{ base: 'sm' }} weight={'bold'}>
              Product Cannot Be Deleted
            </Typography>
            <Typography
              size={{ base: 'sm' }}
              weight={'normal'}
              className='text-neutral-700'
            >
              This product is currently active and cannot be deleted. You can
              unpublish it instead.
            </Typography>
          </div>
        ),
      });
    }
  }, [mutation.isSuccess, mutation.isError, attemptedDelete]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!id) return null;

  const handleDeleteClick = () => {
    setAttemptedDelete(true);

    openDialog({
      title: 'Delete Product',
      desc: 'The product will be permanently removed from your store. This action cannot be undone.',
      footer: (
        <div className='flex w-full gap-3 lg:justify-end lg:w-[137px] text-sm leading-sm font-semibold'>
          <Button
            variant='outline'
            onClick={() => {
              closeDialog();
              setAttemptedDelete(false);
            }}
            className='flex-1 rounded-lg'
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <Button
            variant='danger'
            className='rounded-lg flex-1 text-sm leading-sm font-semibold'
            onClick={() => deleteProduct(id)}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      ),
    });
  };

  return (
    <div className='flex gap-4'>
      <Button
        variant='ghost'
        className='!p-0 flex items-center hover:bg-gray-300'
      >
        <Eye className='w-5 h-5' />
      </Button>
      <Button
        variant='ghost'
        className='!p-0 flex items-center hover:bg-gray-300'
        onClick={() => router.push(`${PATH.ADMIN.PRODUCT_FORM}?id=${id}`)}
      >
        <Pencil className='h-5 w-5' />
      </Button>
      <Button
        variant='ghost'
        className='!p-0 flex items-center hover:bg-gray-300'
        onClick={handleDeleteClick}
      >
        <Trash2 className='h-5 w-5 text-red-600' />
      </Button>
    </div>
  );
};

export default ButtonActions;
