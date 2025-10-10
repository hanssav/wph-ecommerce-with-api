import { Button, ButtonVariants } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { useDialog } from '@/context/dialog';
import { useToast } from '@/context/toast';
import { useUpdatetatusBySeller } from '@/hooks';
import { OrderItemBySeller } from '@/types';
import { AxiosError } from 'axios';
import React from 'react';

type OrderActionStatus = 'DELIVERED' | 'CANCELLED' | 'PROCESSING';

type ModalContent = {
  title: string;
  question: string;
  subtitle: string;
  buttons: { label: string; variant: ButtonVariants; action?: () => void }[];
};

const CONFIRMATION_ACTION: Record<OrderActionStatus, Partial<ModalContent>> = {
  DELIVERED: {
    title: 'Set Delivered',
    question: 'Confirm Delivery?',
    subtitle: 'This order will be updated to “Delivered”.',
    buttons: [
      { label: 'Cancel', variant: 'outline' },
      { label: 'Set as Delivered', variant: 'default' },
    ],
  },
  //  as REJECT
  CANCELLED: {
    title: 'Reject Order',
    question: 'Reject this order?',
    subtitle:
      'If you reject, this order will be cancelled and the customer will be notified.”.',
    buttons: [
      { label: 'Keep Order', variant: 'outline' },
      { label: 'Reject Order', variant: 'danger' },
    ],
  },
  // as ACCEPT
  PROCESSING: {
    title: 'Accept Order',
    question: 'Accept this order?',
    subtitle:
      'By accepting, you confirm this order and can start processing it for shipment.',
    buttons: [
      { label: 'Back', variant: 'outline' },
      { label: 'Accept Order', variant: 'default' },
    ],
  },
};

const Content: React.FC<{ question?: string; confirm?: string }> = ({
  question,
  confirm,
}) => (
  <div className='flex flex-col gap-2'>
    <Typography size={{ base: 'sm' }} weight={'bold'}>
      {question}
    </Typography>
    <Typography
      size={{ base: 'sm' }}
      weight={'normal'}
      className='text-neutral-700'
    >
      {confirm}
    </Typography>
  </div>
);
const Footer: React.FC<{
  buttons: ModalContent['buttons'];
  isPending?: boolean;
}> = ({ buttons, isPending = false }) => {
  if (!buttons) return;
  return (
    <div className='flex gap-4 w-full lg:justify-end'>
      {buttons.map(({ label, variant, action }, idx) => (
        <Button
          key={idx}
          variant={variant}
          className='flex-1 rounded-md lg:max-w-40'
          onClick={action}
        >
          {isPending ? 'Setting...' : label}
        </Button>
      ))}
    </div>
  );
};

export const useOrder = (order: OrderItemBySeller) => {
  const { openDialog, closeDialog } = useDialog();
  const { update, isPending } = useUpdatetatusBySeller();
  const { showToast } = useToast();

  const badgeVariant = React.useMemo(() => {
    if (order.status === 'CANCELLED') return 'danger';
    else if (order.status === 'DELIVERED') return 'success';
    return 'outline';
  }, [order.status]);

  const accStatus = React.useMemo(() => {
    if (order.status === 'DELIVERED') return 'COMPLETED';
    else if (order.status === 'PROCESSING') return 'CONFIRMED';
    else if (order.status === 'ALL') return '';
    return order.status;
  }, [order.status]);

  const handleOrderAction = React.useCallback(
    (
      actionKey: keyof typeof CONFIRMATION_ACTION,
      newStatus: OrderItemBySeller['status'],
      successMessage: string
    ) => {
      const {
        title,
        question,
        subtitle,
        buttons = [],
      } = CONFIRMATION_ACTION[actionKey] ?? {};

      const clonedButtons = [...buttons];
      clonedButtons[0].action = closeDialog;
      clonedButtons[1].action = () =>
        update(
          { id: order.id, data: { status: newStatus } },
          {
            onSuccess: () => {
              showToast(successMessage, 'success');
              closeDialog();
            },
            onError: (error) => {
              const err = error as AxiosError<{ message?: string }>;

              const message =
                err.response?.data?.message ||
                err.message ||
                'Something went wrong';

              showToast(message, 'error');
              closeDialog();
            },
          }
        );

      openDialog({
        title,
        content: <Content question={question} confirm={subtitle} />,
        footer: <Footer buttons={clonedButtons} isPending={isPending} />,
      });
    },
    [order.id, update, closeDialog, openDialog, showToast, isPending]
  );

  const setDelivered = React.useCallback(() => {
    handleOrderAction(
      'DELIVERED',
      'SHIPPED',
      'Order has been marked as delivered'
    );
  }, [handleOrderAction]);

  const setAccept = React.useCallback(() => {
    handleOrderAction(
      'PROCESSING',
      'CONFIRMED',
      'Order accepted and ready to process'
    );
  }, [handleOrderAction]);

  const setReject = React.useCallback(() => {
    handleOrderAction('CANCELLED', 'CANCELLED', 'Order has been rejected');
  }, [handleOrderAction]);

  return { badgeVariant, accStatus, setDelivered, setAccept, setReject };
};
