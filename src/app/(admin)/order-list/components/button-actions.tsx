import { Button } from '@/components/ui/button';
import { OrderItemBySeller } from '@/types';

type ButtonActionProps = {
  status: OrderItemBySeller['status'];
  setDelivered: () => void;
  setReject: () => void;
  setAccept: () => void;
};

const ButtonAction: React.FC<ButtonActionProps> = ({
  status,
  setDelivered,
  setAccept,
  setReject,
}) => {
  const buttonsByStatus: Record<ButtonActionProps['status'], React.ReactNode> =
    {
      NEW: (
        <div className='flex gap-4 w-full lg:justify-end'>
          <Button
            variant='outline'
            className='flex-1 rounded-md lg:max-w-40'
            onClick={setReject}
          >
            Reject Order
          </Button>
          <Button className='flex-1 rounded-md lg:max-w-40' onClick={setAccept}>
            Accept Order
          </Button>
        </div>
      ),
      PROCESSING: null,
      CONFIRMED: null,
      SHIPPED: null,
      DELIVERED: null,
      CANCELLED: null,
      ALL: null,
    };

  if (['PROCESSING', 'CONFIRMED'].includes(status)) {
    return (
      <Button className='flex-1 rounded-md lg:max-w-40' onClick={setDelivered}>
        Set Delivered
      </Button>
    );
  }

  return buttonsByStatus[status] ?? null;
};

export default ButtonAction;
